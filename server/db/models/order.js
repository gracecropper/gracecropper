const Sequelize = require('sequelize')
const db = require('../db')

// what is order quantity?
const Order = db.define('order', {
  //date order placed, null if this order is user's cart
  date: {
    type: Sequelize.DATE
  },
  status: {
    type: Sequelize.ENUM('pending', 'shipped', 'delivered'),
    defaultValue: 'pending'
  },
  paymentMethod: {
    type: Sequelize.ENUM('debit', 'credit', 'paypal', 'stripe')
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  orderSubtotal: {
    type: Sequelize.INTEGER, //price / 100 to account for javascript float error
    defaultValue: 0
  },
  tax: {
    type: Sequelize.DECIMAL,
    defaultValue: 1.0825 //NY Sales Tax 8.25%
  },
  orderTotal: {
    type: Sequelize.INTEGER,
    get() {
      return Math.round(this.orderSubtotal * this.tax)
    }
  },
  shippingAddress: {
    type: Sequelize.STRING
  }
})

//instance method to automatically update the order total and quantity
Order.prototype.addToCart = async function(orderItem) {
  await this.addOrderItem(orderItem)
  this.orderSubtotal += orderItem.price
  this.quantity += orderItem.quantity
  await this.save()
}

module.exports = Order
