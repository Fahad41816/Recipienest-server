// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HandleCastError = (err : any) => {
  const ErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ]

  return {
    statusCode: 500,
    message: 'invalid Id',
    ErrorSources,
  }
}

export default HandleCastError
