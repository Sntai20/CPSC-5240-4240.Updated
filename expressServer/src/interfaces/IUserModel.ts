import { UUID } from 'crypto';
import { IntegerType } from 'mongodb';
import * as Mongoose from 'mongoose';

export interface IUser {
  userId: string;
  username: string;
  email: string;
  hashed_pwd: string;
  points: number;
  createdDate: Date;
  updatedDate: Date;
}

export interface IUserModel extends Mongoose.Document, IUser {}
