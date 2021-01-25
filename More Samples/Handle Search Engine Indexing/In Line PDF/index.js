/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

/* Function to render the file using PDF Embed API on clicking the PDF link. */
function onClick(pdf, embedMode) {
    document.getElementById('adobe-dc-view').setAttribute('style', 'border: 1px solid lightgrey; width: 70vw; height: 50vw; margin: 0 auto;');
  
    if (window.AdobeDC && window.AdobeDC.View) {
        showFile(pdf, embedMode);
    }

    /* Wait for Adobe Document Services PDF Embed API to be ready. */
    document.addEventListener("adobe_dc_view_sdk.ready", function () {
        showFile(pdf, embedMode);
    });
    return false;
};

function showFile(pdf, embedMode) {
    /* Initialize the AdobeDC View object */
    var adobeDCView = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: "<YOUR_CLIENT_ID>"
    });

    /* Pass the embed mode option here */
    const viewerConfig = {
        embedMode: embedMode
    };

    /* Invoke the file preview API on Adobe DC View object */
    adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* Location of file where it is hosted */
            location: {
                url: "https://documentcloud.adobe.com/view-sdk-demo/PDFs/" + pdf,
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
            fileName: pdf
        }
    }, viewerConfig);
}