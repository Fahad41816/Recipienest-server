import mongoose from 'mongoose'

const HandleValidationError = (err: mongoose.Error.ValidationError) => {
  const statusCode = 500

  const ErrorSources = Object.values(err.errors).map(val => {
    return {
      path: val.path,
      message: val.message,
    }
  })

  return {
    statusCode,
    message: 'Validation Error',
    ErrorSources,
  }
}

export default HandleValidationError
