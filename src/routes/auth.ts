import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { UserService } from '../services/UserServices';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';

const router = express.Router();

//
const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);

const authController = new AuthController(userService); // this is the dependecy injection of the AuthController class /* this is of Great Work */

router.post('/register', (req, res) => authController.register(req, res));

//
export default router;
