import { DataTypes } from 'sequelize'
import sequelize from '../sequelize.js'

const Products = sequelize.define('products',
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
    catalog_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url_img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    property: {
      type: DataTypes.JSONB,
      allowNull: true,
    }
  },
  {
    timestamps: true
  }
)

export default Products
