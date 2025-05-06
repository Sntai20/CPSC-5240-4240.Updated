import * as Mongoose from "mongoose";
import { ICommentModel } from "../interfaces/ICommentModel";

class CommentModel {
  public schema: Mongoose.Schema;
  public model: Mongoose.Model<ICommentModel & Mongoose.Document>;
  private dbConnectionString: string;

  constructor(DB_CONNECTION_STRING: string) {
    this.dbConnectionString = DB_CONNECTION_STRING;
    this.createSchema();
    this.createModel();
  }

  public createSchema(): void {
    this.schema = new Mongoose.Schema(
      {
        commentId:        { type: String, required: true },
        tutorialId:       { type: String, required: true },
        userId:           { type: String, required: true },
        userName:         { type: String, required: true },
        content:          { type: String, required: true },
        createdDate:      { type: Date,   default: Date.now },
        isAmendment:      { type: Boolean, default: false },
        amendmentDetails: {
          stepNumber:     { type: Number },
          proposedChange: { type: String },
        },
        likes:            { type: Number, default: 0 },
        parentCommentId:  { type: String, default: null },
      },
      { collection: "comments" }
    );
  }

  public async createModel(): Promise<void> {
    try {
      await Mongoose.connect(this.dbConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      this.model = Mongoose.model<ICommentModel & Mongoose.Document>(
        "Comment",
        this.schema
      );
    } catch (e) {
      console.error("Mongo connection error:", e);
    }
  }

  /** Retrieve all comments, newest first */
  public async retrieveAll(response: any): Promise<void> {
    try {
      const docs = await this.model.find().sort({ createdDate: -1 }).exec();
      response.json(docs);
    } catch (e) {
      console.error(e);
      response.status(500).json({ message: "Error retrieving comments" });
    }
  }

  /** Retrieve one comment by its commentId */
  public async retrieveByID(response: any, commentId: string): Promise<void> {
    try {
      const doc = await this.model.findOne({ commentId }).exec();
      if (doc) {
        response.json(doc);
      } else {
        response.status(404).json({ message: "Comment not found" });
      }
    } catch (e) {
      console.error(e);
      response.status(500).json({ message: "Error retrieving comment" });
    }
  }

  /** Create a new comment */
  public async createComment(response: any, data: ICommentModel): Promise<void> {
    try {
      const newComment = new this.model(data);
      const result     = await newComment.save();
      response.status(201).json(result);
    } catch (e) {
      console.error(e);
      response.status(400).json({ message: "Error creating comment", error: e });
    }
  }
}

export { CommentModel };
