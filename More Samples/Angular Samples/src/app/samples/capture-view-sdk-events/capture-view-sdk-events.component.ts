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
import { ViewSDKClient } from '../view-sdk.service';

@Component({
    templateUrl: './capture-view-sdk-events.component.html'
})
export class CaptureViewSDKEventsComponent implements AfterViewInit {
    constructor(private viewSDKClient: ViewSDKClient) { }

    ngAfterViewInit() {
        this.viewSDKClient.ready().then(() => {
            /* Invoke file preview */
            this.viewSDKClient.previewFile('pdf-div', {});
            /* Register the callback to receive the events */
            this.viewSDKClient.registerEventsHandler();
        });
    }
}
