const router = require('express-promise-router')();
const AuthorizationMiddleware = require('../src/middlwares/authorization.middleware');
const ProductController = require('../src/controllers/product.controller');

router.get(
  '/products',
  AuthorizationMiddleware.auth(['ADMIN']),
  ProductController.getAllProducts
);

router.post(
  '/products',
  AuthorizationMiddleware.auth(['ADMIN']),
  ProductController.addNewProduct
);

router.get('/products/:id', ProductController.getDetailProduct);

module.exports = router;
