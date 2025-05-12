import User from '../models/userModel.ts';
import catchAsync from '../utils/catchAsync.ts';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.ts';

const signUp = catchAsync((req, res, next) => {
  res.send('SignUp');
});

export { signUp };
