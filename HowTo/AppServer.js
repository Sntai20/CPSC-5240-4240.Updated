"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
var App_1 = require("./App");
dotenv.config();
var port = process.env.PORT;
var dbUser = process.env.DB_USER;
var dbPassword = process.env.DB_PASSWORD;
var mongoDBConnection = 'mongodb://' + process.env.DB_INFO;
if (dbUser && dbPassword) {
    mongoDBConnection = 'mongodb://' + dbUser + ':' + encodeURIComponent(dbPassword) + '@' + process.env.DB_INFO;
}
console.log("server db connection URL " + mongoDBConnection);
var server = new App_1.App(mongoDBConnection).expressApp;
server.listen(port);
console.log("server running in port " + port);
