'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderItem} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Cabbage Crop Top',
      type: 'Cropped Tops',
      quantity: 20,
      price: 2500,
      size: 'M',
      imageUrl: '/img/croptop.jpg',
      description: 'Cream of the crop top'
    }),
    Product.create({
      name: 'Best Crops Ever',
      type: 'Crops',
      quantity: 20,
      price: 1000,
      imageUrl: '/img/crop.jpg',
      description: 'organic and good for you'
    }),
    Product.create({
      name: 'When in doubt, crop it out',
      type: 'Cropped Pictures',
      quantity: 20,
      price: 1000,
      imageUrl: '/img/croppedpic.png',
      description: 'get that photobomber outta your life!'
    })
  ])
  //creating an order
  const orders = await Promise.all([
    Order.create({
      date: new Date(),
      status: 'Delivered',
      paymentMethod: 'credit',
      shippingAddress: '777 Park Place'
    })
  ])
  //creating an order item
  const orderItems = await Promise.all([
    OrderItem.create({
      quantity: 5000,
      price: 2500
    })
  ])
  //which product is in your cart?  crop top!
  await orderItems[0].setProduct(products[0])

  await orders[0].addToCart(orderItems[0])
  await users[0].addOrder(orders[0])

  // console.log(`$${orders[0].orderTotal / 100}`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${orderItems.length} orderItems`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
