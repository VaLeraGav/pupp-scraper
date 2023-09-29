import Products from './models/products.js'
import Catalogs from './models/catalogs.js'
import { rootDir } from '../helper.js'
import * as fs from 'fs';
import sequelize from './sequelize.js'
import logger from '../logger.js'

// async function main() {
//   try {
//     const product = await Products.build({
//       name: 'Иван',
//     })
//     await product.save();

//   } catch (err) {
//     console.error(err);
//     return;
//   }
// }

//
try {
  await sequelize.sync({ force: true }) // true - удаляет существующую таблицу и создает новую
} catch (err) {
  console.error(err)
}

// for (let key in objCatalogList) {
//   let productBuild = Products.build({
//     name: objCatalogList[key].name,
//   });
// }
// await productBuild.save();
// await Products.create({ name: 'Jane' })

function getObjProduct(objCatalogList) {
  const product = objCatalogList[Object.keys(objCatalogList)]
  return {
    wb_id: product.nm_id,
    catalog_id: 1,
    name: product.name,
    url_img: product.url_img,
    description: product.description,
    property: product.property,
  }
}

function getArrayCatalog(objCatalogList) {
  let catalogBuild = []
  for (let key in objCatalogList) {
    const obj = objCatalogList[key]
    catalogBuild.push({
      wb_id: obj.id,
      parent_id: obj.parent,
      url: obj.url,
      name: obj.name,
      sheet: obj.sheet,
    });
  }
  return catalogBuild
}

function getObj(pathJson) {
  const strList = fs.readFileSync(pathJson, 'utf8')
  return JSON.parse(strList);
}

async function main() {
  const pathCatalogJson = rootDir + '/catalogs/rebuilt-catalog.json'

  try {
    const objCatalogList = getObj(pathCatalogJson);

    if (!objCatalogList) {
      throw new SyntaxError('objCatalogList: empty'); // (*)
    }

    const catalogBuild = getArrayCatalog(objCatalogList)

    //  заполнение
    await Catalogs.bulkCreate(catalogBuild)

  } catch (err) {
    logger.error({ error: err }, 'db error');
  }
}

// main();

async function main1() {
  const pathCatalogJson = rootDir + '/products/'
  const filesList = fs.readdirSync(pathCatalogJson);

  for (var i in filesList) {
    const objCatalogList = getObj(pathCatalogJson + filesList[i]);
    const catalogBuild = getObjProduct(objCatalogList)

    const product = await Products.create(catalogBuild)
    await product.save()
  }
}

// (async function test() {
//   const catalogBuild = {
//     wb_id: 150372322,
//     catalog_id: 1,
//     name: 'Полка /  Витрина настенная №1-3А с подсветкой',
//     url_img: 'https://basket-10.wb.ru/vol1503/part150372/150372322/images/big/1.jpg',
//     description: 'fghjdjfhjdfdfj',
//   }
//   const product = await Products.create(catalogBuild)
//   await product.save()
// })();


main1()

// try {
// } catch (error) {
// } finally {
  // await sequelize.close();
// }
