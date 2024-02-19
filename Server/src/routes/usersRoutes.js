import {Router} from 'express';
import { createNewUserController, deleteUserController, getAllUsersController, getSingleUserController, loginUserController, updateUserControllers, updateUserPasswordControllers } from '../controllers/usersControllers.js';

const userRouter=Router();

userRouter.post('/users/register', createNewUserController)

userRouter.post('/users/login', loginUserController)

userRouter.get('/users', getAllUsersController)

userRouter.get('/users/single/:UserID',getSingleUserController)

userRouter.put('/users/update/:UserID',updateUserControllers)

userRouter.patch('/users/patch/:UserID',updateUserPasswordControllers)

userRouter.delete('/users/delete/:UserID',deleteUserController)


export default userRouter;