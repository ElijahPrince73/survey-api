import express from 'express';
import morgan from 'morgan';
const app = express();

// import user from './routes/userRoutes.ts';
import authenthication from './routes/authRoutes.ts';
import surveys from './routes/survey.ts';

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

app.use('/api/v1/authentication', authenthication);
app.use('/api/v1/surveys', surveys);

export default app;
