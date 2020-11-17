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
    allowNull: false,
    validate: {
      min: 0,
      max: 10000,
      notNull: true
    }
  },
  price: {
    type: Sequelize.INTEGER, //number of pennies per item
    allowNull: false,
    validate: {
      min: 0,
      notNull: true
    }
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
Product.beforeBulkUpdate(product => {
  product.attributes.price = product.attributes.price * 100
})
