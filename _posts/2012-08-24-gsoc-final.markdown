---
title: GSoC Final
layout: post
category: english
---

After the GSoC midterm, there were two remaining important objectives to
do: to write the NSS code to create a PKCS7 object (which includes the
actual signature, encrypted SHA1 digest and the public certificate) and
to improve the PDF signing GUI (which can be tested only in the experimental
mode).

For the NSS part, first I have used the NSS [PKCS7 API][1] (secpkcs7.h and
pkcs7t.h) to create the PKCS7 object. But it was very hard for me since
NSS lacks a proper [documentation][1] (the one in the header files is not
sufficient). Anyway, later on, I have decided to use the new and more fine
grained NSS CMS (Cryptographic Message Syntax) [API][4] (cms.h and cmst.h).

I have followed following steps to create a PKCS7 object:

1. We need a NSS CERTCertificate structure to operate on the NSS world.
So, DER encoded certificate data is obtained via the [Encoded attribute][2]
of XCertificate and converted to a CERTCertificate structure using
the `CERT_DecodeCertFromPackage` function.

2. SHA1 sum of the PDF file is computed using the `HASH_Create`,
`HASH_Begin`, `HASH_Update` and `HASH_End` [functions][3].

3. PKCS7 object is created:

    1. An empty CMS message is created using `NSS_CMSMessage_Create`.

    2. A SignedData is created inside the CMS message using the
       `NSS_CMSSignedData_Create` function.

    3. Since we use a detached PKCS7 object (which means that the PKCS7
       signature object contains only the signature part, excluding the data
       itself) for the signing, an empty Data object is created inside the
       SignedData using `NSS_CMSContentInfo_SetContent_Data`.

    4. Certificate chain and signer info is added to the SignedData, using
       `NSS_CMSSignerInfo_IncludeCerts` and `NSS_CMSSignedData_AddSignerInfo`
       respectively.

    5. SHA1 is added to the CMS message using `NSS_CMSSignedData_SetDigestValue`.

    6. CMS message is DER-encoded via `NSS_CMSEncoder_Start` and
       `NSS_CMSEncoder_Finish`. (`NSS_CMSEncoder_Update` is not used since we don't
       have a Data).

4. Finally, DER encoded PKCS object is converted to the HEX
representation and written to the relevant structure of the PDF which is
prepared in the earlier commits.

And for the GUI part, I have used Thunderbird certificate selection GUI
design in the PDF export dialog. Now, the selected certificate
information is printed in a disabled Edit control and users are able to
clear the selected certificate to cancel the signing operation. (I have
also used the `PassWord = True` property in the .src file for the
certificate password input.)

At the end of the day, however, Adobe acroread shows the PDF signatures
as invalid for some reason. But, it shows the certificate details
correctly (which was not the case when I have used the old NSS PKCS7
API). So it seems DER/HEX encodings and the inclusion of the certificate
chain are correct but there is a bug, apparently. Maybe the calculation
of SHA1 or passing the private key password to NSS is wrong. I will try
to figure it out soon.

Thanks to kendy and sberg for their devoted support in this GSoC project.


[1]: https://developer.mozilla.org/en-US/docs/NSS/PKCS_7_functions
[4]: http://www.mozilla.org/projects/security/pki/nss/ref/nssfunctions.html#smime
[2]: http://api.libreoffice.org/docs/common/ref/com/sun/star/security/XCertificate.html#Encoded
[3]: http://www.mozilla.org/projects/security/pki/nss/ref/nssfunctions.html#utils
