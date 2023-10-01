import { rootDir, getObj, createDir } from '../../helper.js'
import Products from '../models/products.js'
import * as fs from 'fs';
import chokidar from 'chokidar';
import path from 'path';

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

export default async function ProductServices() {

  const copiedProduct = 'new'
  const watcher = chokidar.watch('./products');
  await createDir(`${rootDir}/${copiedProduct}/products/`)

  watcher.add(path.resolve(rootDir, 'download')).on('add', async (path) => {

    const objCatalogList = getObj(path);
    const catalogBuild = getObjProduct(objCatalogList)
    const product = await Products.create(catalogBuild)
    await product.save()

    fs.rename(`${rootDir}/${path}`, `${rootDir}/${copiedProduct}/${path}`, err => {
      if (err) throw err;
    });
  });
}
