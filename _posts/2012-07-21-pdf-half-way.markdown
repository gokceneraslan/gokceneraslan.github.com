---
title: The first half of GSoC 2012 is over
layout: post
category: english
---

The first half of the GSoC 2012 is over now. Since LibreOffice team set
'merging GSoC feature branch into master' as a [requirement][1] for the
midterm, I have marked PDF Signing fature as [experimental feature][2]
and [merged][3] into master[^1], and recently I have deleted my feature branch.
From now on, I'll continue to work on the master.

All changes I have made can be seen in the merge commit but let me explain
what those commits mean in detail.

1. First, I have added the Signature widget annotation type to
`vcl/inc/vcl/pdfwriter.hxx` and `vcl/source/gdi/pdfwriter_impl.cxx`.

2. emitSignature and finalizeSignature methods are added to PDFWriterImpl class.
Those methods are called in `PDFWriterImpl::emit()` which is the final operation
of PDF creation, it writes all the prepared PDF structures to the given file in
order. Page, resource, outline, catalog, annotations, metadata objects are all
written to the PDF file in the emit method.

    At the beginning of the emit method, I have checked the PDFWriterContext to
see if signing is requested[^2] and then create a Signature annotation object.
Next, after the Catalog object is emitted, the main Signature objects (`/Type
/Sig` and `/Type /SigRef`) are emitted. But, unfortunately we have to include a
byte range in the signature dictionary as well as the digest of that byte range.
Since the document is not finalized yet (the last part is the Trailer in the
PDF file.), we cannot specify a ByteRange and the document digest now. Instead,
we write a dummy ByteRange value and a dummy signature and reserve a space to
fill it later when the document is finalized. Of course, we have to write down
the offset values of that dummy byte range and digest object, so we can fill
them later on.

    Finally, when the trailer is emitted in the ::emit method, we are ready to
fix the ByteRange values and include the digest value. This is what
the finalizeSignature method does. finalizeSignature calculates the real
ByteRange value and fix the old values. Next, reads the whole PDF data to
create a PKCS7 object using NSS library. But since we don't have a certificate
now (PDF export dialog has to be changed to make users select the certificate)
PKCS7 object creation is not implemented.

3. I have added a new [Digital Signatures tab][6] to the PDF export dialog[^3]. But
this wasn't easy. First I thought that certificate selection dialog is used in
[document signing][7] and it must be easy to re-use it. But, that
dialog (`xmlsecurity/source/dialogs/certificatechooser.cxx`) seems to be an
internal part of the xmlsecurity module and can only used in the signDocumentContent
method of the [XDocumentDigitalSignatures UNO interface][9]. So, I had to extend
that UNO interface and added a chooseCertificate method. It just asks user to
choose a certificate and returns it. That's all. So, certificate chooser
dialog can now be used in anywhere using the
[`com::sun::star::security::XCertificate chooseCertificate();`][8].

So, to finalize the signed PDF document now I have:

* the document data to compute its digest,
* [DER encoded][10] certificate of the user,
* the password of the user to decrypt his private key and sign the digest.

Also, I now the byte offset of digital signature to write the computed PKCS7
object. I hope, adding a few lines will be enough to complete signing :)

Cheers.

[^1]: By the way, since I didn't use `--enable-werror` configure option and
ignored some warnings caused by my changes, I have broken some builds in the
[master tinderbox][4]. Sorry about that :) Now I know, I must use
`--enable-werror` and `--enable-dbgutil` all the time.
[^2]: As you know, [PDF export dialog][5] has a great deal of options.
This dialog, which resides in `filter/source/pdf/impdialog.cxx`, basically
takes all PDF export parameters and passes them to PDFFilter class and it forwards
those parameters to PDFExport class. Finally, PDFExport class instantiate a
PDFWriterContext object and pass it to the vcl::PDFWriter class. (I want to
thank GDB to make this process easier to understand.)
[^3]: Right now, password box is an ordinary text edit. So be careful, your
private key password will be exposed :) As a second matter, the design of the
certificate selection is ugly. I may use the certificate selection design of
[Thunderbird][11]. There are disabled text edit, a select and clear button.
Thus, I can also remove Sign PDF File checkbox.


[1]: http://nabble.documentfoundation.org/Libreoffice-qa-minutes-of-ESC-call-td3991620.html
[2]: http://www.tuxmachines.org/images/libOpics/libO_experimentalmode.png
[3]: http://cgit.freedesktop.org/libreoffice/core/commit/?id=9c8dc01d3a40ec905c9d816c733ceb5d621e0426
[4]: http://tinderbox.libreoffice.org/MASTER/status.html
[5]: http://i43.tinypic.com/343gfhu.jpg
[6]: http://i.imgur.com/JVabH.png
[7]: http://i.techrepublic.com.com/blogs/libreoffice_sigs.png
[8]: http://cgit.freedesktop.org/libreoffice/core/tree/offapi/com/sun/star/security/XDocumentDigitalSignatures.idl#n148
[9]: http://api.libreoffice.org/docs/common/ref/com/sun/star/security/XDocumentDigitalSignatures.html
[10]: http://en.wikipedia.org/wiki/Distinguished_Encoding_Rules
[11]: https://www.globalsign.com/support/personal-certificate/images/ps_thunderbird_screenshot4.jpg
