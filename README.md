# HowTo Website

Node version >= 22 is used for this project.

1. Run and seed the Mongo database with sample data.
1. Build and run the Backend API.
1. Build and run the Frontend.
1. Test the API calls to the database.

## Database setup guide

Starting from the `repository root` directory, setup and run the Mongo database.

### Start the MongoDB Database

Select your operating system to start the MongoDB database:

<details>
<summary>Windows</summary>

Run MongoDB database on Windows.

```powershell
. ./startDbServer.cmd
```

</details>

<details>
<summary>Linux/Mac</summary>

Make the script executable and run MongoDB database on Linux/Mac.

```bash
chmod +x start.DbServer.sh
./start.DbServer.sh
```

</details>

### Connect and Populate the database

Open a new terminal and connect to the database using the database client.

Select your operating system to start the MongoDB client:

<details>
<summary>Windows</summary>

Run the database client on Windows.

```powershell
mongosh --port 3000 --authenticationDatabase admin
```

</details>

<details>
<summary>Linux/Mac</summary>

Run the database client on Linux/Mac.

```bash
mongo --port 3000 --authenticationDatabase admin
```

</details>

Once connected to the database, run the following commands to populate the demo data.

```bash
load ('expressServer/src/createDB/createSampleData.js');

show dbs
use tutorialPlatform
show collections
db.tutorials.find()
db.comments.find()

load ('expressServer/src/createDB/createAdminUser.js');
show users
exit
```

## Build and run the Backend and Frontend

This section combines the `Backend API` and `Frontend` sections.

Starting from the `repository root` directory, run the following commands to install npm packages, compile the node server, compile the angular server, run the backend and frontend.

```bash
npm install
npm run build
npm run start
```

## Backend API

Starting from the `repository root` directory, install npm packages, compile the node server, run the unit tests, and run the node server.

### Build

The following commands installs the npm packages, then compiles the node server and copy the pages to out/src/pages.

```bash
npm install

npm run build --workspace=expressServer
```

### Run Test

There are both unit tests and integration tests for the backend API.

#### Unit Test

To run the unit tests, this step assumes the npm packages were installed using `npm install` in the previous step.

```bash
npm run test --workspace=expressServer
```

#### Integration Test End-to-End (E2E)

To run the integration tests, this step assumes the database and API server are running.

```bash
npm run e2etest --workspace=expressServer
```

#### Manual API Calls using Postman

To test the API calls to the database, this step assumes the database and API server are running.

Tutorial - [GET all / POST](http://localhost:8080/app/tutorials) - `/app/tutorials`

Tutorial - [GET by Id](http://localhost:8080/app/tutorials/{tutorialId}) - `/app/tutorials/{tutorialId}`

Comments - [GET all / POST](http://localhost:8080/app/comments) - `/app/comments`

Comments - [GET by Id](http://localhost:8080/app/comments/{commentId}) - `/app/comments/{commentId}`

### Run the Server

The following command runs the node server on port 8080.

```bash
npm run start --workspace=expressServer
```

## Frontend

Starting from the `repository root` directory, install npm packages, compile the Angular server, run the unit tests, and run the Angular server.

### Build the frontend

The following commands installs the npm packages, then compiles the server.

```bash
npm install

npm run build --workspace=tutorial-application
```

### Run frontend Unit Test

To run the unit tests, this step assumes the npm packages were installed using `npm install` in the previous step.

```bash
npm run test --workspace=tutorial-application
```

### Run the Frontend

The following command runs the frontend server.

```bash
npm run start --workspace=tutorial-application
```

## Manual End-To-End Test Guide

To test the frontend, backend, and the database, this step assumes the frontend, backend, and database are running.

Hifi Screen - [Home Page](http://localhost:4200/)

## Clean

The following command removes the database files, the node_modules directory, and the compiled node server.

```bash
npm run clean --workspace=expressServer
```

## Install MongoDB shell

Select your operating system to install the MongoDB shell.

<details>
<summary>Windows</summary>

Install the MongoDB shell on Windows using winget.

```powershell
winget install -e --id MongoDB.Shell
```

</details>

<details>
<summary>Linux/Mac</summary>

Install the MongoDB shell on Linux/Mac using brew.

```bash
brew install mongosh
```

</details>

## Connect to the Azure Mongo database

```bash
mongosh "mongodb+srv://tutorialplatformcluster.utubbq2.mongodb.net/" --apiVersion 1 --username dbAdmin --password test
```

## Azure

### Prerequisites

- Update the .env file to use Azure.
- Comment out the .gitignore /dist and **/[Oo]ut/* entries.

### Publish application to Azure

Starting from the `repository root` directory, run the following commands to install npm packages, compile the node server, compile the angular server, run the backend and frontend.

- Compile and move the tutorial-application/dist folder and contents to expressServer/src/dist
- Add the remote link to the App Service, then push the committed changes in the branch to the master branch used by the App Service.

```bash
npm install
npm run build

git remote add azure https://tutorialplatformmac-f0e4a3faemd4b4e5.scm.westus-01.azurewebsites.net:443/tutorialplatformmac.git
git push azure personal/ansantan/Step-Up-PR5:master
```

### Clean up

- Update the .env file to use local.
- Uncomment the .gitignore /dist and **/[Oo]ut/* entries.

## Project Structure

The expressServer project uses a standard Node.js REST API project structure.

```text
Repository-Root/
│
├── expressServer/ (project-root)
│   ├── node_modules/
│   ├── out/ (The compiled server runs from the out directory.)
│   │   ├── src/
│   │       ├── pages/
│   │       ├── App.js
│   │       ├── AppServer.js
│   ├── src/
│   │   ├── model/
│   │       ├── example.model.ts
│   │   ├── routes/
│   │       ├── example.route.ts
│   │   ├── App.ts
│   │   └── AppServer.ts
│   ├── test/
│   │   ├── unit/
│   │   ├── integration/
│   ├── package.json
│   └── tsconfig.json
│
├── tutorial-application/ (project-root)
│   ├── public/
│   ├── src/
│   │   ├── app/
│   ├── package.json
│   └── tsconfig.json
│
├── package.json
├── start.DbServer.cmd
├── start.DbServer.sh
├── .gitignore
└── README.md
```
