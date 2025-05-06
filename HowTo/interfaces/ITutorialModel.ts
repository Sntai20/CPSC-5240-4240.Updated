import * as Mongoose from 'mongoose';

interface IStep {
  stepNumber: number;
  description: string;
  imageUrls: string[];
  videoUrls: string[];
}

export interface ITutorial {
  title: string;
  description: string;
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

export interface ITutorialModel extends Mongoose.Document, ITutorial{

}

// interface IStep extends Mongoose.Document {
//     stepNumber: number;
//     description: string;
//     imageUrls: string[];
//     videoUrls: string[];
//   }
  
//   export interface ITutorialModel extends Mongoose.Document {
//     title: string;
//     // description: string;
//     // tutorialId: string;
//     // createdDate: Date;
//     // updatedDate: Date;
//     // authorId: string;
//     // authorName: string;
//     // category: string;
//     // tags: string[];
//     // views: number;
//     // likes: number;
//     // dislikes: number;
//     // steps: IStep[];
//     // published: boolean;
//   }
  
 