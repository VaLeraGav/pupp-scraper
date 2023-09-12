import pageScraper from './pageScraper.js'
import logger from './logger.js'
import wbScraper from './scraperPages/wbScraper.js'
import wbCatalog from './scraperPages/wbCatalog.js'

export default async function scrapeAll(browserInstance) {
  let browser;
  try {
    browser = await browserInstance;
    await wbCatalog.scraper(browser);
    await browser.close();

  } catch (err) {

    logger.error({ err }, 'Could not Resolve the browser instance');
    console.log('Could not Resolve the browser instance => ', err);

    await browser.close();
  }
}
