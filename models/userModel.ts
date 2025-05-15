import mongoose from 'mongoose';
import pkg from 'validator';
const { isEmail } = pkg;

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Please provide an email'],
    validate: [isEmail, 'Please provide a valid email'],
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minLength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === el.password;
        },
        message: 'Passwords must match',
      },
    },
  },
});

const User = mongoose.model('User', userSchema);

export default User;
