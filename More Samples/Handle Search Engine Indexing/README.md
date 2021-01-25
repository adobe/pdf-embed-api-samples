# Handle Search Engine Indexing

PDFs displayed using PDF Embed API are not indexed and won't appear in search engine results by default, as PDF Embed API doesn't keep direct reference of the PDF URL in the DOM. In order to get the PDF indexed and appear in search engine results, the URL of the PDF must be available in the website DOM.
We suggest an approach which will enable the indexing of PDF files displayed using PDF Embed API. The link of the PDF file should already be available in the website to enable indexing. As per the approach, website developers can trap the click of this link and open the PDF using PDF Embed API.

The code samples demonstrate few of the ways to implement this approach.

### Auto-click PDF Link

Auto-click on the PDF link when the website is completely loaded and open the PDF in the desired embed mode. In this sample, the PDF is displayed in sized container embed mode.
To see it in action, open ```Auto-click PDF Link/index.html``` in a supported browser.

### Full Window

Click on the PDF link to display the PDFs in a separate webpage in full window embed mode by passing the PDF reference.
To see it in action, open ```Full Window/index.html``` in a supported browser.

### In Line PDF

Click on the PDF link to open the PDF in line within the context of the webpage. 
To see it in action, open ```In Line PDF/index.html``` in a supported browser.

### Lightbox Embed Mode

Click on the PDF link to open the PDF on top of the webpage using the lightbox embed mode provided by PDF Embed API. 
To see it in action, open ```Lightbox Embed Mode/index.html``` in a supported browser.

## Documentation

For detailed documentation, please check https://www.adobe.com/go/dcviewsdk_docs.