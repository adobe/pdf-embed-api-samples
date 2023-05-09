/*
Copyright 2019 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

/* Wait for Adobe Acrobat Services PDF Embed API to be ready */
document.addEventListener("adobe_dc_view_sdk.ready", function () {
    /* Initialize the AdobeDC View object */
    var adobeDCView = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: "<YOUR_CLIENT_ID>",
        /* Pass the div id in which PDF should be rendered */
        divId: "adobe-dc-view",
    });

    /* Invoke the file preview API on Adobe DC View object */
    adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* Location of file where it is hosted */
            location: {
                url: "https://acrobatservices.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf",
                /*
                If the file URL requires some additional headers, then it can be passed as follows:-
                headers: [
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
            fileName: "Bodea Brochure.pdf"
        }
    }, {});

    /* Register the callback to receive the events */
    adobeDCView.registerCallback(
        /* Type of call back */
        AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
        /* call back function */
        function (event) {
            console.log(event);
        },
        /* options to control the callback execution */
        {
            /* Enable PDF analytics events on user interaction. */
            enablePDFAnalytics: true,
        }
    );
});
