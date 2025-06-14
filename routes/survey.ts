import express from 'express';
import { protect, restrictTo } from '../controllers/authController.ts';
import { createSurveyTemplate } from '../controllers/surveyTemplateController.ts';

const router = express.Router();

router.post('/', protect, restrictTo('admin'), createSurveyTemplate);

export default router;
