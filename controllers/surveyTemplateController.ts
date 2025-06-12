import SurveyTemplate from '../models/surveyTemplate.ts';

import AppError from '../utils/appError.ts';
import catchAsync from '../utils/catchAsync.ts';

const createTour = catchAsync(async (req, res, next) => {
  const { title, description, questions, isActive } = req.body;
  const { _id } = req.user;

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

export { createTour };
