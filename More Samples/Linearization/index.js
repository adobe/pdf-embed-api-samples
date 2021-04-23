/*
Copyright 2021 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/


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
    adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* pass file promise which resolve to arrayBuffer */
            promise: filePromise,
            linearizationInfo: {
                getInfo: () => getInfo(),
                getInitialBuffer: () => getInitialBuffer(),
                getFileBufferRanges: ranges => getPDFBufferRanges(ranges),
            }
        },
        /* Alternatively you can specify a supported linearized PDF URL */
        /* content: {
            // Location of file where it is hosted 
            location: {
                url: "<YOUR_URL>",
            },
        }, */
        /* Pass meta data of file */
        metaData: {
            /* file name */
            fileName: fileName
        }
    }, {
        enableLinearization: true
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

var fileBuffer;
var fileSize;

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
                fileBuffer = e.target.result;
                fileSize = e.target.result.byteLength;
                var filePromise = new Promise((resolve, _reject) => {
                    // Simulating that complete file buffer takes time to become available
                    setTimeout(() => {
                        resolve(fileBuffer);
                    }, 10 * 1000);
                });
                previewFile(filePromise, fileName);
            };
            reader.readAsArrayBuffer(files[0]);
        }
    }, false);
}

/* Helper function to return file content length */
function getInfo() {
    return new Promise((resolve, _reject) => {
        resolve({
            fileSize,
        });
    });
}

/* Helper function to return the intial array buffer required to render the first page of the linearized PDF */
function getInitialBuffer() {
    return new Promise((resolve, _reject) => {   
        // Simulating initial buffer response
        resolve({
            buffer: fileBuffer.slice(0, 1024) // Passing the first 0-1024 bytes of PDF buffer
        });
    });
}

/* Helper function to get the required array buffers of the linearized PDF */
function getPDFBufferRanges(ranges) {
    return new Promise((resolve, _reject) => {
        // Simulating partial content buffer ranges response
        const result = [];
        ranges.forEach(range => {
            result.push(fileBuffer.slice(range.start, range.end + 1));
        });
        resolve({
            bufferList: result
        });
    });
}


