import { Schema, model } from 'mongoose';

interface User {
  twitterId: string;
  profile: Record<string, unknown>;
  token: Record<string, unknown>;
  tokenSecret: Record<string, unknown>;
}

const userSchema = new Schema<User>({
  twitterId: String,
  profile: {},
  token: {},
  tokenSecret: {},
});

export const User = model('User', userSchema);
