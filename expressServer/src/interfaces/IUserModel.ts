import * as Mongoose from 'mongoose';

export interface IUser {
  userId: string;
  username: string;
  email: string;
  hashed_pwd: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends Mongoose.Document, IUser {}
