const errorController = {}

errorController.throwError = (req, res, next) => {
  try {
    // Intentional server error
    throw new Error("Intentional 500 error triggered for testing.")
  } catch (err) {
    next(err) // Pass error to global middleware
  }
}

module.exports = errorController
