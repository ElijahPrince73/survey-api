import express from 'express';
import { protect, restrictTo } from '../controllers/authController.ts';
import { createTour } from '../controllers/surveyTemplateController.ts';

const router = express.Router();

router.post('/', protect, restrictTo('admin'), createTour);

export default router;
