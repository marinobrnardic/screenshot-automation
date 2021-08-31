const websiteName = process.env.npm_config_COMPANY_WEBSITE_NAME;
const sitemapURL = "https://www." + websiteName + "/sitemap.xml";
const dirFilestage = "./snapshots/" + websiteName + "/filestage";
const edParam = "?ed=1";
const cookieBotParam = "&showCookieDisclaimer=";
const tabsParam = "&panel=1&tab=";
const flexAccordionParam = "&flexibleAccordion=all";

module.exports = {
  websiteName,
  sitemapURL,
  dirFilestage,
  edParam,
  cookieBotParam,
  tabsParam,
  flexAccordionParam,
};
