import express from 'express';
import { protect, restrictTo } from '../controllers/authController.ts';
import {
  createSurveyTemplate,
  activateSurvey,
} from '../controllers/surveyTemplateController.ts';

const router = express.Router();

router.post('/', protect, restrictTo('admin'), createSurveyTemplate);
router.post(
  '/:surveyId/activate',
  protect,
  restrictTo('admin'),
  activateSurvey,
);

export default router;
