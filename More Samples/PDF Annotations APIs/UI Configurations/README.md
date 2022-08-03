# Annotation APIs with UI Configurations Sample

This sample demonstrates how the annotation APIs can be used to apply UI configurations and perform other operations on any annotation. 

The right-hand comments pane has been hidden and a custom comments pane has been created. The annotation tools are also disabled and custom annotation tools have been created in the comments pane.
Click on any annotation tool and it gets selected using the start annotation mode API. New annotations can be added to the PDF using these tools.
The annotation added event is received and the event data is used to fetch the comment text and display it in the custom pane.
There are options to edit and delete the annotation which use the update and delete annotation APIs to perform the operation.
Click on any annotation in the custom pane and it gets selected using the select annotation API.

To see it in action, copy the files in the folder to your computer, and open index.html in a supported browser.

## Documentation

For detailed documentation, please check https://www.adobe.com/go/dcviewsdk_docs.
