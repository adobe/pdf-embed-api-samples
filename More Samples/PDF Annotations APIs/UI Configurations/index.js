/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

var viewerConfig = {
    /* Enable commenting APIs */
    enableAnnotationAPIs: true,  /* Default value is false */
};

/* Variable for holding reference of Annotation Manager */
var annotationManager;

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
            /* file ID */
            id: "6d07d124-ac85-43b3-a867-36930f502ac6"
        }
    }, viewerConfig);

    /* Use the annotation manager interface to invoke the commenting APIs*/
    previewFilePromise.then(function (adobeViewer) {
        adobeViewer.getAnnotationManager().then(function (annotManager) {
            annotationManager = annotManager;
            /* API to set UI configurations */
            const customFlags = {
                /* showToolbar: false,   /* Default value is true */
                showCommentsPanel: false,  /* Default value is true */
                downloadWithAnnotations: true,  /* Default value is false */
                printWithAnnotations: true,  /* Default value is false */
            };

            function addCommentText(annotation) {
                var type = annotation.target.selector.subtype;
                var comment = prompt("Enter the text associated with " + type, "Added a " + type) || "Added a " + type;
                annotation.bodyValue = comment;
                annotationManager.updateAnnotation(annotation)
                    .then(function () {
                        console.log("Annotation updated successfully.");
                        addAnnotation(annotation);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }

            annotationManager.setConfig(customFlags)
                .then(function () {
                    console.log("Custom flags applied successfully.")
                })
                .catch(function (error) {
                    console.log(error)
                });

            /* API to register events listener */
            annotationManager.registerEventListener(
                function (event) {
                    if (event.type === "ANNOTATION_ADDED") {
                        if (event.data.bodyValue) {
                            addAnnotation(event.data);
                        } else {
                            addCommentText(event.data);
                        }
                    }
                    if (event.type === "ANNOTATION_DELETED" && document.getElementById(event.data.id)) {
                        document.getElementById("annots").removeChild(document.getElementById(event.data.id));
                    }
                    if (event.type === "ANNOTATION_SELECTED" && document.getElementById(event.data.id)) {
                        document.getElementById(event.data.id).style.border = "2px solid #3D85B0";
                    }
                    if (event.type === "ANNOTATION_UNSELECTED" && document.getElementById(event.data.id)) {
                        document.getElementById(event.data.id).style.border = "2px solid #eee";
                    }
                    if (event.type === "ANNOTATION_UPDATED" && document.getElementById(event.data.id)) {
                        document.getElementById(event.data.id).getElementsByTagName("label")[0].innerText = event.data.bodyValue;
                    }
                    console.log(event);
                }
            );
        });
    });
});


/* Variable for holding dom reference of Annotation collection */
var annotsHolder;

document.addEventListener("DOMContentLoaded", function () {
    annotsHolder = document.getElementById("annots");
});

/* This will create and return a new Annotation list item */
var createAnnotationItem = function (annotation) {

    var listItem = document.createElement("li");
    listItem.id = annotation.id;

    var label = document.createElement("label");//label
    var editInput = document.createElement("input");//text
    var editButton = document.createElement("button");//edit button
    var deleteButton = document.createElement("button");//delete button

    label.innerText = annotation.bodyValue;

    /* Each elements, needs appending */
    editInput.type = "text";

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    /* and appending. */
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
};

/* This will add a new Annotation list item to List and attach action of Edit and Delete Buttons */
var addAnnotation = function (annotation) {
    /* Create a new list item with the text from new annotation: */
    var listItem = createAnnotationItem(annotation);
    /* Append listItem to incompleteTaskHolder */
    annotsHolder.appendChild(listItem);
    var editButton = listItem.querySelector("button.edit");
    var deleteButton = listItem.querySelector("button.delete");


    /* Bind editAnnotation to edit button. */
    editButton.onclick = function (e) {
        e.stopImmediatePropagation();
        editAnnotation(annotation, this.parentNode);
    };
    /* Bind deleteAnnotation to delete button. */
    deleteButton.onclick = function (e) {
        e.stopImmediatePropagation();
        deleteAnnotation(annotation, this.parentNode);
    };

    listItem.onclick = function () {
        annotationManager.selectAnnotation(annotation.id).then(function () {}).catch(function () {});
    }
};

/* Edit an existing annotation using Annotation API and update the list item as well. */
var editAnnotation = function (annotation, parentNode) {
    var listItem = parentNode;

    var editInput = listItem.querySelector("input[type=text]");
    var editButton = listItem.querySelector("button");
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");
    /* If class of the parent is .editmode */
    if (containsClass) {
        /* switch to .editmode */
        /* label becomes the inputs value. */
        label.innerText = editInput.value;
        editButton.textContent = "Edit";
        annotation.bodyValue = editInput.value;
        annotationManager.updateAnnotation(annotation)
            .then(function () {
                console.log("Annotation updated successfully.")
            })
            .catch(function (error) {
                console.log(error)
            });
    } else {
        editInput.value = label.innerText;
        editButton.textContent = "Save";
    }

    /* toggle .editmode on the parent. */
    listItem.classList.toggle("editMode");
};

/* Delete an existing annotation from Annotation API and remove the same from list */
var deleteAnnotation = function (annotation, parentNode) {
    var listItem = parentNode;
    var ul = listItem.parentNode;
    /* Remove the parent list item from the ul. */
    ul.removeChild(listItem);
    var filter = {
        annotationIds: [annotation.id]
    };
    annotationManager.deleteAnnotations(filter)
        .then(function () {
            console.log("Annotation deleted successfully.")
        })
        .catch(function (error) {
            console.log(error)
        });
};
