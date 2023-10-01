import dotenv from 'dotenv'
dotenv.config();

const env = process.env

export default {
  development: {
    "username": env.DB_USERNAME,
    "password": env.DB_PASSWORD,
    "database": env.DB_DATABASE,
    "host": env.DB_HOST,
    "dialect": env.DB_DIALECT,
    "logging": true,
  },
  test: {
    "username": env.DB_USERNAME,
    "password": env.DB_PASSWORD,
    "database": env.DB_DATABASE,
    "host": env.DB_HOST,
    "dialect": env.DB_DIALECT,
    "logging": true,
  },
  production: {
    "username": env.DB_USERNAME,
    "password": env.DB_PASSWORD,
    "database": env.DB_DATABASE,
    "host": env.DB_HOST,
    "dialect": env.DB_DIALECT,
    "logging": false,
  }
}
