class ServerError extends Error {
  constructor(message) {
    super(message);

    this.printMsg = message;
    this.statusCode = 500;
  }

  handle() {}
}

module.exports = ServerError;
