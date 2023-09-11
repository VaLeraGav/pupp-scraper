import * as fs from 'fs';
import { createDir } from '../helper.js'
import userAgent from 'user-agents'
import logger from '../logger.js'

export default {

  url: 'https://www.wildberries.ru/catalog/dom/mebel/torgovaya-mebel',

  // countPage: false, // включить бесконечный цикл
  countPage: false,

  productDir: '../../products',

  async scraper(browser) {

    await createDir(this.productDir)

    this.browser = browser
    let i = 1;

    if (!this.countPage) {
      while (!this.countPage) {
        await this.scraperPage(browser, i)
        i++
      }
    }

    while (i <= this.countPage) {
      await this.scraperPage(browser, i)
      i++
    }
  },

  async scraperPage(browser, i) {
    let page = await browser.newPage();
    await page.setUserAgent(userAgent.toString());

    let url = this.url + `?sort=popular&page=${i}`;

    await page.goto(url, { timeout: 3600 });

    await page.waitForSelector('.catalog-page');

    await this.scrapeCurrentPage(page);
  },

  async scrapeCurrentPage(page) {
    await this.checkProductsPage(page);

    const urls = await this.getHrefPageAll(page)
    await page.close();

    for (let link in urls) {
      await this.searchJsonValid(urls[link])
    }
  },

  async getHrefPageAll(page) {
    return await page.evaluate(async () => {
      const distance = 100;
      const delay = 100;
      while (
        document.scrollingElement.scrollTop + window.innerHeight <
        document.scrollingElement.scrollHeight
      ) {
        document.scrollingElement.scrollBy(0, distance);
        await new Promise((resolve) => {
          setTimeout(resolve, delay);
        });
      }

      let arr = [];
      document
        .querySelectorAll('.j-card-item > div > a')
        .forEach((element) => {
          arr.push(element.href);
        });
      return arr;
    })
  },

  async checkProductsPage(page) {
    if ((await page.$('.j-card-item')) === null) {
      logger.info({ url: this.url }, 'В категории закончились товары');
      console.log('Товары закончились');
      page.close();
      process.exit();
    }
  },

  async searchJsonValid(link) {
    const nm_id = link.match(/catalog\/(.+?)\//)[1];
    const vol = nm_id.slice(0, -5);
    const part = nm_id.slice(0, -3);

    for (let i = 1; i < 11; i++) {
      let id = String(i).padStart(2, "0");

      const mainUrl = `https://basket-${id}.wb.ru/vol${vol}/part${part}/${nm_id}`;
      const basketUrl = `${mainUrl}/info/ru/card.json`;
      const imageUrl = `${mainUrl}/images/big/1.jpg`;

      let page = await this.browser.newPage();
      const request = await page.goto(basketUrl);
      await page.setRequestInterception(true);

      if (request.status() === 200) {
        const product = await page.evaluate(async () => {
          return JSON.parse(document.querySelector('body').innerText);
        });

        let data = {};
        data[product.nm_id] = {
          url_img: imageUrl,
          name: product.imt_name,
          subj_name: product.subj_name,
          subj_root_name: product.subj_root_name,
          description: product.description,
          property: product.options,
        };

        const ran =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(23).substring(2, 5);

        await fs.promises.writeFile(
          `${this.productDir}/wb-${ran}.json`,
          JSON.stringify(data),
          'utf8',
          (err) => {
            if (err) {
              logger.error({ path: `products/wb-${ran}.json` }, 'write error');
            }
          }
        );

        await page.close();
        break;
      }
      await page.close();
    }
  },
}
