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

class HandlingAnnotationsInPDF extends Component {
    viewerConfig = {
        /* Enable commenting APIs */
        enableAnnotationAPIs: true,  /* Default value is false */
        /* Include existing PDF annotations and save new annotations to PDF buffer */
        includePDFAnnotations: true  /* Default value is false */
    };

    componentDidMount() {
        const viewSDKClient = new ViewSDKClient();
        viewSDKClient.ready().then(() => {
            /* Invoke the file preview and get the Promise object */
            this.previewFilePromise = viewSDKClient.previewFile("pdf-div", this.viewerConfig);
            /* Use the annotation manager interface to invoke the commenting APIs */ 
            this.previewFilePromise.then(adobeViewer => {
                adobeViewer.getAnnotationManager().then(annotationManager => {
                    /* API to add annotations to PDF and return the updated PDF buffer */
                    /* These APIs will work only when includePDFAnnotations is set to true in viewerConfig */
                    annotationManager.addAnnotationsInPDF(annotations)
                        .then(result => {
                            console.log("Annotations added to PDF successfully and updated PDF buffer returned.", result);
                        })
                        .catch(error => {
                            console.log(error);
                        });
        
                    /* API to remove annotations from PDF and return the updated PDF buffer along with the list of annotations */
                    setTimeout(() => {
                        annotationManager.removeAnnotationsFromPDF()
                        .then(result => {
                            console.log("Annotations removed from PDF successfully and updated PDF buffer and annotation list returned.", result);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    }, 3000);
                });
            });
        });
    }

    render() {
        return <div id="pdf-div" className="full-window-div"/>;
    }
}

export default HandlingAnnotationsInPDF;
