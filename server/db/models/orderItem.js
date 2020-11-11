const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  serial: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  //note: this reflects the price of one item in the cart.  multiply by quantity to get total cost of order item
  price: {
    type: Sequelize.INTEGER //divide by 100 on client side
  }
})

module.exports = OrderItem
