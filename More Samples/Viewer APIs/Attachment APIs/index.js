/*
Copyright 2021 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

/* Variable for holding reference of viewer API */
var viewerApis;

/* Helper function to render the file using PDF Embed API. */
function previewFile(filePromise, fileName) {
    /* Initialize the AdobeDC View object */
    var adobeDCView = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: "<YOUR_CLIENT_ID>",
        /* Pass the div id in which PDF should be rendered */
        divId: "adobe-dc-view",
    });

    /* Invoke the file preview API on Adobe DC View object */
    var previewFilePromise = adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* Pass file promise which resolves to arrayBuffer */
            promise: filePromise,
        },
        /* Pass meta data of file */
        metaData: {
            /* file name */
            fileName: fileName
        }
    }, {});


    /* Use the getAPIs() interface to invoke the viewer APIs */
    previewFilePromise.then(function (adobeViewer) {
        adobeViewer.getAPIs().then(function (apis) {
            viewerApis = apis;
            /* Fetch and display the attachments available in the PDF. */
            getAttachments();
        });
    });
}

/* Helper function to check if selected file is PDF or not. */
function isValidPDF(file) {
    if (file.type === "application/pdf") {
        return true;
    }
    if (file.type === "" && file.name) {
        var fileName = file.name;
        var lastDotIndex = fileName.lastIndexOf(".");
        return !(lastDotIndex === -1 || fileName.substr(lastDotIndex).toUpperCase() !== "PDF");
    }
    return false;
}

/* Helper function to listen for file upload and
 * creating Promise which resolve to ArrayBuffer of file data.
 **/
function listenForFileUpload() {
    var fileToRead = document.getElementById("file-picker");
    fileToRead.addEventListener("change", function (event) {
        var files = fileToRead.files;
        if (files.length > 0 && isValidPDF(files[0])) {
            var fileName = files[0].name;
            var reader = new FileReader();
            reader.onloadend = function (e) {
                var filePromise = Promise.resolve(e.target.result);
                previewFile(filePromise, fileName);
            };
            reader.readAsArrayBuffer(files[0]);
        }
    }, false);
}

/* Function to get the list of attachments. */
var getAttachments = function () {
    var attachmentPaneItem = document.getElementById('attachment-pane');
    viewerApis.getAttachmentAPIs().getAttachments()
        .then(function (attachments) {
            if (attachments.length === 0) {
                /* Check when there is no attachment. */
                console.log("No attachment available in the PDF");
                var label = document.createElement("label");
                label.innerText = "No attachment available in the PDF";
                label.style.color = "#777";
                label.style.fontFamily = "Lato, sans-serif;";
                label.style.fontWeight = "bold";
                attachmentPaneItem.appendChild(label);
            } else {
                /* Create the list of attachments. */
                var list = document.createElement("ul");
                attachments.forEach(function (element) {
                    createAttachmentList(list, element);
                });
                attachmentPaneItem.appendChild(list);
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}

/* Create the list of attachments and display in the left-hand custom pane. */
var createAttachmentList = function (attachmentList, attachmentItem) {
    var listItem = document.createElement("li");
    listItem.id = listItem.innerText = attachmentItem.name;
    attachmentList.appendChild(listItem);

    listItem.onclick = function (e) {
        e.stopImmediatePropagation();
        getAttachmentBuffer(listItem.id, attachmentItem.mimeType);
    };
}

/* Download the attachment from the PDF. */
var getAttachmentBuffer = function (attachmentName, mimeType) {
    viewerApis.getAttachmentAPIs().getAttachmentBuffer(attachmentName)
        .then(function (res) {
            var blob=new Blob([res.buffer], {type: mimeType});
                var link=document.createElement("a");
                link.href=window.URL.createObjectURL(blob);
                link.download=attachmentName;
                link.click();
        })
        .catch(function (error) {
            console.log(error);
        })
}
