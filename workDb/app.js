import sequelize from './sequelize.js'
import logger from '../logger.js'
import CatalogServices from './services/CatalogServices.js'
import ProductServices from './services/ProductServices.js'

try {
  await sequelize.authenticate()
  console.log('Connection to the database was successfully!')
  await sequelize.sync({ force: false }) // true - удаляет существующую таблицу и создает новую
} catch (err) {
  logger.error({ error: err }, 'Unable to connect to the database');
}

try {
  CatalogServices()
} catch (e) {
  console.log('db error:', e)
  logger.error({ error: err }, 'db error');
}
