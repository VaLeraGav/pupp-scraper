import { DataTypes } from 'sequelize'
import sequelize from '../sequelize.js'

const Product = sequelize.define('products',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false
  }
)

export default Product
