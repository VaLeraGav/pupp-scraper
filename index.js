import BrowserObject from './workPupp/browser.js'
import scraperController from './workPupp/scraperController.js'
import wbProduct from './workPupp/scraperPages/wbProduct.js'
import wbCatalog from './workPupp/scraperPages/wbCatalog.js'

const scraperList = {
  'wbCatalog': wbCatalog,
  'wbProduct': wbProduct,
}

const url = {
  // 'wbCatalog': 'https://www.wildberries.ru/webapi/menu/main-menu-ru-ru.json',
  'wbCatalog': 'https://static-basket-01.wb.ru/vol0/data/main-menu-ru-ru-v2.json',
  'wbProduct': 'https://www.wildberries.ru/catalog/dom/mebel/torgovaya-mebel',
}

const nameScrapper = process.env.NAME_SCRAPER

async function start(nameScrapper) {
  let browserInstance = await BrowserObject.startBrowser();
  scraperController(browserInstance, scraperList[nameScrapper], url[nameScrapper])
}

start(nameScrapper)
