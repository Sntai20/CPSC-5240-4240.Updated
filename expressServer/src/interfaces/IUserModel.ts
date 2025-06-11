import * as Mongoose from 'mongoose';

export interface IUser {
  userId: string;
  username: string;
  email: string;
  hashed_pwd: string;
  points: number;
  createdDate: Date;
  updatedDate: Date;
  googleId: string; // Optional field for Google authentication
}

export interface IUserModel extends Mongoose.Document, IUser {}
