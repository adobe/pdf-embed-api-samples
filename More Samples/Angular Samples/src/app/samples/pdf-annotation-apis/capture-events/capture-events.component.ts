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
    templateUrl: './capture-events.component.html',
})
export class CaptureEventsComponent implements AfterViewInit {
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

                    /* API to register events listener */
                    annotationManager.registerEventListener(
                        (event: any) => {
                            console.log(event);
                        },
                        {
                            /* Pass the list of events in listenOn. */
                            /* If no event is passed in listenOn, then all the annotation events will be received. */
                            listenOn: [
                                /* 'ANNOTATION_ADDED', 'ANNOTATION_CLICKED' */
                            ]
                        }
                    );
                });
            });
        });
    }
}
