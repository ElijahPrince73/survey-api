import SurveyTemplate from '../models/surveyTemplate.ts';

import AppError from '../utils/appError.ts';
import catchAsync from '../utils/catchAsync.ts';

const createSurveyTemplate = catchAsync(async (req, res, next) => {
  const { title, description, questions, isActive } = req.body;
  const { _id } = req.user;

  // Deactivate survey that is already active
  let surveyToDeactivate = await SurveyTemplate.findOne({ isActive: true });
  if (surveyToDeactivate) {
    surveyToDeactivate.isActive = false;
    surveyToDeactivate.save();
  }

  const newSurveyTemplate = await SurveyTemplate.create({
    title,
    description,
    questions,
    isActive,
    createdBy: _id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      newSurveyTemplate,
    },
  });
});

const activateSurvey = catchAsync(async (req, res, next) => {
  const { surveyId } = req.params;

  let surveyToUpdate = await SurveyTemplate.findById(surveyId);

  // Deactivate survey that is already active
  let surveyToDeactivate = await SurveyTemplate.findOne({ isActive: true });
  if (surveyToDeactivate) {
    surveyToDeactivate.isActive = false;
    surveyToDeactivate.save();
  }

  if (surveyToUpdate) {
    surveyToUpdate.isActive = true;
  }

  surveyToUpdate?.save();

  res.status(201).json({
    status: 'success',
    data: {
      surveyToUpdate,
    },
  });
});

export { createSurveyTemplate, activateSurvey };
