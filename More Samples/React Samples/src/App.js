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
import { BrowserRouter as Router, Route } from "react-router-dom";
import FullWindow from "./samples/Embed Modes/FullWindow";
import PDFAnnotationTools from "./samples/PDFAnnotationTools";
import SizedContainer from "./samples/Embed Modes/SizedContainer";
import InLine from "./samples/Embed Modes/InLine";
import Lightbox from "./samples/Embed Modes/Lightbox";
import ViewerCustomization from "./samples/ViewerCustomization";
import CaptureViewSDKEvents from "./samples/CaptureViewSDKEvents";
import LocalPDFFilePreview from "./samples/LocalPDFFilePreview";
import CaptureEvents from "./samples/PDF Annotation APIs/CaptureEvents";
import CRUDAPIs from "./samples/PDF Annotation APIs/CRUDAPIs";
import HandlingAnnotationsInPDF from "./samples/PDF Annotation APIs/HandlingAnnotationsInPDF";
import UIConfigurations from "./samples/PDF Annotation APIs/UIConfigurations/UIConfigurations";
import "./App.css";

export default class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Route exact path={["/", "/fullWindow"]} component={ FullWindow }/>
                    <Route path="/sizedContainer" component={ SizedContainer }/>
                    <Route path="/inLine" component={ InLine }/>
                    <Route path="/lightbox" component={ Lightbox }/>
                    <Route path="/pdfAnnotationTools" component={ PDFAnnotationTools }/>
                    <Route path="/viewerCustomization" component={ ViewerCustomization }/>
                    <Route path="/captureEvents" component={ CaptureViewSDKEvents }/>
                    <Route path="/localPDFFilePreview" component={ LocalPDFFilePreview }/>
                    <Route exact path="/annotationAPIs" component={ CRUDAPIs }/>
                    <Route path="/annotationAPIs/captureEvents" component={ CaptureEvents }/>
                    <Route path="/annotationAPIs/handlingInPDF" component={ HandlingAnnotationsInPDF }/>
                    <Route path="/annotationAPIs/UIConfigurations" component={ UIConfigurations }/>
                </Router>
            </React.Fragment>
        );
    }
}
