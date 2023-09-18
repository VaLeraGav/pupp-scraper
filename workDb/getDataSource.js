import { AppDataSource } from "./dataSource.js"

export const getDataSource = async (delay = 3000) => {
  // if (AppDataSourceTest.isInitialized) return Promise.resolve(AppDataSourceTest);

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     if (AppDataSourceTest.isInitialized) resolve(AppDataSourceTest);
  //     else reject("Failed to create connection with database");
  //   }, delay);
  // });

  let dataSource = null
  if (dataSource == null) {
    dataSource = await AppDataSource.initialize()
    console.log(`AppDataSource Initialized...`)
  }
  if (!dataSource.isInitialized) {
    console.log(`Couldn't initialize dataSource...`)
    throw new Error(`Couldn't initialize dataSource`)
  }
  return dataSource
}
