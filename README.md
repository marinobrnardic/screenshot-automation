#Getting Started

To run this tool locally you need to install Node.js. Once done, all dependencies will be installed by using package.json

##Prerequisites

Install [Node.js](https://nodejs.org/en/download/)

Install npm:
`npm install npm`

Install dependencies:
`npm install`

Create .env file in the root folder and place the following environment vars in it:

`AZURE_AD_ID
ENV_USERNAME
ENV_PASSWORD
CLIENT_ID
RESOURCE
REDIRECT_URI
CLIENT_SECRET
BEARER_TOKEN
STORAGE_CONNECTION_STRING
FILESTAGE_BEARER_TOKEN
npm_config_COMPANY_WEBSITE_NAME`

##Running the tool
To run the tool, run the following command in the terminal (replace <nameofthewebsite> with the website you want to take screenshots of, for example github.com):

`npm run waldo --CORIA_WEBSITE_NAME=<nameofthewebsite>`
`Example: npm run waldo --CORIA_WEBSITE_NAME=github.com`

##Overview
The tool consists of multiple JavaScript files which run sequentially in the following order:

1.	download-sitemap.js
2.	extract-urls.js
3.	snapshots-to-pdf.js
4.	pdf-to-azure.js
5.	azure-to-filestage.js

In addition to those five scripts, there are also two other JavaScript files: get-token.js and website-config.js. As its name implies, get-token is used to get the Bearer token from Azure DevOps, and website-config simply stores information such as website name, the path to our local snapshot directory and URL parameters that are used to trigger specific webpage states, such as toggling the Cookiebot dialog, etc.

When you run the above mentioned command the tool will go to the URL that you specified in the parameter and download the sitemap.xml file. It will then extract all the urls from that file and start taking screenshots. The screenshots are stored in /snapshots/<nameofthewebsite> folder. Once all the screenshots are taken, the tool will generate a pdf and upload it to snapshots-pdf-container (an Azure DevOps blob storage container). The pdf will be taken from that blob storage container and uploaded to the corresponding project within Filestage.
