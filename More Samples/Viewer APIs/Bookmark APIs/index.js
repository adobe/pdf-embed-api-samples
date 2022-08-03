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
    /* Disable bookmark in right hand panel */
    showBookmarks: false,
};

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
    }, viewerConfig);


    /* Use the getAPIs() interface to invoke the viewer APIs */
    previewFilePromise.then(function (adobeViewer) {
        adobeViewer.getAPIs().then(function (apis) {
            viewerApis = apis;
            /* Fetch and display the bookmarks available in the PDF. */
            getBookmarks();
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

/* Function to get the list of bookmarks. */
var getBookmarks = function() {
    var bookmarkPaneItem = document.getElementById("bookmark-pane");
    viewerApis.getBookmarkAPIs().getBookmarks()
        .then(function(bookmarks) {
            if (bookmarks.length === 0) {
                /* Check when there is no bookmark. */
                console.log("No bookmark available in the PDF");
                var label = document.createElement("label");
                label.innerText = "No bookmark available in the PDF";
                label.style.color = "#777";
                label.style.fontFamily = "Lato, sans-serif;";
                label.style.fontWeight = "bold";
                bookmarkPaneItem.appendChild(label);
            } else {
                /* Create the list of bookmarks. */
                var list = document.createElement("ul");
                bookmarks.forEach(function(element) {
                    createBookmarkList(list, element);
                });
                bookmarkPaneItem.appendChild(list);
                console.log("Bookmarks displayed in the left-hand pane.");
            }
        })
        .catch(function(error) {
            console.log(error);
        })
}

/* Create the list of bookmarks and display in the left-hand custom pane. */
var createBookmarkList = function(bookmarkList, bookmarkItem) {
    var listItem = document.createElement("li");
    var subList;
    listItem.id = bookmarkItem.id;
    listItem.innerText = bookmarkItem.title;

    bookmarkList.appendChild(listItem);
    bookmarkItem.children.forEach(function(child) {
        subList = document.createElement("ul");
        createBookmarkList(subList, child);
        listItem.appendChild(subList);
    })
    listItem.onclick = function (e) {
        e.stopImmediatePropagation();
        openBookmark(listItem.id);
    };
}

/* Open any bookmark in the PDF. */
var openBookmark = function(bookmarkID) {
    viewerApis.getBookmarkAPIs().openBookmark(bookmarkID)
        .then(function() {
            console.log("Bookmark with ID " + bookmarkID + " opened.");
        })
        .catch(function(error) {
            console.log(error);
        })
}
