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
import ViewSDKClient from "../../ViewSDKClient";
import CustomRHP from "./CustomRHP";
import "./CustomUI.css";

class UIConfigurations extends Component {
    constructor() {
        super();
        this.state = {
            annotationManager: undefined
        };
    }

    viewerConfig = {
        /* Enable commenting APIs */
        enableAnnotationAPIs: true,  /* Default value is false */
    };

    setAnnotationManager = annotManager => {
        this.setState({
            annotationManager: annotManager
        });
    }

    componentDidMount() {
        const viewSDKClient = new ViewSDKClient();
        viewSDKClient.ready().then(() => {
            /* Invoke the file preview and get the Promise object */
            this.previewFilePromise = viewSDKClient.previewFile("pdf-div", this.viewerConfig);
            /* Use the annotation manager interface to invoke the commenting APIs */ 
            this.previewFilePromise.then(adobeViewer => {
                adobeViewer.getAnnotationManager().then(annotManager => {
                    this.setAnnotationManager(annotManager);
                    /* Set UI configurations */
                    const customFlags = {
                        /* showToolbar: false,   /* Default value is true */
                        showCommentsPanel: false,  /* Default value is true */
                        downloadWithAnnotations: true,  /* Default value is false */
                        printWithAnnotations: true,  /* Default value is false */
                    };
                    this.state.annotationManager.setConfig(customFlags);
                });
            });
        });
    }

    render() {
        return (
            <div className="container">
                <div id="pdf-div" className="pdf-view" />
                {
                    this.state.annotationManager &&
                    <CustomRHP
                        annotationManager={ this.state.annotationManager }
                    />
                }
            </div>
        );
    }
}

export default UIConfigurations;
