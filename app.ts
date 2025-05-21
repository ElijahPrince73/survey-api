import express from 'express';
import morgan from 'morgan';
const app = express();

// import user from './routes/userRoutes.ts';
import authenthication from './routes/authRoutes.ts';

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

export default app;
