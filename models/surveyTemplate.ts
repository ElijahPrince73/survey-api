import mongoose from 'mongoose';

const { Schema } = mongoose;

const questionSchema = new Schema({
  questionText: String,
  questionType: {
    type: String,
    enum: ['text', 'multipleChoice', 'rating'],
    required: [true, 'Please provide a question type'],
  },
  order: {
    type: Number,
  },
});

const surveyTemplateSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  questions: [questionSchema],
  createdBy: String,
  createAt: {
    default: Date.now(),
  },
});

const SurveyTemplate = mongoose.model('SurveyTemplate', surveyTemplateSchema);

export default SurveyTemplate;
