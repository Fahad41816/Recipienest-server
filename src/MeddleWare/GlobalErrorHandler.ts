/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import HandleDuplicateError from '../Error/HandleDuplicateError'
import HandleCastError from '../Error/HandleCastError'
import HandleValidationError from '../Error/HandleValidationError'
import HandleZodError from '../Error/HandleZodError'

const globalErrorHandler: any = (err : any, req :Request, res: Response, next: NextFunction) => {
  let statusCode = 500
  let message = err.message || 'Something went wrong!'
  let ErrorSources = [
    {
      path: '',
      message: 'Someting Wrong!!',
    },
  ]

  if (err instanceof ZodError) {
    const semplifiedError = HandleZodError(err)
    statusCode = semplifiedError.Statuscode
    message = semplifiedError.
    // @ts-ignore
    ErrorSources = semplifiedError.ZodErrorSource
  } else if (err.name == 'ValidationError') {
    const semplifiedError = HandleValidationError(err)
    statusCode = semplifiedError.statusCode
    message = semplifiedError.message
    ErrorSources = semplifiedError.ErrorSources
  } else if (err.name == 'CastError') {
    const semplifiedError = HandleCastError(err)
    statusCode = semplifiedError.statusCode
    message = semplifiedError.message
    ErrorSources = semplifiedError.ErrorSources
  } else if (err.code == 11000) {
    const semplifiedError = HandleDuplicateError(err)
    statusCode = semplifiedError.statusCode
    message = semplifiedError.message
    ErrorSources = semplifiedError.ErrorSources
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ErrorSources,
    stack: err,
  })
}

export default globalErrorHandler
