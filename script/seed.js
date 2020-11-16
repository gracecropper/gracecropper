'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderItem} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', role: 'Admin'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Cabbage Crop Top',
      type: 'Cropped Tops',
      quantity: 20,
      price: 25.0,
      imageUrl: '/img/croptop.jpg',
      description: 'Cream of the crop top'
    }),
    Product.create({
      name: 'Brooklyn Crop Top',
      type: 'Cropped Tops',
      quantity: 20,
      price: 25.0,
      imageUrl: '/img/brooklyn.png',
      description: `No Sleep Til'`
    }),
    Product.create({
      name: 'Crop Til You',
      type: 'Cropped Tops',
      quantity: 20,
      price: 25.0,
      imageUrl: '/img/croptiludrop.png',
      description: `Don't stop the crop!`
    }),
    Product.create({
      name: 'Seoul Crop Top',
      type: 'Cropped Tops',
      quantity: 20,
      price: 25.0,
      imageUrl: '/img/seoul.png',
      description: `<3 Seoul <3`
    }),
    Product.create({
      name: 'Run Seed Crop Top',
      type: 'Cropped Tops',
      quantity: 20,
      price: 25.0,
      imageUrl: '/img/npmrunseed.jpg',
      description: `Npm install npm run seed`
    }),
    Product.create({
      name: 'Support Local',
      type: 'Cropped Tops',
      quantity: 20,
      price: 25.0,
      imageUrl: '/img/supportlocal.png',
      description: `Support your local farms and businesses`
    }),
    Product.create({
      name: 'GraceCropper',
      type: 'Cropped Tops',
      quantity: 20,
      price: 25.0,
      imageUrl: '/img/gracecropper.png',
      description: `Support us!`
    }),
    Product.create({
      name: 'Support Local',
      type: 'Cropped Tops',
      quantity: 20,
      price: 25.0,
      imageUrl: '/img/supportlocal.png',
      description: `Support your local farms and businesses`
    }),
    Product.create({
      name: 'This.crops.name',
      type: 'Cropped Tops',
      quantity: 20,
      price: 25.0,
      imageUrl: '/img/thiscropsname.png',
      description: `this.crops.name = GraceCropper!`
    }),
    Product.create({
      name: '2020 sux Crop Top',
      type: 'Cropped Tops',
      quantity: 20,
      price: 25.0,
      imageUrl: '/img/2021please.png',
      description: `Hindsight is 2020`
    }),
    Product.create({
      name: 'Best Crops Ever',
      type: 'Crops',
      quantity: 20,
      price: 10.0,
      imageUrl: '/img/crop.jpg',
      description: 'organic and good for you'
    }),
    Product.create({
      name: 'Tomatoes',
      type: 'Crops',
      quantity: 20,
      price: 5.0,
      imageUrl: '/img/tomatoes.jpeg',
      description: 'red and juicy and organic and good for you'
    }),
    Product.create({
      name: 'Corn',
      type: 'Crops',
      quantity: 20,
      price: 5.0,
      imageUrl: '/img/corn.jpg',
      description: 'organic and corny and good for you'
    }),
    Product.create({
      name: 'Bell Peppers',
      type: 'Crops',
      quantity: 20,
      price: 5.0,
      imageUrl: '/img/bellpeppers.jpg',
      description: 'organic and good for you'
    }),
    Product.create({
      name: 'Potatoes',
      type: 'Crops',
      quantity: 20,
      price: 10.0,
      imageUrl: '/img/potato.jpg',
      description: 'organic and good for you and a root vegetable'
    }),
    Product.create({
      name: 'Cucumbers',
      type: 'Crops',
      quantity: 20,
      price: 7.0,
      imageUrl: '/img/cucumbers.jpeg',
      description: 'organic and good for you'
    }),
    Product.create({
      name: 'When in doubt, crop it out',
      type: 'Cropped Pictures',
      quantity: 20,
      price: 10.0,
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
    }),
    Order.create({
      date: new Date(),
      status: 'In User Cart',
      paymentMethod: 'paypal',
      shippingAddress: '78 Ocean Drive'
    }),
    Order.create({
      date: new Date(),
      status: 'Pending',
      paymentMethod: 'credit',
      shippingAddress: '777 Park Place'
    }),
    Order.create({
      date: new Date(),
      status: 'Shipped',
      paymentMethod: 'credit',
      shippingAddress: '777 Park Place'
    })
  ])
  //creating an order item
  const orderItems = await Promise.all([
    OrderItem.create({
      quantity: 5,
      price: 2500,
      orderId: 1,
      productId: 1,
      size: 'XS'
    }),
    OrderItem.create({
      quantity: 77,
      price: 7000,
      orderId: 1,
      productId: 2
    }),
    OrderItem.create({
      quantity: 1,
      price: 70,
      orderId: 2,
      productId: 3
    }),
    OrderItem.create({
      quantity: 2,
      price: 700,
      orderId: 2,
      productId: 1,
      size: 'M'
    }),
    OrderItem.create({
      quantity: 5,
      price: 2500,
      orderId: 3,
      productId: 1,
      size: 'M'
    })
  ])

  await orders[0].updateCartTotals(orderItems[0].price, orderItems[0].quantity)
  await orders[1].updateCartTotals(orderItems[1].price, orderItems[1].quantity)
  await orders[1].updateCartTotals(orderItems[4].price, orderItems[4].quantity)
  await orders[2].updateCartTotals(orderItems[2].price, orderItems[2].quantity)
  await orders[2].updateCartTotals(orderItems[3].price, orderItems[3].quantity)
  await users[0].addOrder(orders[0])
  await users[0].addOrder(orders[1])
  await users[1].addOrder(orders[2])
  await users[1].addOrder(orders[3])

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
