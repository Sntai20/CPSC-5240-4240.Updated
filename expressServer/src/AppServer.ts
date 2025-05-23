import * as dotenv from 'dotenv';
import { App } from './App';

dotenv.config();

const port = process.env.PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
let mongoDBConnection = 'mongodb://' + process.env.DB_INFO;
if (dbUser && dbPassword) {
    mongoDBConnection = 'mongodb://' + dbUser + ':' + encodeURIComponent(dbPassword) + '@' + process.env.DB_INFO;
}
console.log("server db connection URL " + mongoDBConnection);

const server: any = new App(mongoDBConnection).expressApp;
server.listen(port);
console.log("server running in port " + port);