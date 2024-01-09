const express = require('express');
const productsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');

const router = express.Router();
const service = productsService();

router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const products = await service.list();
  res.json(products.slice(0, limit));
});


router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      res.json(await service.find(id));
    } catch(e) {
      next(e);
    }
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const createdProduct = await service.create(req.body);

    res.status(201).json({
      message: 'created',
      data: createdProduct
    });
  });

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      await service.update(id, body);

      res.json({
        message: 'update',
        data: body,
        id,
      });
    } catch(e) {
      next(e);
    }
  });

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await service.remove(id);
    res.json({
      message: 'deleted',
      id,
    });
  } catch(e) {
    next(e);
  }
});

module.exports = router;
