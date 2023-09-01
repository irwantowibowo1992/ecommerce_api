const uploadFile = require('../utils/uploadFile.util');

class ImageService {
  async addImage(file, folder) {
    const result = await uploadFile(file.buffer, `ecommerce/${folder}`);

    return result.secure_url;
  }
}

module.exports = new ImageService();
