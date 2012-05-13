---
title: GSoC 2012 - Introduction
layout: post
category: english
---

A Short Introduction
------------

Firstly, let me introduce myself. My name is Gökçen Eraslan, I'm a FLOSS developer and Computer Science
M.S. student in Bogazici University of Turkey. Previously I worked for
TUBITAK (The Scientific and Technological Research Council of Turkey,
equivalent of NSF in Turkey) for 4 years. I was a developer and
the release manager of the [Pardus Linux distribution project][1] which is a
government funded project aiming to develop a mature Linux distribution
along with technological innovations (a brand new package manager,
installer, configuration system etc.) as well as encouraging free
software development in Turkey in order to avoid the massive sums needed
for the license fees of proprietary operating systems. But lately Pardus
project is somehow suspended (details [here][2]) and most of the core
developers left Pardus.


GSoC 2012
---------

I have been selected as one of the [GSoC 2012 students](http://www.google-melange.com/gsoc/org/google/gsoc2012/libreoffice)
of the LibreOffice project. My GSoC proposal is to add digital signing support to PDF export
feature. This is an idea from [The Document Foundation ideas page][3]. Although I've fixed a python-based
[LibreOffice easyhack][4], I'm not experienced in LibreOffice codebase. But since the document signing 
(not PDF signing) is already supported by LibreOffice, I hope certificate management (such as listing and choosing certificates provided from the
certificate database of Mozilla applications) will be easy using the
existing classes.

Right now, I'm reading [ISO 32000-1:2008 PDF standard][5] and
my next planned step is to be familiar with PKCS#1, PKCS#7 and PKCS#12
standards and to learn code pointers to PDF export code in LibreOffice.


Tools and Frameworks for PDF Signing in Linux
---------------------------------------------

I am also looking for the ways of signing PDF files digitally in Linux. So, I can look at some real world examples about PDF signing and compare the documents signed by LibreOffice and those tools. Here are popular PDF signing tools and frameworks that I found:

1. [PortableSigner](http://portablesigner.sourceforge.net/): Best known PDF signing tool in Linux which is written in Java and licensed under [EUPL](http://joinup.ec.europa.eu/software/page/eupl). PortableSigner provides both CLI and GUI tools and requires your PKCS#12 file (containing your private key) and an X.509 certificate file (that authorizes you) to sign a PDF file. (In my next blog entry I want to briefly explain how digital signatures work.)

2. [iText](http://itextpdf.com/): Best known PDF framework also written in Java and licensed under AGPL. There is a C# port called iTextSharp as well. This framework implements various classes to generate PDF files as well as the classes to update PDF files. So it's can split, merge, sign and encrypt PDF files. Actually, iText is the crucial component of many known PDF tools including PortableSigner, [pdftk](http://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/) etc.

3. Proprietary tools such as [Adobe Reader](http://get.adobe.com/reader/), [myPDFSigner](http://www.kryptokoder.com/index.html) or [PDF Studio Pro](http://www.qoppa.com/pdfstudio/) can also sign PDF files. I tried Adobe Reader but I couldn't make it work under Linux due to the 32-64 bit library problems. (It requires 32-bit libxul.so and crashes with SIGSEGV when I point it to that library.) Anyway, I think the only benefit of Adobe Reader will be that I can use it to verify my signed PDF files.


That's it for today.


[1]:http://www.pardus.org.tr/en
[2]:http://developer.pardus.org.tr/people/ozan/blog/?p=144
[3]:http://wiki.documentfoundation.org/Development/Gsoc/Ideas#Sign_PDF_documents_on_export
[4]:https://bugs.freedesktop.org/show_bug.cgi?id=46538
[5]:http://www.adobe.com/devnet/acrobat/pdfs/PDF32000_2008.pdf
