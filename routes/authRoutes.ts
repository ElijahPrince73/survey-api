import express from 'express';
import {
  signUp,
  login,
  protect,
  restrictTo,
} from '../controllers/authController.ts';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
// router.get('/all', protect, restrictTo('user', 'admin'));

export default router;
