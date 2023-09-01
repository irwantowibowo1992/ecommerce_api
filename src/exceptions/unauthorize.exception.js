class UnauthorizeError extends Error {
  constructor(message) {
    super(message);

    this.printMsg = message;
    this.statusCode = 401;
  }

  handle() {}
}

module.exports = UnauthorizeError;
