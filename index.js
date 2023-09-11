
import BrowserObject from './workPupp/browser.js'
import scraperController from './workPupp/pageController.js'

let browserInstance = await BrowserObject.startBrowser();

scraperController(browserInstance)
