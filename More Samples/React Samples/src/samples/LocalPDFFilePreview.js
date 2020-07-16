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

class LocalPDFFilePreview extends Component {
    constructor() {
        super();
        this.viewSDKClient = new ViewSDKClient();
    }

    /* Helper function to check if selected file is PDF or not. */
    isValidPDF = file => {
        if (file.type === "application/pdf") {
            return true;
        }
        if (file.type === "" && file.name) {
            const fileName = file.name;
            const lastDotIndex = fileName.lastIndexOf(".");
            if (lastDotIndex === -1 || fileName.substr(lastDotIndex).toUpperCase() !== "PDF") return false;
            return true;
        }
        return false;
    };

    /* Helper function to be executed on file upload
    * for creating Promise which resolve to ArrayBuffer of file data.
    **/
    onFileUpload = event => {
        event.persist();
        this.viewSDKClient.ready().then(() => {
            const files = event.target.files;
            if (files.length > 0 && this.isValidPDF(files[0])) {
                const fileName = files[0].name;
                const reader = new FileReader();
                reader.onloadend = e => {
                    const filePromise = Promise.resolve(e.target.result);
                    /* Helper function to render the file using PDF Embed API. */
                    this.viewSDKClient.previewFileUsingFilePromise("pdf-div", filePromise, fileName);
                };
                reader.readAsArrayBuffer(files[0]);
            }
        });
    }

    render() {
        return (
            <div id="pdf-div" className="full-window-div">
                <div style={ { margin: "50px" } }>
                    <label htmlFor="file-picker" className="file-picker">Choose PDF File</label>
                    {/* Listen for file upload */}
                    <input onChange={ this.onFileUpload } type="file" id="file-picker" name="file-picker"
                        accept="application/pdf" className="file-input"/>
                </div>
            </div>
        );
    }
}

export default LocalPDFFilePreview;
