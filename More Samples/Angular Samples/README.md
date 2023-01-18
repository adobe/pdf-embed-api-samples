# Angular Sample

This is an Angular sample application, demonstrating how to use Adobe Acrobat Services PDF Embed API with Angular. To try it out, clone this folder on your computer and run the following commands:

```
    > npm install
    > npm start
```

The app will be available at ```http://localhost:4200```

Below are the endpoints exposed from the application to show different use cases of PDF embed API.

For detailed description about each of the samples, see [README](../../README.md).

| Sample | Endpoint |
|---|---|
|Full Window Embed Mode  | ```http://localhost:4200/fullWindow``` |
|Sized Container Embed Mode  | ```http://localhost:4200/sizedContainer``` |
|In-Line Embed Mode  | ```http://localhost:4200/inLine``` |
|Lightbox Embed Mode  | ```http://localhost:4200/lightbox``` |
|PDF Preview with Annotation Tools  | ```http://localhost:4200/pdfAnnotationTools``` |
|Viewer Customization  | ```http://localhost:4200/viewerCustomization``` |
|Local PDF File Preview | ```http://localhost:4200/localPDFFilePreview``` |
|PDF Preview with Events  | ```http://localhost:4200/captureEvents``` |


Following endpoints showcase the different PDF Annotation APIs and their use cases.

For detailed description about the annotation APIs samples, see [Annotation APIs README](../PDF%20Annotations%20APIs/README.md).

| Annotation API Sample | Endpoint |
|---|---|
|CRUD APIs  | ```http://localhost:4200/annotationAPIs``` |
|Handling of Annotations in PDF  | ```http://localhost:4200/annotationAPIs/handlingInPDF``` |
|Capture Events | ```http://localhost:4200/annotationAPIs/captureEvents``` |
|UI Configurations  | ```http://localhost:4200/annotationAPIs/UIConfigurations``` |


**Note**: Node version >=10.13.0 is required to run this sample.
