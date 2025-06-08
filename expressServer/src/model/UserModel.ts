import * as Mongoose from 'mongoose';
import { IUserModel } from '../interfaces/IUserModel';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

class UserModel {
  public schema: Mongoose.Schema;
  public model: Mongoose.Model<IUserModel>;
  private dbConnectionString: string;

  constructor(DB_CONNECTION_STRING: string) {
    this.dbConnectionString = DB_CONNECTION_STRING;
    this.createSchema();
    this.createModel();
  }

  private createSchema(): void {
    this.schema = new Mongoose.Schema(
      {
        userId: { type: String, default: () => uuidv4().replace(/-/g, ''), unique: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        hashed_pwd: { type: String, required: true },
      },
      {
        collection: 'users',
        timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }
        }
    );
  }

  public async createModel(): Promise<void> {
    try {
      await Mongoose.connect(this.dbConnectionString);
      this.model = Mongoose.model<IUserModel>('User', this.schema);
    } catch (e) {
      console.error('Error creating user model:', e);
    }
  }

  public hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('base64');
  }

  public async createUser(userData: any, response: any): Promise<void> {
    try {
      userData.hashed_pwd = this.hashPassword(userData.password);
      delete userData.password;
      const newUser = new this.model(userData);
      const result = await newUser.save();
      response.status(201).json({username: result.username, email: result.email, createdDate: result.createdDate});
    } catch (err) {
      console.error('User creation failed:', err);
      response.status(400).json({ message: 'Error creating user', error: err });
    }
  }

  public async loginUser(req: any, res: any): Promise<void> {
    const { username, password } = req.body;
    try {
      const user = await this.model.findOne({ username }).exec();
      if (!user) {
        res.status(401).json({ message: 'User not found' });
      } else if (user.hashed_pwd === this.hashPassword(password)) {
        // Send back session cookies
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    } catch (err) {
      console.error('User login failed:', err);
      res.status(500).json({ message: 'Login error', error: err });
    }
  }
  
  public async findUserByUsername(username: string): Promise<IUserModel | null> {
    return await this.model.findOne({ username }).exec();
  }
  
  public async retrieveAllUsers(response: any): Promise<void> {
    try {
        const users = await this.model.find().select('username email points createdDate updatedDate').exec();
        response.json(users);
    } catch (error) {
        response.status(500).json({ message: 'Error retrieving users', error });
    }
  }
}

export { UserModel };
