/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullWindowComponent } from './samples/embed-modes/full-window/full-window.component';
import { SizedContainerComponent } from './samples/embed-modes/sized-container/sized-container.component';
import { InLineComponent } from './samples/embed-modes/in-line/in-line.component';
import { LightboxComponent } from './samples/embed-modes/lightbox/lightbox.component';
import { PDFAnnotationToolsComponent } from './samples/pdf-annotation-tools/pdf-annotation-tools.component';
import { ViewerCustomizationComponent } from './samples/viewer-customization/viewer-customization.component';
import { CaptureViewSDKEventsComponent } from './samples/capture-view-sdk-events/capture-view-sdk-events.component';
import { LocalPDFFilePreviewComponent } from './samples/local-pdf-file-preview/local-pdf-file-preview.component';
import { CRUDAPIsComponent } from './samples/pdf-annotation-apis/crud-apis/crud-apis.component';
import { CaptureEventsComponent } from './samples/pdf-annotation-apis/capture-events/capture-events.component';
import { HandlingAnnotationsInPDFComponent } from './samples/pdf-annotation-apis/handling-in-pdf/handling-in-pdf.component';
import { UIConfigurationsComponent } from './samples/pdf-annotation-apis/ui-configurations/ui-configurations.component';
import { CustomRHPComponent } from './samples/pdf-annotation-apis/ui-configurations/custom-rhp/custom-rhp.component';
import { ListItemComponent } from './samples/pdf-annotation-apis/ui-configurations/custom-rhp/list-item/list-item.component';

@NgModule({
    declarations: [
        AppComponent,
        FullWindowComponent,
        SizedContainerComponent,
        InLineComponent,
        LightboxComponent,
        PDFAnnotationToolsComponent,
        ViewerCustomizationComponent,
        CaptureViewSDKEventsComponent,
        LocalPDFFilePreviewComponent,
        CRUDAPIsComponent,
        CaptureEventsComponent,
        HandlingAnnotationsInPDFComponent,
        UIConfigurationsComponent,
        CustomRHPComponent,
        ListItemComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
