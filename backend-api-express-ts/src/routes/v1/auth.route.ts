import express, { Router } from 'express';
import authController from '../../controllers/auth.controller';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = express.Router() as Router;

//POST api/v1/auth/login ==> login user
router.post('/login',authController.login);
//GET api/v1/auth/profile ==> get profile user
router.get('/profile',authenticateToken, authController.getProfile);

export default router;