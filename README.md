# HowTo Website

1. Run and seed the Mongo database with sample data.
1. Build and run the Backend API.
1. Test the API calls to the database.

## Database setup guide

Starting from the `repository root` directory, setup and run the Mongo database.

### Start the MongoDB Database

Select your operating system to start the MongoDB database:

<details>
<summary>Windows</summary>

```powershell
# Run MongoDB database on Windows
. ./startDbServer.cmd
```

</details>

<details>
<summary>Linux/Mac</summary>

```bash
# Make the script executable and run MongoDB database on Linux/Mac
chmod +x start.DbServer.sh
./start.DbServer.sh
```

</details>

### Connect and Populate the database

Open a new terminal and connect to the database using the database client.

Select your operating system to start the MongoDB client:

<details>
<summary>Windows</summary>

```powershell
# Run database client on Windows
. ./startDbClient.admin.cmd
```

</details>

<details>
<summary>Linux/Mac</summary>

```bash
# Run database client on Linux/Mac
mongo --port 3000 --authenticationDatabase admin
```

</details>

Once connected to the database, run the following commands to populate the demo data.

```bash
load ('src/createDB/createSampleData.js');

show dbs
use tutorialPlatform
show collections
db.tutorials.find()
db.comments.find()

load ('src/createDB/createAdminUser.js');
show users
exit
```

## Backend API build and run

Starting from the `repository root` directory, install npm packages, compile the node server, and run the node server.

```bash
# Install the npm packages
npm install

# Compile the node server and copy the pages to out/src/pages
npm run build

# Run node server on port 8080
npm run start
```

## Test API Guide

Test the API calls to the database.

Hifi Screen - [Home Page](http://localhost:8080/)

### Routes (To test in POSTMAN)

Tutorial - [GET all / POST](http://localhost:8080/app/tutorials) - `/app/tutorials`

Tutorial - [GET by Id](http://localhost:8080/app/tutorials/{tutorialId}) - `/app/tutorials/{tutorialId}`

Comments - [GET all / POST](http://localhost:8080/app/comments) - `/app/comments`

Comments - [GET by Id](http://localhost:8080/app/comments/{commentId}) - `/app/comments/{commentId}`

## Clean

```bash
rm -rf out
rm -rf node_modules
```

## Project Structure

The HowTo project uses a standard Node.js project structure for a REST API. Since there is only one project, the project root is also the repository root.

```text
project-root/
├── node_modules/
├── out/
├── src/
│   ├── controllers/
│       ├── example.controller.ts
│   ├── models/
│       ├── example.model.ts
│   ├── routes/
│       ├── example.route.ts
│   ├── services/
│       ├── example.service.ts
│   ├── app.ts
│   └── server.ts
├── test/
│   ├── unit/
│   └── integration/
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```
