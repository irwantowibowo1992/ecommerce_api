const ImageService = require('../services/image.service');
const SuccessResult = require('../utils/response.util');

class ImageController {
  async addImage(req, res) {
    const file = req.file;
    const { folder } = req.body;
    const data = await ImageService.addImage(file, folder);
    SuccessResult.make(res).sendData(data);
  }
}

module.exports = new ImageController();
