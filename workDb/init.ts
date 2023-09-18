
import { getDataSource } from './getDataSource'

const init = async () => {
  const test = await getDataSource();
  const seasonRepo = test.getRepository(User);

    const users = await seasonRepo.manager.find(User)
    console.log("Loaded users: ", users)

  // Your business logic
}

init()
