class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message)
    this.isExpected = true
    this.statusCode = statusCode

    this.body = {
      error: {
        message,
      },
    }
  }
}

export {
  AppError,
}
