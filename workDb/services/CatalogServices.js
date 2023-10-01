import { rootDir, getObj } from '../../helper.js'
import Catalogs from '../models/catalogs.js'

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

export default async function CatalogServices() {
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
    throw err
  }
}
