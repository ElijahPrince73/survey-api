import mongoose from 'mongoose';

const { Schema } = mongoose;

const answerSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  response: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

const SurveyResponseSchema = new Schema({
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SurveyTemplate',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  answers: [answerSchema],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const SurveyResponse = mongoose.model('SurveyResponse', SurveyResponseSchema);

export default SurveyResponse;
