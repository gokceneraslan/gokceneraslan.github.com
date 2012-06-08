---
title: PDF signing GSoC roadmap
layout: post
category: english
---


Actually, I've sent a mail about that roadmap but for those who didn't see it,
here is the current progress in GSoC PDF signing project.

After weeks of reading the PDF reference and inspecting the
PortableSigner implementation, here is what I must do to implement
signing support:

1. Create an Annotation object of Widget subtype. Make it's width and
height zero since we don't want to make the signature visible, for now.
(Yes, digital signatures may be [visible][1]. There is even a document
about [that][2].)

2. Create and AcroForm field (/FT/Sig) as the parent of the Annotation
object we created. Only buttons, combobox, listbox, edit and
hierarchy is defined now.

3. Create a Signature dictionary (/Type/Sig). AcroForm field must point
to that dictionary in the /V field. This is the crucial object. Prepare
a PKCS#7 object and use it as the /Contents value. It must contain the
X.509 certificate and the encrypted message digest.

4. Modify /Catalog object of the PDF document so that /AcroForm points
to the our AcroForm field.

5. Modify the first /Page object so that it's /Annots key points to our
Annotation object.

6. Write a new xref table and the final trailer.


That's all, it's very easy :) It seems most of these changes will be
applied to vcl/source/gdi/pdfwriter\_impl.{c,h}xx files.

As [Thorsten][3] said, I will mimic the behaviour of the [PortableSigner][4] tool
first. PortableSigner use the incremental updating feature of the PDF.
This feature allows pdf editing tools to edit PDF file by adding new or
existing objects to the end of the file. So, if an object exists more
than once, last occurence is used.

In the PDF export code I have to:

1. Add PDFWriter::SignatureWidget AcroForm type and use
[PDFWriterImpl::createControl()][5] to add a Signature field.

2. Now, [PDFWriterImpl::emitCatalog()][6] method writes all the Pages,
Resources and Catalog objects. I think I need to split those into
different methods, so I can emit the modified catalog again.

3. Re-write the /Page object that contains recently added Signature
annotation.

4. Add a new xref table and a new trailer at the end. I don't know how
to implement that now. PDFWriterImpl::emitTrailer() method writes all
objects but in incremental updates we must include only added/modified
objects to the xref table.

I know that is a kind of "note-to-self" but I've tried to write down all
the steps that I can think of.


[1]: http://www.tracker-software.com/knowledgebase/290-How-do-I-create-an-invisible-digital-certificate

[2]: http://wwwimages.adobe.com/www.adobe.com/content/dam/Adobe/en/devnet/acrobat/pdfs/acrobat_digital_signature_appearances_v9.pdf

[3]: http://blog.thebehrens.net/

[4]: http://portablesigner.sourceforge.net/

[5]: http://opengrok.libreoffice.org/xref/core/vcl/source/gdi/pdfwriter_impl.cxx#11535

[6]: http://opengrok.libreoffice.org/xref/core/vcl/source/gdi/pdfwriter_impl.cxx#5706
