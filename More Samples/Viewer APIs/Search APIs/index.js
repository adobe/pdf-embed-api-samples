/*
Copyright 2021 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

var viewerConfig = {
    /* Enable search APIs */
    enableSearchAPIs: true,  /* Default value is false */
};

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
    }, viewerConfig);

    /* Use the getAPIs() interface to invoke the viewer APIs */
    previewFilePromise.then(function (adobeViewer) {
        adobeViewer.getAPIs().then(function (apis) {
            /* API to search for a keyword in the PDF. The first search result is highlighted in the PDF. */
            apis.search("Plans")
                .then(function(searchObject) {
                    console.log("First search result highlighted in the PDF");
                    /* Register a callback function with onResultsUpdate(). 
                    This callback function is triggered every time a search action takes place and receives information about the current search result. */
                    searchObject.onResultsUpdate(console.log)
                        .then(function(result) {
                            console.log("Registered callback function with onResultsUpdate().", result);
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                    
                    /* Go to the next search result. */
                    setTimeout(function() {
                        searchObject.next()
                        .then(function(result) {
                            console.log("Next search result highlighted in the PDF.", result);
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                    }, 2000);
                    
                    /* Go to the next search result. */
                    setTimeout(function() {
                        searchObject.next()
                            .then(function(result) {
                                console.log("Next search result highlighted in the PDF.", result);
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                    }, 4000);
                    
                    /* Go to the previous search result. */
                    setTimeout(function() {
                    searchObject.previous()
                        .then(function(result) {
                            console.log("Previous search result highlighted in the PDF.", result);
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                    }, 6000);

                    /* Cancel the search operation and clear the search results. */
                    setTimeout(function() {
                    searchObject.clear()
                        .then(function(result) {
                            console.log("Search operation cancelled and search results cleared.", result);
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                    }, 8000);
                })
                .catch(function(error) {
                    console.log(error);
                });
        });
    });
});
