const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(30);
const price = joi.number().strict().integer().min(10);
const image = joi.string().uri();
const isLocked = joi.boolean();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isLocked
});

const updateProductSchema = joi.object({
  name,
  price,
  image,
  isLocked
});

const getProductSchema = joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};
