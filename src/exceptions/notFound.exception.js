class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.printMsg = message;
    this.statusCode = 404;
  }

  handle() {}
}

module.exports = NotFoundError;
