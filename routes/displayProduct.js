const express = require('express');
const productsRepo = require('../repsository/ProductsRepository');

const productsIndexTemplate = require('../views/newproduct/indexToDisplay');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(productsIndexTemplate({ products }));
});

module.exports = router