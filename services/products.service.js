const { faker } = require('@faker-js/faker');
const boom = require('boom');

function productsService() {
  let products = [];
  generateProducts();

  function generateProducts() {
    for (let index = 0; index < 100; index++) {
      products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isLocked: faker.datatype.boolean()
      });
    }
  }

  async function list() {
    return products;
  }

  async function getProductIndex(id) {
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex < 0) {
      throw boom.notFound('Product not found');
    }

    return productIndex;
  }

  async function find(id) {
    const productIndex = await getProductIndex(id);

    return products[productIndex]
  }

  async function update(id, data) {
    const productIndex = await getProductIndex(id);

    if (products[productIndex].isLocked) {
      throw boom.conflict('Product is locked');
    }

    products[productIndex] = {
      ...products[productIndex],
      ...data,
    }

    return products[productIndex];
  }

  async function remove(id) {
    const productIndex = await getProductIndex(id);

    if (products[productIndex].isLocked) {
      throw boom.conflict('Product is locked');
    }

    products.splice(productIndex, 1);

    return true;
  }

  async function create (data) {
    const newProduct = {
      ...data,
      id: faker.string.uuid(),
    }
    products.push(newProduct);

    return newProduct;
  }

  return {
    list,
    find,
    update,
    remove,
    create,
  }
}

module.exports = productsService
