/*
Copyright 2021 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

/* Wait for Adobe Document Services PDF Embed API to be ready */
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
                url: "https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf",
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
        }
    }, {});

    /* Use the getAPIs() interface to invoke the viewer APIs */
    previewFilePromise.then(function (adobeViewer) {
        adobeViewer.getAPIs().then(function (apis) {
            /* API to get the minimum and maximum zoom level limit of the PDF */
            apis.getZoomAPIs().getZoomLimits()
                .then(function (result) {
                    console.log("Minimum and maximum zoom limit of the PDF: ", result)
                })
                .catch(function (error) {
                    console.log(error)
                });
            
            /* API to zoom in on the PDF */
            setTimeout(function() {
                apis.getZoomAPIs().zoomIn()
                .then(function (result) {
                    console.log("Resultant zoom level after zoom in operation: ", result)
                })
                .catch(function (error) {
                    console.log(error)
                });
            }, 2000);

            /* API to zoom out of the PDF */
            setTimeout(function() {
                apis.getZoomAPIs().zoomOut()
                    .then(function (result) {
                        console.log("Resultant zoom level after zoom out operation: ", result)
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }, 4000);

            /* API to set a desired zoom level */
            setTimeout(function() {
                apis.getZoomAPIs().setZoomLevel(1.5)
                    .then(function (result) {
                        console.log("Resultant zoom level after setting zoom level: ", result)
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }, 6000);
        });
    });
});
