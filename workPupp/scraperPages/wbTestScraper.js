import * as fs from 'fs';
import userAgent from 'user-agents'
import logger from '../../logger.js'

// export default {
//   async scraper(browser) {
//     async function getPathProduct() {
//       let url =
//         'https://www.wildberries.ru/catalog/dom/spalnya/dekoratsii-nastennye';
//       console.log(url);
//       const part = 'products/' + url.match(/catalog\/(.+?)$/)[1];
//       fs.mkdirSync(part, { recursive: true });
//       return part;
//     }

//     // for (i = 1 i < 11 i++) {
//     //     let id = String(i).padStart(2, '0')
//     const basketUrl = 'https://basket-10.wb.ru/vol1488/part148841/148841291/info/ru/card.json';

//     let page = await browser.newPage();
//     const request = await page.goto(basketUrl);

//     await page.setRequestInterception(true);

//     if (request.status() === 200) {
//       const product = await page.evaluate(async () => {
//         return JSON.parse(document.querySelector("body").innerText);
//       });

//       let data = {};
//       data[product.nm_id] = {
//         url: "",
//         name: product.imt_name,
//         subj_name: product.subj_name,
//         subj_root_name: product.subj_root_name,
//         description: product.description,
//         options: product.options,
//       };
//       const path = await getPathProduct();
//       const ran =
//         Math.random().toString(36).substring(2, 15) +
//         Math.random().toString(23).substring(2, 5);

//       fs.writeFile(
//         `${path}/wb-${ran}.json`,
//         JSON.stringify(data),
//         'utf8',
//         function (err) {
//           if (err) {
//             return console.log(err);
//           }
//         }
//       );
//       // break
//     }
//     console.log(basketUrl);
//     await page.close();
//     // }
//   },
// };
