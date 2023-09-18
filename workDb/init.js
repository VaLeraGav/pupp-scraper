
import { getDataSource } from './getDataSource.js'
import { Catalog } from './database/entity/Catalog.js'

const init = async () => {
  const test = await getDataSource();
  const seasonRepo = test.getRepository(Catalog);

    const users = await seasonRepo.manager.find(Catalog)
    console.log("Loaded users: ", users)

  // Your business logic
}

init()
