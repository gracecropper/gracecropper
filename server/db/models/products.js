const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('product', {
  name: {
    type: Sequelize.STRING,
    // type: Sequelize.ENUM('Cropped Tops', 'Crops', 'Cropped Pictures'),

    allowNull: false,
    validate: {
      notEmpty: true
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

    // get() {
    //   switch (this.name) {
    //     case 'Cropped Tops':
    //       return '/img/croptop.jpg'
    //     case 'Crops':
    //       return '/img/crop.jpg'
    //     case 'Cropped Pictures':
    //       return '/img/croppedpic.png'
    //     default:
    //       return ''
    //   }
    //}
  },
  size: {
    type: Sequelize.ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL') //move this to order item || create multiple crop tops for each size
  },
  description: {
    type: Sequelize.STRING
    // get() {
    //   switch (this.name) {
    //     case 'Cropped Tops':
    //       return 'cream of the crop top'
    //     case 'Crops':
    //       return 'organic and good for you'
    //     case 'Cropped Pictures':
    //       return 'get that photobomber outta your life!'
    //     default:
    //       return ''
    //   }
    // }
  }
})
