import express from 'express';
import { protect, restrictTo } from '../controllers/authController.ts';
import {
  createSurveyTemplate,
  activateSurvey,
  getActveSurvey,
  getAllActiveSurveyTempalates
} from '../controllers/surveyTemplateController.ts';

const router = express.Router();

router.post('/', protect, restrictTo('admin'), createSurveyTemplate);
router.get('/', protect, restrictTo('admin'), getAllActiveSurveyTempalates);
router.post(
  '/:surveyId/activate',
  protect,
  restrictTo('admin'),
  activateSurvey,
);
router.get('/active', protect, getActveSurvey);

export default router;
