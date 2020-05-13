/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

import React, { Component } from 'react';
import ViewSDKClient from '../ViewSDKClient';
import { annotations } from './Sample Annotation List/annotationList';

class CaptureEvents extends Component {
    viewerConfig = {
        /* Enable commenting APIs */
        enableAnnotationAPIs: true,  /* Default value is false */
    };

    componentDidMount() {
        const viewSDKClient = new ViewSDKClient();
        viewSDKClient.ready().then(() => {
            /* Invoke the file preview and get the Promise object */
            this.previewFilePromise = viewSDKClient.previewFile("pdf-div", this.viewerConfig);
            /* Use the annotation manager interface to invoke the commenting APIs */
            this.previewFilePromise.then(adobeViewer => {
                adobeViewer.getAnnotationManager().then(annotationManager => {
                    /* API to add annotations */
                    annotationManager.addAnnotations(annotations)
                        .then(() => {
                            console.log("Annotations added through API successfully");
                        })
                        .catch(error => {
                            console.log(error);
                        });
        
                    /* API to register events listener */
                    annotationManager.registerEventListener(
                        event => {
                            console.log(event);
                        },
                        {
                            /* Pass the list of events in listenOn. */
                            /* If no event is passed in listenOn, then all the annotation events will be received. */
                            listenOn: [
                                /* "ANNOTATION_ADDED", "ANNOTATION_CLICKED" */
                            ]
                        }
                    );
                });
            });
        });
    }

    render() {
        return <div id="pdf-div" className="full-window-div"/>;
    }
}

export default CaptureEvents;
