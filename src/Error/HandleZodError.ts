import { ZodError } from "zod"

const HandleZodError = (err: ZodError) => {
  const ZodErrorSource = err.issues.map(issue => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    }
  })

  const message = 'Zod Validation Error'
  const Statuscode = 404

  return {
    Statuscode,
    ZodErrorSource,
    message,
  }
}

export default HandleZodError
