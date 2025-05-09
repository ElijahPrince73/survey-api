import mongoose from 'mongoose';
import { isEmail } from 'validator';

const { Schema } = mongoose;

const userSchema = new Schema({
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
  },
});

const User = mongoose.model('User', userSchema);

export default User;
