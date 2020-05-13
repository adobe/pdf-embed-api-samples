/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ViewSDKClient } from '../../view-sdk.service';

@Component({
    templateUrl: './ui-configurations.component.html',
    styleUrls: ['./ui-configurations.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UIConfigurationsComponent implements AfterViewInit {
    previewFilePromise: any;
    annotationManager: any;

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
                adobeViewer.getAnnotationManager().then((annotManager: any) => {
                    this.annotationManager = annotManager;
                    /* Set UI configurations */
                    const customFlags = {
                        /* showToolbar: false,   /* Default value is true */
                        showCommentsPanel: false,  /* Default value is true */
                        downloadWithAnnotations: true,  /* Default value is false */
                        printWithAnnotations: true,  /* Default value is false */
                    };
                    this.annotationManager.setConfig(customFlags);
                });
            });
        });
    }
}
