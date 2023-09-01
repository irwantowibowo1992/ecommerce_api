const humps = require('humps');

class SuccessResult {
  static make(res) {
    this.res = res;
    return this;
  }

  static sendWithHumps(data, total) {
    if (Array.isArray(data)) {
      return this.res.status(200).send({
        data: {
          results: humps.camelizeKeys(data),
          total,
        },
      });
    }
    return this.res.status(200).send({
      data: humps.camelizeKeys(data),
    });
  }

  static sendData(data) {
    return this.res.status(200).send({
      data: humps.camelizeKeys(data),
    });
  }

  static sendMessage(message) {
    return this.res.status(200).send({
      message,
    });
  }

  static sendDownload(path, fileName) {
    if (fileName) return this.res.download(path, fileName);
    return this.res.download(path, fileName);
  }
}

module.exports = SuccessResult;
