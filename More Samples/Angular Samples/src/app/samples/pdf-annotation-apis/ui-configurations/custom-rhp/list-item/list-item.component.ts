/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
    selector: 'list-item-component',
    templateUrl: './list-item.component.html'
})
export class ListItemComponent implements AfterViewInit {
    @Input() annotation: any;
    @Input() selectedAnnotationId: string;
    @Input() annotationManager: any;

    inEditMode = false;
    editInputValue: any = undefined;

    /* Bind editAnnotation to edit button. */
    editButtonOnClick = (e: any) => {
        e.stopPropagation();
        /* If in editMode */
        if (this.inEditMode) {
            /* in editMode */
            this.editAnnotation(this.annotation);
            /* toggle editMode */
            this.inEditMode = false;
        } else {
            /* toggle editMode */
            this.inEditMode = true;
            if(this.editInputValue !== this.annotation.bodyValue) {
                this.editInputValue = this.annotation.bodyValue;
            }
        }
    };

    /* Bind deleteAnnotation to delete button. */
    deleteButtonOnClick = (e: any) => {
        e.stopPropagation();
        this.deleteAnnotation(this.annotation.id);
    };

    listItemOnClick = () => {
        this.annotationManager.selectAnnotation(this.annotation.id)
            .then(() => {})
            .catch((error: any) => {
                console.log(error);
            });
    }

    /* Edit an existing annotation using Annotation API */
    editAnnotation = (annotation: any) => {
        annotation.bodyValue = this.editInputValue;
        this.annotationManager.updateAnnotation(annotation)
            .then(() => {
                console.log('Annotation updated successfully.');
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    /* Delete an existing annotation from Annotation API */
    deleteAnnotation = (annotationId: string) => {
        const filter = {
            annotationIds: [annotationId]
        };
        this.annotationManager.deleteAnnotations(filter)
            .then(() => {
                console.log('Annotation deleted successfully.');
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    ngAfterViewInit() {
        /* Set default input value */
        this.editInputValue = this.annotation.bodyValue;
    }
}
