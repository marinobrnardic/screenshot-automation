//https://docs.google.com/document/d/1_31GiKkFHJYHWU9YFDpW5LWbaMzBp9dFAB3XRzPkNP0/edit?usp=sharing

fs = require('fs');
path = require('path');
const { dirFilestage, websiteName, edParam, cookieBotParam, tabsParam, flexAccordionParam } = require('./website-config.js');
const { sitemapUrls } = require('./extract-urls.js');
const { getToken } = require('./get-token.js');
const puppeteer = require('puppeteer');
require('dotenv').config();

getToken().then(res => {
  process.env.BEARER_TOKEN = res.data.access_token;
  
  //Create a folder for snapshots
  fs.mkdir(dirFilestage, { recursive: true }, (err) => {
    if (err) {
        throw err;
    }
    console.log("Filestage directory created.");
  });

  takeLocalScreenshots();

});

takeLocalScreenshots = async () => {

  const browser = await puppeteer.launch({}); 
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
  });

  //Take desktop screenshots
  await page.setViewport({ width: 1920, height: 1080 });
  console.log("Started taking desktop screenshots.");
  for(let i=0; i < sitemapUrls.length; i++){

    await page.goto(sitemapUrls[i] + edParam + tabsParam + 1 + flexAccordionParam + cookieBotParam + 0, {"waitUntil" : "networkidle0"});

    //CookieBot notice
    if(i == 0) {

      await page.goto(sitemapUrls[i] + edParam + tabsParam + 1 + flexAccordionParam + cookieBotParam + 1, {"waitUntil" : "networkidle0"});
      await page.screenshot({ path: dirFilestage + '/' + websiteName + '-' + (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.' + (0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.jpg' , fullPage: true });
      console.log('Screenshot '+ websiteName + '-' + (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.' + (0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.jpg ' + 'taken.');

      const elements = await page.$x('//*[@id="c-right"]/a');
      await elements[0].click();

      await page.screenshot({ path: dirFilestage + '/' + websiteName + '-' + (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.' + (1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.jpg' , fullPage: true });
      console.log('Screenshot '+ websiteName + '-' + (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.' + (1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.jpg ' + 'taken.');

    }
    //Tabs
    else if ((await page.$('.tab-container')) !== null) {

      for (j = 1; j<=2; j++) {

        await page.goto(sitemapUrls[i] + edParam + tabsParam + j + flexAccordionParam + cookieBotParam + 0, {"waitUntil" : "networkidle0"});
        await page.screenshot({ path: dirFilestage + '/' + websiteName + '-' + (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.' + (j).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.jpg' , fullPage: true });
        console.log('Screenshot ' + websiteName + '-' + (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.' + (j).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.jpg ' + 'taken.');

      }

    } 
    //Accordions
    else {

      await page.screenshot({ path: dirFilestage + '/' + websiteName + '-' + (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.00' + '.jpg' , fullPage: true });
      console.log('Screenshot ' + websiteName + '-' + (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.00' + '.jpg ' + 'taken.');

    }
  }

  console.log("Finished taking desktop screenshots.");

  //Take mobile screenshots
  await page.setViewport({ width: 375, height: 1080 });
  console.log("Started taking mobile screenshots.");

  for(let i=0; i < sitemapUrls.length; i++){

    await page.goto(sitemapUrls[i] + edParam + tabsParam + 1 + flexAccordionParam + cookieBotParam + 0, {"waitUntil" : "networkidle0"});

    //CookieBot notice
    if(i == 0) {

      await page.goto(sitemapUrls[i] + edParam + tabsParam + 1 + flexAccordionParam + cookieBotParam + 1, {"waitUntil" : "networkidle0"});
      await page.screenshot({ path: dirFilestage + '/' + 'm-' + websiteName + '-' + (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.' + (0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.jpg' , fullPage: true });
      console.log('Screenshot '+ 'm-' + websiteName + '-' + (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.' + (0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.jpg ' + 'taken.');

      const elements = await page.$x('//*[@id="c-right"]/a');
      await elements[0].click();

      await page.screenshot({ path: dirFilestage + '/' + 'm-' + websiteName + '-' + (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.' + (1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.jpg' , fullPage: true });
      console.log('Screenshot '+ 'm-' + websiteName + '-' + (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.' + (1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.jpg ' + 'taken.');

    }
    //Tabs
    else if ((await page.$('.tab-container')) !== null) {

      for (j = 1; j<=2; j++) {

        await page.goto(sitemapUrls[i] + edParam + tabsParam + j + flexAccordionParam + cookieBotParam + 0, {"waitUntil" : "networkidle0"});
        await page.screenshot({ path: dirFilestage + '/' + 'm-' + websiteName + '-' + (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.' + (j).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.jpg' , fullPage: true });
        console.log('Screenshot ' + 'm-' +websiteName + '-' + (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.' + (j).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.jpg ' + 'taken.');

      }

    } 
    //Accordions
    else {

      await page.screenshot({ path: dirFilestage + '/' + 'm-' + websiteName + '-' + (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.00' + '.jpg' , fullPage: true });
      console.log('Screenshot ' + 'm-' + websiteName + '-' + (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.00' + '.jpg ' + 'taken.');

    }
  }

  console.log("Finished taking mobile screenshots.");
    
  await browser.close();

}


