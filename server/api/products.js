const router = require('express').Router()
const {Product} = require('../db/models')
const {User} = require('../db/models')

// can we take the admin logic and put it in a reusable function?

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

// route to get single product
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

//edit product route
router.put('/:productId', async (req, res, next) => {
  try {
    if (req.user === undefined || req.user.role !== 'Admin') {
      res.sendStatus(403)
    } else {
      const updatedProductPromise = await Product.update(req.body, {
        returning: true,
        where: {
          id: req.params.productId
        }
      })

      const [numOfAffectedRows, [updatedProduct]] = updatedProductPromise

      res.status(200).json(updatedProduct)
    }
  } catch (err) {
    next(err)
  }
})

//route to delete product
router.delete('/:productId', async (req, res, next) => {
  try {
    if (req.user === undefined || req.user.role !== 'Admin') {
      res.sendStatus(403)
    } else {
      await Product.destroy({
        where: {
          id: req.params.productId
        }
      })
      res.status(204)
    }
  } catch (err) {
    next(err)
  }
})

//route to add products
router.post('/', async (req, res, next) => {
  try {
    if (req.user === undefined || req.user.role !== 'Admin') {
      res.sendStatus(403)
    } else {
      const newProduct = await Product.create(req.body)
      res.json(newProduct)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
