
import BrowserObject from './src/browser.js'
import scraperController from './src/pageController.js'

let browserInstance = await BrowserObject.startBrowser();

scraperController(browserInstance)
