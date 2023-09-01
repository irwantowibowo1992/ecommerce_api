const router = require('express-promise-router')();
const upload = require('../config/multer.config');
const ImageController = require('../src/controllers/image.controller');

router.post('/images', upload.single('image'), ImageController.addImage);

module.exports = router;
