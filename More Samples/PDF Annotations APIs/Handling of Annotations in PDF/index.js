/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

var viewerConfig = {
    /* Enable commenting APIs */
    enableAnnotationAPIs: true,  /* Default value is false */
    /* Include existing PDF annotations and save new annotations to PDF buffer */
    includePDFAnnotations: true  /* Default value is false */
};

/* Wait for Adobe Acrobat Services PDF Embed API to be ready */
document.addEventListener("adobe_dc_view_sdk.ready", function () {
    /* Initialize the AdobeDC View object */
    var adobeDCView = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: "<YOUR_CLIENT_ID>",
        /* Pass the div id in which PDF should be rendered */
        divId: "adobe-dc-view",
    });

    /* Invoke the file preview API on Adobe DC View object and return the Promise object */
    var previewFilePromise = adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* Location of file where it is hosted */
            location: {
                url: "https://acrobatservices.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf",
                /*
                If the file URL requires some additional headers, then it can be passed as follows:-
                header: [
                    {
                        key: "<HEADER_KEY>",
                        value: "<HEADER_VALUE>",
                    }
                ]
                */
            },
        },
        /* Pass meta data of file */
        metaData: {
            /* file name */
            fileName: "Bodea Brochure.pdf",
            /* file ID */
            id: "6d07d124-ac85-43b3-a867-36930f502ac6"
        }
    }, viewerConfig);

    /* Use the annotation manager interface to invoke the commenting APIs*/
    previewFilePromise.then(function (adobeViewer) {
        adobeViewer.getAnnotationManager().then(function (annotationManager) {
            /* API to add annotations to PDF and return the updated PDF buffer */
            /* These APIs will work only when includePDFAnnotations is set to true in viewerConfig */
            annotationManager.addAnnotationsInPDF(annotations)
                .then(function (result) {
                    console.log("Annotations added to PDF successfully and updated PDF buffer returned.", result)
                })
                .catch(function (error) {
                    console.log(error)
                });

            /* API to remove annotations from PDF and return the updated PDF buffer along with the list of annotations */
            setTimeout(function() {
                annotationManager.removeAnnotationsFromPDF()
                .then(function (result) {
                    console.log("Annotations removed from PDF successfully and updated PDF buffer and annotation list returned.", result)
                })
                .catch(function (error) {
                    console.log(error)
                });
            }, 3000);
        });
    });
});
