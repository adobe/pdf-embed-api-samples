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
    /* Disable zoom control in page controls */
    showZoomControl: false
};

/* Variable for holding reference of viewer APIs */
var viewerApis;

/* Variable for holding reference of search object */
var searchObject;

/* Wait for Adobe Acrobat Services PDF Embed API to be ready */
document.addEventListener("adobe_dc_view_sdk.ready", function () {
    /* Initialize the AdobeDC View object */
    var adobeDCView = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: "<YOUR_CLIENT_ID>",
        /* Pass the div id in which PDF should be rendered */
        divId: "adobe-dc-view",
    });

    /* Search operation should also get initiated on pressing Enter key */
    var searchInputElement = document.getElementById("search-input");
    searchInputElement.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            search(searchInputElement.value);
        }
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
        }
    }, viewerConfig);

    /* Use the getAPIs() interface to invoke the viewer APIs */
    previewFilePromise.then(function (adobeViewer) {

        /* Enable the custom search and zoom buttons after PDF is rendered */
        document.querySelectorAll(".zoom-btn").forEach(function(btn){
            btn.disabled = false;
        })
        document.getElementById("search-btn").disabled = false;
        document.getElementById("clear-btn").disabled = false;

        adobeViewer.getAPIs().then(function (apis) {
            /* API to search for a keyword in the PDF. The first search result is highlighted in the PDF. */
            viewerApis = apis;

            /* Get current page zoom level and display in the UI  */
            getCurrentPageZoom();

            /* Fetch the maximum and minimum zoom levels of the PDF */
            viewerApis.getZoomAPIs().getZoomLimits()
                .then(function (result) {
                    console.log("Minimum and maximum zoom limit of the PDF: ", result)
                })
                .catch(function (error) {
                    console.log(error)
                });
        });
    });
});

/* **************************************
/* Search APIs */
/* **************************************/

/* Start the search operation */
var search = function(searchTerm) {
    viewerApis.search(searchTerm)
        .then(function(sObj) {
            searchObject = sObj;
            searchObject.onResultsUpdate(searchCallback)
                .then(function(result) {
                    console.log("Registered callback function with onResultsUpdate(): ", result)
                })
                .catch(function(error) {
                    console.log(error)
                });
        })
        .catch(function(error) {
            var errorMsg = "";
            if(error.code === "FAIL") {
                errorMsg = "No search result found";
            } else if(error.code === "INVALID_INPUT") {
                errorMsg = "Enter valid search term";
            }
            document.getElementById("search-result").style.display = "block";
            document.getElementById("searchResult-num").innerText = errorMsg;
            document.getElementById("search-result").querySelectorAll(".searchResult-btn").forEach(function(element) {
                element.style.opacity = "0.2";
                element.disabled = true;
            });
        })
}

/* Callback function which is passed to the onResultsUpdate() function of search API.
   The search results are displayed in the right-hand pane. */
function searchCallback(searchResult) {
    var currentResultIndex = searchResult.currentResult.index;
    var totalResults = searchResult.totalResults;
    var searchResultItem = document.getElementById("search-result");
    searchResultItem.style.display = "block";
    document.getElementById("searchResult-num").innerText = "Result " + currentResultIndex + " of " + totalResults;
    searchResultItem.querySelectorAll(".searchResult-btn").forEach(function(element) {
        element.style.opacity = "0.8";
        element.disabled = false;
    });
}

/* Select the next search result */
var nextSearchResult = function() {
    searchObject.next()
        .then(function() {
            console.log("Navigate to the next search result.");
        })
        .catch(function(error) {
            console.log(error);
        });
}

/* Select the previous search result */
var previousSearchResult = function() {
    searchObject.previous()
        .then(function() {
            console.log("Navigate to the previous search result.");
        })
        .catch(function(error) {
            console.log(error);
        });
}

/* Cancel the search operation and clear the search results */
var clearSearchResult = function() {
    document.getElementById("search-input").value = "";
    if (searchObject) {
        searchObject.clear()
            .then(function() {
                console.log("Search operation cancelled and search results cleared.");
                searchObject = null;
                var searchResultItem = document.getElementById("search-result");
                searchResultItem.style.display = "none";
                searchResultItem.querySelectorAll(".searchResult-btn").forEach(function(element) {
                    element.style.opacity = "0.2";
                    element.disabled = true;
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

/* Get the zoom level of the current page. */
var getCurrentPageZoom = function() {
    viewerApis.getCurrentPage()
        .then(function(pageNum) {
            viewerApis.getPageZoom(pageNum)
                .then(function(pageNum) {
                    console.log("Zoom level of current page: ", pageNum);
                    document.getElementById("set-zoom").value = pageNum;
                })
                .catch(function(error) {
                    console.log(error);
                })
        })
        .catch(function(error) {
            console.log(error);
        })
}

/* **************************************
/* Zoom APIs */
/* **************************************/

/* Perform zoom-out operation */
var zoomOut = function() {
    viewerApis.getZoomAPIs().zoomOut()
        .then(function(result) {
            document.getElementById("set-zoom").value = result;
        })
        .catch(function(error) {
            console.log(error);
        })
}

/* Perform zoom-in operation */
var zoomIn = function() {
    viewerApis.getZoomAPIs().zoomIn()
        .then(function(result) {
            document.getElementById("set-zoom").value = result;
        })
        .catch(function(error) {
            console.log(error);
        })
}

/* Set zoom level of the PDF */
var setZoomLevel = function(zoomLevel) {
    viewerApis.getZoomAPIs().setZoomLevel(parseFloat(zoomLevel))
        .then(function(result) {
            console.log("Setting zoom level of PDF to: " + result);
            document.getElementById("set-zoom").value = result;
        })
        .catch(function(error) {
            console.log(error);
            /* In case of error, set the zoom level to the current page zoom */
            getCurrentPageZoom();
        })
}

