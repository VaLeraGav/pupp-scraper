import logger from '../logger.js'

export default async function scraperController(browserInstance, nameScraper, url) {
  let browser;
  try {
    browser = await browserInstance;
    await nameScraper.scraper(browser, url);
    await browser.close();

  } catch (err) {

    logger.error({ err }, 'Could not Resolve the browser instance');
    console.log('Could not Resolve the browser instance => ', err);

    await browser.close();
  }
}
