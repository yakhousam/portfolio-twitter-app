import { IUser } from '@yak-twitter-app/types';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<IUser>({
  twitterId: String,
  profile: {},
  token: String,
  tokenSecret: String,
});

export const User = model('User', userSchema);
