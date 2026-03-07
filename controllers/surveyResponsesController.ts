import SurveyResponse from "../models/surveyResponse";

import AppError from '../utils/appError.ts';
import catchAsync from "../utils/catchAsync";

const createSurveyResponse = catchAsync(async (req, res, next) => {
  const { surveyId } = req.params;
    const { _id } = req.user;
  const { answers } = req.body;
  
  const surveyResponses = await SurveyResponse.find({ surveyId, userId: _id });

  if (surveyResponses.length > 0) {
    return next(new AppError('You have already submitted a response for this survey.', 400));
  }

  const newSurveyResponse = await SurveyResponse.create({
    userId: _id,
    surveyId: surveyId,
    answers,
  });

  res.status(201).json({
    status: "success",
    data: {
      newSurveyResponse,
    },
  });
});

const getSurveyResponses = catchAsync(async (req, res) => {
  const surveyResponses = await SurveyResponse.find();

  res.status(200).json({
    status: "success",
    results: surveyResponses.length,
    data: surveyResponses,
  });
});

export { createSurveyResponse, getSurveyResponses };