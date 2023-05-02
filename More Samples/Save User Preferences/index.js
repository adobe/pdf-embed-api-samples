/*
Copyright 2021 Adobe
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

    /* Handler to store the user preferences */
    var setUserSettingHandler = function (setting) {
        return new Promise(function (resolve, reject) {
            /* This is an example code, where the user preferences are saved in the local storage of the website domain.
            Replace this with your own custom implementation of saving the preferences. */
            console.log("Setting user preferences in local storage of website domain.")
            localStorage.setItem("USER_SETTINGS", JSON.stringify(setting));
            var response = {
                code: AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
            };
            resolve(response);
        });
    };

    adobeDCView.registerCallback(
        AdobeDC.View.Enum.CallbackType.SET_USER_SETTING_API,
        setUserSettingHandler,
        {}
    );

    /* Handler to fetch the user preferences */
    var getUserSettingHandler = function () {
        return new Promise(function (resolve, reject) {
            /* This is an example code to fetch the user preferences. Replace with your own custom implementation. */
            console.log("Fetching user preferences from local storage of website domain.")
            var userSettings = localStorage.getItem("USER_SETTINGS") || "{}";
            userSettings = JSON.parse(userSettings);
            var response = {
                code: AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
                data: {
                    setting: userSettings
                }
            };
            resolve(response);
        });
    };

    adobeDCView.registerCallback(
        AdobeDC.View.Enum.CallbackType.GET_USER_SETTING_API,
        getUserSettingHandler,
        {}
    );
});
