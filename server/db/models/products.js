const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('products', {
  name: {
    type: Sequelize.ENUM('Cropped Tops', 'Crops', 'Cropped Pictures'),
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER //number of pennies per item
  },
  imageUrl: {
    type: Sequelize.TEXT,
    get() {
      switch (this.name) {
        case 'Cropped Tops':
          return '/img/croptop.jpg'
        case 'Crops':
          return '/img/crop.jpg'
        case 'Cropped Pictures':
          return '/img/croppedpic.png'
        default:
          return ''
      }
    }
  },
  size: {
    type: Sequelize.ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL')
  },
  description: {
    type: Sequelize.STRING,
    get() {
      switch (this.name) {
        case 'Cropped Tops':
          return 'cream of the crop top'
        case 'Crops':
          return 'organic and good for you'
        case 'Cropped Pictures':
          return 'get that photobomber outta your life!'
        default:
          return ''
      }
    }
  }
})
