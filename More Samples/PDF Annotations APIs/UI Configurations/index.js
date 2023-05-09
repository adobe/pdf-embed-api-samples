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

/* Variable for holding annotation tool selected from custom comments pane */
var selectedAnnotationTool;

/* Initializing with the default annotation options */
var annotationOptions = {
    freetext: { defaultColor: "#000000", fontSize: "12px"},
    note: { defaultColor: "#fccb00"},
    highlight: { defaultColor: "#fccb00"},
    strikeout: { defaultColor: "#b80000"},
    underline: { defaultColor: "#008b02"},
    shape: { defaultColor: "#b80000", strokeWidth: 3},
    eraser: {}
};

/* Wait for Adobe Acrobat Services PDF Embed API to be ready */
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
            /* file ID */
            id: "6d07d124-ac85-43b3-a867-36930f502ac6"
        }
    }, viewerConfig);

    /* Use the annotation manager interface to invoke the commenting APIs*/
    previewFilePromise.then(function (adobeViewer) {

        /* Enable the annotation tools in the comments pane after PDF is rendered */
        Object.keys(annotationOptions).forEach(function(annotType) {
            document.getElementById(annotType).disabled = false;
        });

        adobeViewer.getAnnotationManager().then(function (annotManager) {
            annotationManager = annotManager;
            /* API to set UI configurations */
            const customFlags = {
                showToolbar: false,   /* Default value is true */
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
                    if (event.type === "ANNOTATION_MODE_STARTED" && document.getElementById(event.data)) {
                        document.getElementById(event.data).style.opacity = "1.0";
                    }
                    if (event.type === "ANNOTATION_MODE_ENDED" && document.getElementById(event.data)) {
                        document.getElementById(event.data).style.opacity = "0.5";
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

/* Select any annotation tool from the right-hand comments pane and start the annotation mode */
var selectAnnotationTool = function(annotTool) {
    document.getElementById("annot-color").value = annotationOptions[annotTool].defaultColor;
    document.getElementById("font-size").value = annotationOptions[annotTool].fontSize;
    document.getElementById("stroke-width").value = annotationOptions[annotTool].strokeWidth;

    document.getElementById("annot-color").style.display = "none";
    document.getElementById("font-size").style.display = "none";
    document.getElementById("stroke-width").style.display = "none";

    if (annotTool !== "eraser") {
        document.getElementById("annot-color").style.display = "inline-block";
    }

    if (annotTool === "freetext") {
        document.getElementById("font-size").style.display = "inline-block";
    }
    if (annotTool === "shape") {
        document.getElementById("stroke-width").style.display = "inline-block";
        document.getElementById("eraser").style.display = "inline-block";
    }

    if (selectedAnnotationTool !== annotTool) {
        selectedAnnotationTool = annotTool;
        startAnnotationMode(annotTool, {});
    } else {
        endAnnotationMode();
        selectedAnnotationTool = "";
        document.getElementById("annot-color").style.display = "none";
        document.getElementById("font-size").style.display = "none";
        document.getElementById("stroke-width").style.display = "none";
        document.getElementById("eraser").style.display = "none";
    }
}

/* Set annotation options (such as, color and font size) and start annotation mode */
var setAnnotationOptions = function() {
    annotationOptions[selectedAnnotationTool].defaultColor = document.getElementById("annot-color").value;

    if (document.getElementById("font-size").value) {
        annotationOptions[selectedAnnotationTool].fontSize = document.getElementById("font-size").value;
    }

    if (document.getElementById("stroke-width").value) {
        annotationOptions[selectedAnnotationTool].strokeWidth = parseInt(document.getElementById("stroke-width").value);
    }

    startAnnotationMode(selectedAnnotationTool, annotationOptions[selectedAnnotationTool]);
}

/* Start the annotation mode */
var startAnnotationMode = function(mode, options) {
    annotationManager.startAnnotationMode(mode, options)
        .then(function () {})
        .catch(function(error) { console.log(error)});
}

/* End the annotation mode */
var endAnnotationMode = function() {
    annotationManager.endAnnotationMode()
        .then(function () {})
        .catch(function(error) { console.log(error)});
}

/* Start the eraser annotation mode */
var selectEraserTool = function() {
    if(document.getElementById("eraser").style.opacity !== "1") {
        document.getElementById("eraser").style.opacity = "1.0";
        annotationManager.startAnnotationMode("eraser")
            .then(function () {})
            .catch(function(error) { console.log(error)});
    } else {
        document.getElementById("eraser").style.opacity = "0.5";
        annotationManager.endAnnotationMode()
            .then(function () {})
            .catch(function(error) { console.log(error)});
    }
}
