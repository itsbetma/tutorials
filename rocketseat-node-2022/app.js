const express = require('express')
const { randomUUID } = require('crypto')
const app = express()
const fs = require('fs')

app.use(express.json())

let products = []
let productsFromFile = []

if (fs.existsSync('products.json')) {
  productsFromFile = fs.readFileSync('products.json', 'utf-8', (error) => {
    if (error) console.log('Error reading files.')
  })
  productsFromFile = JSON.parse(productsFromFile)
  if (productsFromFile !== undefined && productsFromFile.length > 0) {
    products = productsFromFile
    console.log('Products initialized from filesystem.')
  }
}

function updateFile () {
  fs.writeFileSync('products.json', JSON.stringify(products), (error) => {
    if (error) {
      console.log('FileSystem Error.')
      return false
    } else {
      console.log('Product inserted.')
      return true
    }
  })
}

app.get('/', (req, res) => {
  return res.json({
    message: 'Hello'
  })
})

app.post('/products', (req, res) => {
  const { name, price } = req.body

  const product = {
    name,
    price,
    id: randomUUID()
  }
  products.push(product)
  updateFile()
  return res.json(product)
})

app.get('/products', (req, res) => {
  return res.json(products)
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  const product = products.find(prd => prd.id === id)
  return res.json(product)
})

app.put('/products/:id', (req, res) => {
  const { id } = req.params
  const { name, price } = req.body
  const productIndex = products.findIndex(prd => prd.id === id)
  products[productIndex] = {
    name,
    price,
    id
  }
  updateFile()
  return res.json({
    message: 'Product updated sucessfully!',
    data: products[productIndex]
  })
})

app.delete('/products/:id', (req, res) => {
  const { id } = req.params
  const productIndex = products.findIndex(prd => prd.id === id)
  const product = products.splice(productIndex, 1)
  updateFile()
  return res.json({
    message: 'Product deleted sucessfully!',
    data: product
  })
})

app.listen(4001, () => console.log('Server Express is running at 4001'))
