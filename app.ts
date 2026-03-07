import express from 'express';
import morgan from 'morgan';
const app = express();

// import user from './routes/userRoutes.ts';
import authenthication from './routes/authRoutes.ts';
import surveysTemplate from './routes/surveyTemplate.ts';
import surveyResponse from './routes/surveyResponses.ts';

// Dev Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body to req.body
app.use(
  express.json({
    limit: '10kb',
  }),
);

app.use('/api/authentication', authenthication);
app.use('/api/surveys', surveysTemplate, surveyResponse);

export default app;
