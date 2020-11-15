const Sequelize = require('sequelize')
const db = require('../db')
const OrderItem = require('./orderItem')

// what is order quantity?
const Order = db.define('order', {
  //date order placed, null if this order is user's cart
  date: {
    type: Sequelize.DATE
  },
  status: {
    type: Sequelize.ENUM('Pending', 'Shipped', 'Delivered', 'In User Cart'),
    defaultValue: 'Pending'
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
  orderTotalDisplay: {
    type: Sequelize.STRING,
    get() {
      return `$${(this.orderTotal / 100).toFixed(2)}`
    }
  },
  shippingAddress: {
    type: Sequelize.STRING
  }
})

//instance method to automatically update the order total and quantity
Order.prototype.updateCartTotals = async function(price, quantity) {
  this.orderSubtotal += price
  this.quantity += quantity
  await this.save()
}

Order.prototype.subtractTotal = async function(price, quantity) {
  this.orderSubtotal -= price
  this.quantity -= quantity
  await this.save()
}

//after update that does what the instance method does?
// Order.afterUpdate(async (orderInstance, ) => {
//   const items = await OrderItem.findAll({where: {id: orderInstance.id}})
//reduce quantity
//reduce price
//   orderInstance.orderSubtotal +=
//   orderInstance.quantity +=

// })

module.exports = Order
