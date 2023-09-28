
import Sequilize from 'sequelize'

const config = {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: 0,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
  }
}

export default new Sequilize('postgres', 'valera', '6579', config)
