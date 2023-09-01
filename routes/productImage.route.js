const router = require('express-promise-router')();
const Authorization = require('../src/middlwares/authorization.middleware');
const ProductImageController = require('../src/controllers/productImage.controller');

router.get(
  '/product-images',
  Authorization.auth(['ADMIN']),
  ProductImageController.getAllProductImage
);

module.exports = router;
