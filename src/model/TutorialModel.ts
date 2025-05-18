import * as Mongoose from "mongoose";
import { ITutorialModel } from '../interfaces/ITutorialModel';

class TutorialModel {
    public schema: any;
    public stepsSchema: any;
    public model: any;
    public dbConnectionString: string;

    public constructor(DB_CONNECTION_STRING: string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.stepsSchema = new Mongoose.Schema(
            {
                stepNumber: Number,
                description: String,
                imageUrls: [String],
                videoUrls: [String]
            }
        );

        this.schema = new Mongoose.Schema(
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
                tutorialId: { type: String, required: true, unique: true },
                createdDate: { type: Date, default: Date.now },
                updatedDate: { type: Date, default: Date.now },
                authorId: { type: String, required: true },
                authorName: { type: String, required: true },
                category: { type: String, required: true },
                tags: { type: [String], default: [] },
                views: { type: Number, default: 0 },
                likes: { type: Number, default: 0 },
                dislikes: { type: Number, default: 0 },
                steps: [this.stepsSchema],
                published: { type: Boolean, default: false }
            },
            {
                collection: 'tutorials',
                timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }
            }
        );

    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<ITutorialModel>("Tutorial", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveAllTutorials(response: any) {
        const query = this.model.find({ published: true });
        try {
            const itemArray = await query.exec();
            response.json(itemArray);
        }
        catch (e) {
            console.error(e);
            response.status(500).json({ message: 'Error retrieving tutorials', error: e });
        }
    }

    public async retrieveTutorial(response: any, tutorialId: string) {
        const query = this.model.findOne({ tutorialId: tutorialId });
        try {
            const tutorial = await query.exec();
            if (tutorial) {
                // Increment view count
                tutorial.views += 1;
                await tutorial.save();
                response.json(tutorial);
            } else {
                response.status(404).json({ message: 'Tutorial not found' });
            }
        }
        catch (e) {
            console.error(e);
            response.status(500).json({ message: 'Error retrieving tutorial', error: e });
        }
    }

    public async createTutorial(response: any, tutorialData: any) {
        try {
            const newTutorial = new this.model(tutorialData);
            const savedTutorial = await newTutorial.save();
            response.status(201).json(savedTutorial);
        }
        catch (e) {
            console.error(e);
            response.status(400).json({ message: 'Error creating tutorial', error: e });
        }
    }
}

export { TutorialModel };