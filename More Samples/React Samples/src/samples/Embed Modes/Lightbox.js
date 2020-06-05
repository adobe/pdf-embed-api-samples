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
import ViewSDKClient from "../ViewSDKClient";

class Lightbox extends Component {
    constructor() {
        super();
        this.viewSDKClient = new ViewSDKClient();
    }

    previewFile = () => {
        this.viewSDKClient.ready().then(() => {
            /* Invoke file preview */
            this.viewSDKClient.previewFile("", {
                /* Pass the embed mode option here */
                embedMode: "LIGHT_BOX"
            });
        });
    }

    render() {
        return (
            <div id="container" className="light-box-container">
                <button onClick={ this.previewFile } className="lb-view-file-btn">
                    View PDF
                </button>
            </div>
        );
    }
}

export default Lightbox;
