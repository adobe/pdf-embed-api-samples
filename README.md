# Getting started with the Adobe Document Cloud View SDK

The Adobe Document Cloud View SDK lets you display PDF files in your website and leverage its power to benefit your users.

## Prerequisites

Before you can work with the SDK, you must register your application and get Client Id (API Key). [Request Access](https://www.adobe.com/go/dcsdks_credentials) to get your own Client Id.

## Supported Platforms

1. Windows - Chrome, Firefox, Edge, IE11+
2. Mac - Chrome, Firefox, Safari
3. Android - Chrome
4. iOS - Chrome, Safari

## Running the samples

The following sub-sections describe how to run the samples.

### PDF Preview

PDF Viewer fills the entire browser window to provide full immersive view for users to read and act on documents.
To see it in action, copy the files in the ```Full Window Embed Mode``` folder to your computer, and open index.html in a supported browser.

### Sized Container Embed Mode

PDF Viewer is embedded in the sized container in slideshow and landscape mode.
To see it in action, copy the files in the ```Sized Container Embed Mode``` folder to your computer, and open index.html in a supported browser.

### In-Line Embed Mode

PDF Viewer is embedded in line within the context of the app / web page.
To see it in action, copy the files in the ```In-Line Embed Mode``` folder to your computer, and open index.html in a supported browser.

### Local PDF file Preview

This sample demonstrates how to render a local PDF file using the SDK. It will ask you to pick a PDF file from your computer to start the PDF file rendering using the SDK.
To see it in action, copy the files in the ```More Samples/Work with Local File``` folder to your computer, and open index.html in a supported browser.

### PDF Preview with Annotation tools

PDF Viewer will render PDF file along with annotation tools enabled.
To see it in action, copy the files in the ```More Samples/PDF Annotations``` folder to your computer, and open index.html in a supported browser.

Note that by default if a user saves the PDF file after adding comments, the file is downloaded locally. This sample shows how to change that behavior, in this case taking no action except adding a small delay.

### PDF Preview with Annotation APIs

PDF Viewer will render PDF file along with annotation tools and APIs enabled.
These samples show how to use annotation APIs to add, import, export, update and delete annotations programmatically.
To see it in action, copy ```More Samples/PDF Annotations APIs``` folder to your computer, and try it out in a supported browser.

### PDF Preview with Events

This sample shows how to start receiving events from PDF Viewer.
To see it in action, copy the files in the ```More Samples/Capture View SDK Events``` folder to your computer, and open index.html in a supported browser.

## JavaScript Framework Samples

### React Samples

These samples demonstrate how to integrate the PDF viewer in a React application.
To see it in action, copy ```More Samples/React Samples``` folder to your computer, and follow the instructions in React Samples [README](More%20Samples/React%20Samples/README.md#adobe-document-cloud-view-sdk-react-sample).

### Angular Samples

These samples demonstrate how to integrate the PDF viewer in an Angular application.
To see it in action, copy ```More Samples/Angular Samples``` folder to your computer, and follow the instructions in Angular Samples [README](More%20Samples/Angular%20Samples/README.md#adobe-document-cloud-view-sdk-angular-sample).

## Documentation

For detailed documentation, please check https://www.adobe.com/go/dcviewsdk_docs.

## Licensing

This project is licensed under the MIT License. See [LICENSE](LICENSE.md) for more information.
