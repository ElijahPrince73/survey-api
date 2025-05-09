import express from 'express';
import morgan from 'morgan';
const app = express();

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

export default app;
