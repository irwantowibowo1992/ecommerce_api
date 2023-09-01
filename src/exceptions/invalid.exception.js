class InvalidError extends Error {
  constructor(message) {
    super(message);

    this.printMsg = message;
    this.statusCode = 422;
  }

  handle() {}
}

module.exports = InvalidError;
