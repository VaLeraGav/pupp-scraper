import * as fs from 'fs';
import { createDir, rootDir } from '../../helper.js'

export default {

  // url: 'https://www.wildberries.ru/webapi/menu/main-menu-ru-ru.json',
  url: 'https://static-basket-01.wb.ru/vol0/data/main-menu-ru-ru-v2.json',


  tmpDir: `${rootDir}/tmp`,

  async scraper(browser) {

    await createDir(this.tmpDir)

    let page = await browser.newPage();
    const request = await page.goto(this.url);
    await page.setRequestInterception(true);
    if (request.status() === 200) {
      const product = await page.evaluate(() => {
        return JSON.parse(document.querySelector("body").textContent);
      });
      await this.searchJsonValid(product)
    }
    await page.close();
  },

  findValuesHelper(obj, key, list) {

    if (!obj) return list;
    if (obj instanceof Array) {
      for (var i in obj) {
        list = list.concat(this.findValuesHelper(obj[i], key, []));
      }
      return list;
    }

    if (obj[key] && obj['url'].substr(0, 8) === '/catalog') {
      list.push({
        id: obj['id'],
        parent: obj['parent'],
        url: obj['url'],
        name: obj['name'],
        sheet: (obj['childs']) ? 0 : 1
      });
    }

    if (typeof obj === 'object') {
      var children = Object.keys(obj);
      if (children.length > 0) {
        for (i = 0; i < children.length; i++) {
          list = list.concat(this.findValuesHelper(obj[children[i]], key, []));
        }
      }
    }
    return list;
  },

  async searchJsonValid(product) {

    const dataCatalog = this.findValuesHelper(product, 'url', []);

    fs.promises.writeFile(`${this.tmpDir}/all-catalog.json`, JSON.stringify(product), function (err) {
      if (err) {
        return console.log(err);
      }
    });

    fs.promises.writeFile(`${this.tmpDir}/flat-catalog..json`, JSON.stringify(dataCatalog), function (err) {
      if (err) {
        return console.log(err);
      }
    });
  },
}
