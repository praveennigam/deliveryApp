import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

// Register route
userRouter.post('/register', registerUser);

// Login route
userRouter.post('/login', loginUser);

export default userRouter;