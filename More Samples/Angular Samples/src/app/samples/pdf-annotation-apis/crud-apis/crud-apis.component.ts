/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

import { Component, AfterViewInit } from '@angular/core';
import { ViewSDKClient } from '../../view-sdk.service';
import { annotations } from '../sample-annotation-list';

@Component({
    templateUrl: './crud-apis.component.html',
})
export class CRUDAPIsComponent implements AfterViewInit {
    previewFilePromise: any;

    viewerConfig = {
        /* Enable commenting APIs */
        enableAnnotationAPIs: true,  /* Default value is false */
    };

    constructor(private viewSDKClient: ViewSDKClient) { }

    ngAfterViewInit() {
        this.viewSDKClient.ready().then(() => {
            /* Invoke the file preview and get the Promise object */
            this.previewFilePromise = this.viewSDKClient.previewFile('pdf-div', this.viewerConfig);
            /* Use the annotation manager interface to invoke the commenting APIs */
            this.previewFilePromise.then((adobeViewer: any) => {
                adobeViewer.getAnnotationManager().then((annotationManager: any) => {
                    /* API to add annotations */
                    annotationManager.addAnnotations(annotations)
                        .then(() => {
                            console.log('Annotations added through API successfully');
                        })
                        .catch((error: any) => {
                            console.log(error);
                        });

                    /* API to get all annotations */
                    annotationManager.getAnnotations()
                        .then((result: any) => {
                            console.log('GET all annotations', result);
                        })
                        .catch((error: any) => {
                            console.log(error);
                        });

                    /* API to delete annotations based on annotation ID filter */
                    let filter: any;
                    filter = {
                        annotationIds: ["3adeae16-a868-4653-960e-613c048dddc5", "079d66a4-5ec2-4703-ae9d-30ccbb1aa84c"]
                    };
                    annotationManager.deleteAnnotations(filter)
                        .then(() => {
                            console.log('Deleted annotations based on annotation ID filter.');
                        })
                        .catch((error: any) => {
                            console.log(error);
                        });

                    /* API to delete annotations based on page range filter */
                    filter = {
                        pageRange: {
                            startPage: 4,
                            endPage: 6
                        }
                    };
                    annotationManager.deleteAnnotations(filter)
                        .then(() => {
                            console.log('Deleted annotations based on page range filter');
                        })
                        .catch((error: any) => {
                            console.log(error);
                        });

                    /* API to get annotations after deletion */
                    annotationManager.getAnnotations()
                        .then((result: any) => {
                            console.log('GET annotations result after deleting annotations', result);
                        })
                        .catch((error: any) => {
                            console.log(error);
                        });

                    /* API to update a single annotation */
                    const newComment = 'Preserving your legacy with Bodea life insurance plans.';
                    setTimeout(() => {
                        annotations[3].bodyValue = newComment;
                        const updatedAnnotation = annotations[3];
                        annotationManager.updateAnnotation(updatedAnnotation)
                            .then(() => {
                                console.log('Annotation updated through API successfully');
                            })
                            .catch((error: any) => {
                                console.log(error);
                            });
                    }, 3000);
                });
            });
        });
    }
}
