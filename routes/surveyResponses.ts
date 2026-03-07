import express from 'express';
import { protect, restrictTo } from '../controllers/authController.ts';
import { createSurveyResponse, getSurveyResponses } from '../controllers/surveyResponsesController.ts';

const router = express.Router();

router.post('/submit/:surveyId', protect, restrictTo('user'), createSurveyResponse);
router.get('/submissions', protect, restrictTo('admin'), getSurveyResponses)

export default router;