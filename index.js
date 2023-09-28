import BrowserObject from './workPupp/browser.js'
import scraperController from './workPupp/scraperController.js'
import wbProduct from './workPupp/scraperPages/wbProduct.js'
import wbCatalog from './workPupp/scraperPages/wbCatalog.js'

const scraperList = {
  'wbCatalog': wbCatalog,
  'wbProduct': wbProduct,
}

const nameScrapper = process.env.NAME_SCRAPER

async function start(nameScrapper) {
  let browserInstance = await BrowserObject.startBrowser();
  scraperController(browserInstance, scraperList[nameScrapper])
}

start(nameScrapper)
