import express from 'express';
import { signUp } from '../controllers/authController.ts';

const router = express.Router();

router.post('/', signUp);

export default router;
