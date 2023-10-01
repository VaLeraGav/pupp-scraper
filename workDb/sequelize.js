
import envConfigs from './config/config.js'
import Sequelize from 'sequelize'

const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

export default new Sequelize(config.database, config.username, config.password, config);
