import User from '../models/userModel.ts';
import jwt from 'jsonwebtoken';

import AppError from '../utils/appError.ts';
import catchAsync from '../utils/catchAsync.ts';

const signtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const createSendtoken = (user, statusCode, res) => {
  const token = signtoken(user._id);

  const cookieOptions = {
    httpOnly: true,
    secure: false,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  user.password = undefined;

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'Success',
    token,
    data: {
      user,
    },
  });
};

const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    role,
  });

  createSendtoken(newUser, 201, res);
});

export { signUp };
