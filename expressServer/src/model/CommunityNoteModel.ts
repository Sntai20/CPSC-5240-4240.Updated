import * as Mongoose from "mongoose";
import { ICommunityNoteModel } from "../interfaces/ICommunityNoteModel";

class CommunityNoteModel {
  public schema: Mongoose.Schema;
  public model: Mongoose.Model<ICommunityNoteModel & Mongoose.Document>;
  private dbConnectionString: string;

  constructor(DB_CONNECTION_STRING: string) {
    this.dbConnectionString = DB_CONNECTION_STRING;
    this.createSchema();
    this.createModel();
  }

  public createSchema(): void {
    this.schema = new Mongoose.Schema(
      {
        noteId: { type: String, required: true },
        tutorialId: { type: String, required: true },
        userId: { type: String, required: true },
        title: { type: String, required: true, default: '?MissingTitle?' },
        text: { type: String, required: true },
        votesDown: { type: Number, default: 0 },
        createdDate: { type: Date, default: Date.now },
        updatedDate: { type: Date, default: Date.now }
      },
      { collection: "communityNotes" }
    );
  }

  public async createModel(): Promise<void> {
    try {
      await Mongoose.connect(this.dbConnectionString);
      this.model = Mongoose.model<ICommunityNoteModel & Mongoose.Document>(
        "CommunityNote",
        this.schema
      );
    } catch (e) {
      console.error("Mongo connection error:", e);
    }
  }

  //GET all community notes
  public async retrieveAll(response: any): Promise<void> {
    try {
      const docs = await this.model.find().sort({ createdDate: -1 }).exec();
      response.json(docs);
    } catch (e) {
      console.error(e);
      response.status(500).json({ message: "Error retrieving community notes", error: e });
    }
  }

  //GET notes for a specific tutorial 
  public async retrieveByTutorialID(response: any, tutorialId: string): Promise<void> {
    try {
      const docs = await this.model.find({ tutorialId }).sort({ createdDate: -1 }).exec();
      response.json(docs);
    } catch (e) {
      console.error(e);
      response
        .status(500)
        .json({ message: "Error retrieving community notes by tutorial", error: e });
    }
  }

  //GET a single note by its noteId
  public async retrieveByID(response: any, noteId: string): Promise<void> {
    try {
      const doc = await this.model.findOne({ noteId }).exec();
      if (doc) {
        response.json(doc);
      } else {
        response.status(404).json({ message: "Community note not found" });
      }
    } catch (e) {
      console.error(e);
      response.status(500).json({ message: "Error retrieving community note", error: e });
    }
  }

  //POST a new community note
  public async createCommunityNote(response: any, data: ICommunityNoteModel): Promise<void> {
    try {
      const newNote = new this.model(data);
      const result = await newNote.save();
      response.status(201).json(result);
    } catch (e) {
      console.error(e);
      response
        .status(400)
        .json({ message: "Error creating community note", error: e });
    }
  }
}

export { CommunityNoteModel };