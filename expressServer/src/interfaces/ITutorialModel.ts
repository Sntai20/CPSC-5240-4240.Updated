import * as Mongoose from 'mongoose';

interface IStep {
  stepNumber: number;
  title: string;
  text: string;
  imageUrls: string[];
  videoUrls: string[];
}

export interface ITutorial {
  title: string;
  text: string;
  tutorialId: string;
  createdDate: Date;
  updatedDate: Date;
  authorId: string;
  authorName: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  dislikes: number;
  steps: IStep[];
  published: boolean;
}

export interface ITutorialModel extends Mongoose.Document, ITutorial {

}