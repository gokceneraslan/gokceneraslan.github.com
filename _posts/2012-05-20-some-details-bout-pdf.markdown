---
title: A Short Introduction to PDF
layout: post
category: english
---

In this blog post, I'll try to summarize what I have learnt about PDF so far. I used the [ISO 32000-1:2008 document](http://www.adobe.com/content/dam/Adobe/en/devnet/acrobat/pdfs/PDF32000_2008.pdf) as a reference.

### Standardization

* To make desktop printers able to render complex text and graphics files in a uniform way, PostScript page description language is created in 1985. Similarly, as a way to view these complex text and graphics files electronically in a platform independent manner, PDF is created by Adobe Systems company in 1992 under the name Project Camelot.

* PDF was originally a proprietary format controlled by Adobe. In 1993, the first complete PDF specification is published (PDF 1.0) by Adobe and this specification is free of charge since 2001. The last reference is the [PDF 1.7 file](http://wwwimages.adobe.com/www.adobe.com/content/dam/Adobe/en/devnet/acrobat/pdfs/pdf_reference_1-7.pdf) issued by Adobe.

* There are also some specialized and more restrictive subsets of PDF such as PDF/A (PDF for archive), PDF/X (PDF for exchange), PDF/E (PDF for engineering) etc. These subsets are released as ISO standards in 2001, 2005 and 2008 respectively. As I said, those are more restrictive file formats. For example, you may embed the fonts into a PDF file or not (more on that later). You are free to use external references for fonts, images, videos etc. (just like the HTML files). But if you are preparing a PDF/A compatible PDF file, you have to embed all the fonts you used. In PDF/A, the external content references are forbidden as well as audio/video content and encyption. Shortly; in these subsets, some PDF features that are not suited for some specific reasons (like archiving, exchange etc.) are left out.

* Since 2008, PDF is an ISO standard, namely [ISO 32000-1:2008](http://www.iso.org/iso/catalogue_detail.htm?csnumber=51502). This standard is consistent with the PDF 1.7 which was the last PDF specification published by Adobe. Future versions of PDF will be published by the ISO technical commitees. But after ISO 32000-1, Adobe published [some extensions](http://www.adobe.com/devnet/pdf/pdf_reference.html) to the ISO 32000-1:2008 standard and those extensions will be added in ISO 32000-2 which will be the PDF 2.0.


### PDF internals

Now, I want to mention about some interesting bits of the PDF:

* PDF files start with the %PDF-x.y marker stating which version of PDF the file comforms with. Even though the rest of the file is binary, all the keywords of the format (such as obj/endobj, stream/endstream or Named Objects like /Type, Length etc.) are ASCII strings. So, you can roughly have an idea about the structure of the document when you inspect the file with a text editor. But be careful about file editing! Since text editors may change/convert line endings, it's not recommended to edit PDF files with text editors.

* Type 1, TrueType and OpenType fonts can be embedded to PDF files. If you want the document to be smaller, subset of a font may also be embedded. But whether you embed any fonts or not, PDF standard assumes that viewer applications can display 14 basic fonts such as Helvetica, Times, Courier etc. In the case that you refer to a non-standard font that is also not embedded, it's the responsibility of the viewer application to find those fonts in the environment. As you guess, this approach damages portability since users may not have the fonts used in the file.

* All the text, images, numbers, shapes and even the pages of the PDF document are represented as "objects" in PDF files. At the end of the each PDF file, there is a section called xref (read as the "cross reference table"), that keeps the byte offset of the objects from the start of the file to provide random access to all objects. xref is stored at the end of the file, so that the PDF creator applications can create a PDF file in a single pass. This also provides an efficient way to view the document, for example think about a document with thousands of pages, if a reader wants to render page 456, it can find that page quickly using the xref table. PDF files are read from the end of the file to get the xref table and object offsets. 

* Encryption and digital signing is possible in PDF. For password-based symmetric encryption; RC4 (proprietary algorithm of RSA) or AES (starting with PDF 1.6) algorithms are used with 40 or 128 bit keys. Actually, MD5 digest of the password is used as the key of RC4 or AES. Additionally,  public key encyrption can used used with the combination of symmetric encryption. Basically; symmetric key that is used to encrypt the document is encrypted with the public key of a user. When that user gets the document, she first decrypts the symmetric key using her private key and then decrypts the document with the symmetric key. Moreover, you can define user-based access permissions such as user Ibrahim cannot print the document but can fill the forms, user Ozan can add annotations but cannot copy text etc. (I will tell the details about the digital signatures in the next post.)

* PDF files may contain interactive forms fields (such as push buttons, radio buttons, checkboxes etc.) to gather information interactively from the user. You can also define an Action and associate that action with a form element (like a button). So it's possible to play a sound, submit form values to a URL, reset form fields, interpret JavaScript code, launch an application etc. when a button is pressed. I know, JavaScript seems interesting, but for example it's possible to modify the appearence of the PDF file using JavaScript. [Here](http://wwwimages.adobe.com/www.adobe.com/content/dam/Adobe/en/devnet/acrobat/pdfs/js_api_reference.pdf) is the JavaScript API defined by Adobe.

* Compression of the objects (text, images etc.) are supported. So, you can compress your images using JPEG, JPEG2000, CCITT and JBIG2 while you can use LZW or Flate for text, graphics or images.

* Incremental updates: PDF allows modifications to be appended to the end of the file. This appended part only contains the modified objects in the PDF file. In this way, you don't have to load the whole document and rewrite all parts of the document each time it's saved. For example, when you digitally sign the document using a tool (such as [PortableSigner](http://portablesigner.sourceforge.net), you can see that only some new objects including /Sig and /SigRef dictionaries are stored at the end of the file.

   Another advantage of this method is the possibility of undoing changes. Since the original document is preserved, it's easy to render it. 

That's it for today.
