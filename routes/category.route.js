const router = require('express-promise-router')();
const Authorization = require('../src/middlwares/authorization.middleware');
const CategoryController = require('../src/controllers/category.controller');
const ValidationMiddleware = require('../src/middlwares/validation.middleware');
const generalValidationSchema = require('../src/validations/general.validate');
const categoryValidationSchema = require('../src/validations/caetegory.validate');

router.get('/categories', CategoryController.getAllCategories);

router.post(
  '/categories',
  Authorization.auth(['ADMIN']),
  ValidationMiddleware.validateBody(categoryValidationSchema.upsertCategory),
  CategoryController.addNewCategory
);

router.get(
  '/categories/:id',
  Authorization.auth(['ADMIN']),
  ValidationMiddleware.validateParam(generalValidationSchema.getDetailWithId),
  CategoryController.getDetailCategory
);

router.patch(
  '/categories/:id',
  Authorization.auth(['ADMIN']),
  ValidationMiddleware.validateParam(generalValidationSchema.getDetailWithId),
  ValidationMiddleware.validateBody(categoryValidationSchema.upsertCategory),
  CategoryController.updateCategory
);

router.delete(
  '/categories/:id',
  Authorization.auth(['ADMIN']),
  ValidationMiddleware.validateParam(generalValidationSchema.getDetailWithId),
  CategoryController.deleteCategory
);

module.exports = router;
