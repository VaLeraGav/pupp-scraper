import puppeteer from 'puppeteer'
import logger from './logger.js'

export default {

  proxy: {
    ip: '95.216.156.131',
    port: '8080',
    getString: function () {
      return `${this.ip}:${this.port}`;
    },
  },

  async startBrowser() {
    let browser;
    try {
      console.log('Opening the browser......');
      browser = await puppeteer.launch({
        // executablePath: '/usr/bin/chromium-browser',
        headless: false, // будет запускаться с интерфейсом
        args: ['--disable-setuid-sandbox', '--no-sandbox', '--disable-gpu'],
        ignoreHTTPSErrors: true,
        // позволяет вам посещать веб-сайты, доступ к которым осуществляется
        // не через защищенный протокол HTTPS, и игнорировать любые ошибки HTTPS.

        // args: ['--start-maximized']
        // args: [--proxy-server=${proxy.getString()}]
      });
    } catch (err) {
      logger.error({ err }, 'Could not Create a browser instance ');
      console.log('Could not Create a browser instance => : ', err);
    }
    return browser;
  }
}
