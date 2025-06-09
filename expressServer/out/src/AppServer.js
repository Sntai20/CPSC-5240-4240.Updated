"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const App_1 = require("./App");
dotenv.config();
const port = process.env.PORT || 8080;
const dbPort = 3000;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbProtocol = process.env.DB_PROTOCOL || 'mongodb://';
const dbInfo = process.env.DB_INFO || `127.0.0.1:${dbPort}/tutorialPlatform`;
let mongoDBConnection = 'mongodb://' + process.env.DB_INFO;
if (dbUser && dbPassword) {
    mongoDBConnection = `${dbProtocol}${dbUser}:${dbPassword}@${dbInfo}`;
}
console.log("server db connection URL " + mongoDBConnection);
const server = new App_1.App(mongoDBConnection).expressApp;
server.listen(port);
console.log("server running in port " + port);
//# sourceMappingURL=AppServer.js.map