/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

import { Component, AfterViewInit, Input } from '@angular/core';

@Component({
    selector: 'custom-rhp-component',
    templateUrl: './custom-rhp.component.html'
})
export class CustomRHPComponent implements AfterViewInit {
    @Input() annotationManager: any;

    annotationListItems: any[] = [];
    selectedAnnotationId: string;

    annotationEventListener = (event: any) => {
        if (event.type === 'ANNOTATION_ADDED') {
            if (event.data.bodyValue) {
                this.onAnnotationAdded(event.data);
            } else {
                this.addCommentText(event.data);
            }
        }
        if (event.type === 'ANNOTATION_DELETED') {
            this.onAnnotationDeleted(event.data.id);
        }
        if (event.type === 'ANNOTATION_SELECTED') {
            this.toggleSelectedAnnotation(event.data.id);
        }
        if (event.type === 'ANNOTATION_UNSELECTED') {
            this.toggleSelectedAnnotation(undefined);
        }
        if (event.type === "ANNOTATION_UPDATED" && event.data.target.selector.subtype === "freetext") {
            this.onTextAnnotationUpdated(event.data);
        }
        console.log(event);
    }

    /* This will add a new annotation list item */
    onAnnotationAdded = (annotation: any) => {
        this.annotationListItems.push(annotation);
    };

    /* This will delete the annotation list item */
    onAnnotationDeleted = (id: any) => {
        this.annotationListItems = this.annotationListItems.filter(item => item.id !== id);
    }

    /* This will set/unset selected annotation id */
    toggleSelectedAnnotation = (id: string) => {
        this.selectedAnnotationId = id;
    }

    /* This will update the text in the annotation list item when text annotation is updated from UI */
    onTextAnnotationUpdated = (annotation: any) => {
        var index = this.annotationListItems.findIndex(item => item.id === annotation.id);
        this.annotationListItems[index].bodyValue = annotation.bodyValue;
    }

    addCommentText = (annotation: any) => {
        const type = annotation.target.selector.subtype;
        const comment = prompt('Enter the text associated with ' + type, 'Added a ' + type) || 'Added a ' + type;
        annotation.bodyValue = comment;
        this.annotationManager.updateAnnotation(annotation)
            .then(() => {
                console.log('Annotation updated successfully.');
                this.onAnnotationAdded(annotation);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    ngAfterViewInit() {
        /* API to register events listener */
        this.annotationManager.registerEventListener(this.annotationEventListener);
    }
}
