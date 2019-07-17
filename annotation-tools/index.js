/*
Copyright 2019 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

/* Wait for Adobe Document Cloud View SDK to be ready */
document.addEventListener("adobe_dc_view_sdk.ready", function() {
    /* Initialize the AdobeDC View object */
    var adobeDCView = new AdobeDC.View({
        /* Pass your regsitered client id */
        clientId: "<YOUR_CLIENT_ID>",
        /* Pass the div id in which PDF should be rendered */
        divId: "adobe-dc-view",
    });

    /* Invoke the file preview API on Adobe DC View object */
    adobeDCView.previewFile({
        /* Pass information on how to accesss the file */
        content: {
            /* Location of file where it is hosted */
            location: {
                url: "https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf",
                /*
                If accessing file from URL requires some addition headers like "Authorization" etc.
                It can be passed in headers.
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
            fileName: "Bodea Brochure.pdf"
        }
    }, {
        showAnnotationTools: true
    });

    /* Define Save API Handler */
    var saveApiHandler = function(metaData, content, options) {
        console.log(metaData, content, options);
        /* Dummy implementation of Save API, replace with your implementation */
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                var response = {
                    code: AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
                    data: {
                        metadata: Object.assign(metaData, {fileName: config.fileName})
                    },
                };
                resolve(response)
            }, 2000);
        });
    };

    /* control Save API options */
    const options = {
        /* control the content of file, incremental false means full file content */
        incremental: false,
    };
/*
    adobeDCView.registerCallback(
        AdobeDC.View.Enum.CallbackType.SAVE_API,
        saveApiHandler,
        options
    );
*/
});