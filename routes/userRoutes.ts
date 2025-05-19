import express from 'express';
import { signUp, login, protect } from '../controllers/authController.ts';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/all', protect);

export default router;
