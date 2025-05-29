import * as dotenv from 'dotenv';
import { App } from './App';

dotenv.config();

const port = process.env.PORT || 3000;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbProtocol = process.env.DB_PROTOCOL || 'mongodb://';
const dbInfo = process.env.DB_INFO || '127.0.0.1:3000/tutorialPlatform';
if (!port) {
    throw new Error("PORT environment variable is not set");
}
let mongoDBConnection = 'mongodb://' + process.env.DB_INFO;
if (dbUser && dbPassword) {
    mongoDBConnection = 'mongodb://' + dbUser + ':' + encodeURIComponent(dbPassword) + '@' + process.env.DB_INFO;
    // `${DB_PROTOCOL}${DB_USER}:${DB_PASSWORD}@${DB_INFO}`;
}
console.log("server db connection URL " + mongoDBConnection);

const server: any = new App(mongoDBConnection).expressApp;
server.listen(port);
console.log("server running in port " + port);