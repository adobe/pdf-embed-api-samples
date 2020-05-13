/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

import React, { Component } from "react";
import ViewSDKClient from "./ViewSDKClient";

class ViewerCustomization extends Component {
    /* Control the viewer customization.
    * It lists down all supported variables with default values.
    **/
    viewerConfig = {
        /* If true, tools such as sticky note, highlight, and so on appear in the upper toolbar. */
        showAnnotationTools: true,

        /* If true, form filling is enabled and users can edit fields. */
        enableFormFilling: true,

        /* If true, the left-hand pane in file preview displays. The pane allows user to toggle thumbnails on and off. */
        showLeftHandPanel: true,

        /* If true, a download button appears in the overflow menu on the top bar. */
        showDownloadPDF: true,

        /* If true, then a print PDF option appears in the overflow menu on the top bar. */
        showPrintPDF: true,

        /* If true, the page control toolbar displays. */
        showPageControls: true,

        /* 	If true, the page control toolbar is locked to the bottom bar and expands to the page width.
        End users can still dock/undock via the dock button on the page control toolbar. */
        dockPageControls: true,

        /* Allowed possible values are "FIT_PAGE", "FIT_WIDTH" or "".
        FIT_WIDTH expands the page horizontally to the full width of the document pane; with this setting,
        the full page is unlikely to display on a single screen. Scrolling may be required.
        FIT_PAGE displays the entire page in the current view pane so that no scrolling is required.
        Note that end users can toggle the mode via the Fit Width button on the page controls bar (if present). */
        defaultViewMode: "",
    };

    componentDidMount() {
        const viewSDKClient = new ViewSDKClient();
        viewSDKClient.ready().then(() => {
            /* Invoke file preview */
            viewSDKClient.previewFile("pdf-div", this.viewerConfig);
        });
    }

    render() {
        return <div id="pdf-div" className="full-window-div"/>;
    }
}

export default ViewerCustomization;
