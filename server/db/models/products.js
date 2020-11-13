const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    // type: Sequelize.ENUM('Cropped Tops', 'Crops', 'Cropped Pictures'),
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true
    }
  },
  type: {
    type: Sequelize.ENUM('Cropped Tops', 'Crops', 'Cropped Pictures'),
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 10000
    }
  },
  price: {
    type: Sequelize.INTEGER //number of pennies per item
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: '/img/cornPic.jpg'
  },
  description: {
    type: Sequelize.STRING
  }
})

module.exports = Product

//beforeCreate --> turns price into pennies
Product.beforeCreate(product => {
  product.price = product.price * 100
})

//beforeUpdate --> turns price into pennies
Product.beforeUpdate(product => {
  product.price = product.price * 100
})
