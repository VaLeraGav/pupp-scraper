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

function getArrayCatalog(objCatalogList) {
  let catalogBuild = []
  for (let key in objCatalogList) {
    const obj = objCatalogList[key]
    catalogBuild.push({
      wb_id:obj.id,
      parent_id:obj.parent,
      url:obj.url,
      name:obj.name,
      sheet:obj.sheet,
    });
  }
  return catalogBuild
}
// https://stackoverflow.com/questions/60705929/insert-and-get-json-data-in-sequelize-and-postgres
function getArrayCatalog(objCatalogList) {
  let catalogBuild = []
  for (let key in objCatalogList) {
    const obj = objCatalogList[key]
    catalogBuild.push({
      wb_id:obj.id,
      parent_id:obj.parent,
      url:obj.url,
      name:obj.name,
      sheet:obj.sheet,
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

main();
