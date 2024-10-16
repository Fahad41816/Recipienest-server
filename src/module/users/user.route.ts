import express from 'express' 
import { userController } from './user.controller'
import auth from '../../MeddleWare/auth'

const route = express.Router()


route.get('/AllUsers', auth('admin'), userController.GetAllUsers)
route.get('/CheckUser', auth('user', 'admin'), userController.CheckUser)

route.post('/Login', userController.UserLogin)
route.post('/Register', userController.userRegistration)
route.post('/user/password-reset-email', userController.ForGetPassEmailSend)
route.post('/user/passwordChange', userController.passwordChange)


route.patch('/userStatus', auth('admin'), userController.updateUerStatus)
route.patch('/user', auth('user', 'admin'), userController.updateUserData)
route.patch('/Follow/:id', auth('user', 'admin'), userController.userFollowerManage)
route.patch('/userRole', auth('admin'), userController.ChangeUserRole)
route.patch('/usermembership/:id', userController.Changeusermembership)
route.patch('/changePassword/:email', userController.changeUserPasswordWithOldPassword)


route.delete('/user/:id', auth('admin'), userController.deleteUser)



export const UserRoute = route