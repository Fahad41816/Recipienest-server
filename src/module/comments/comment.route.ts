import express from 'express'
import { CommentController } from './comment.controller'

const Router = express.Router()


Router.post('/', CommentController.CreateComment)
Router.delete('/:id', CommentController.DeleteUserComment)
Router.patch('/:id', CommentController.updateUserComment)

export const commentRouter = Router