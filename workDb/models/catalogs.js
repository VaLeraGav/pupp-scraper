import { DataTypes } from 'sequelize'
import sequelize from '../sequelize.js'

const Catalog = sequelize.define('catalogs',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    wb_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sheet: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
  },
  {
    timestamps: true
  }
)

export default Catalog
