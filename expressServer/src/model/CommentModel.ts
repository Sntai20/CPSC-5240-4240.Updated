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
        commentId: { type: String, required: true },
        noteId: { type: String, required: true },
        userId: { type: String, required: true, default: 'Anonymous User' },
        text: { type: String, required: true },
        votesUp: { type: Number, default: 0 },
        votesDown: { type: Number, default: 0 },
        createdDate: { type: Date, default: Date.now }
      },
      { collection: "comments" }
    );
  }

  public async createModel(): Promise<void> {
    try {
      await Mongoose.connect(this.dbConnectionString);
      this.model = Mongoose.model<ICommentModel & Mongoose.Document>(
        "Comment",
        this.schema
      );
    } catch (e) {
      console.error("Mongo connection error:", e);
    }
  }

  //GET all comments
  public async retrieveAll(response: any): Promise<void> {
    try {
      const docs = await this.model.find().sort({ createdDate: -1 }).exec();
      response.json(docs);
    } catch (e) {
      console.error(e);
      response.status(500).json({ message: "Error retrieving comments" });
    }
  }

  //GET all comments for specific community note
  public async retrieveByNoteID(response: any, noteId: string): Promise<void> {
    try {
      const docs = await this.model
        .find({ noteId })
        .sort({ createdDate: -1 })
        .exec();
      response.json(docs);
    } catch (e) {
      console.error(e);
      response
        .status(500)
        .json({ message: 'Error retrieving comments for note', error: e });
    }
  }

  //GET specific comment by ID
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

  //POST new comment
  public async createComment(
    response: any,
    data: ICommentModel
  ): Promise<void> {
    try {
      const newComment = new this.model(data);
      const result = await newComment.save();
      response.status(201).json(result);
    } catch (e) {
      console.error(e);
      response.status(400).json({ message: "Error creating comment", error: e });
    }
  }
}

export { CommentModel };