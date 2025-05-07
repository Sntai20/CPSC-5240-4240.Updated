HowTo Website - Backend API and DB test instructions:

* Step 0: Navigate into the HowTo directory and create db directory if it does not exist
    > cd HowTo
    > mkdir db

* Step 1: Run MongoDB database:
    - For Windows (bash)
    > mongod --port 3000 --dbpath=".\db" 

    - For Mac (zsh)
    > mongod --port 3000 --dbpath= ./db

* Step 2: Install Node
    > npm install

* Step 3: Seed the database with population data
    > node createDb/createSampleData.js
    >mongosh "C:\Users\meher\SU-CLASSES\SAAS_class\project\CPSC-5240-4240.Updated\HowToMongooseDB\createDB\createSampleData.js"

    run mongosh --port 3000 (shell to retrieve the data from db and check ) 
    use tutorialPlatform
    db.tutorials.find().pretty()
    db.comments.find().pretty()

    run node AppServer.js and open localhost 8080 to see the webpage 

* Step 4: Compile and generate node/express server
    > npx tsc AppServer.ts

* Step 5: Run node server on port 8080
    > node AppServer.js

Hifi Screen - Home Page
> http://localhost:8080/

Routes (To test in POSTMAN):
Tutorial - GET all / POST
> http://localhost:8080/app/tutorials

Tutorial - GET by ID
> http://localhost:8080/app/tutorials/{tutorialId}

Comments - GET all / POST
> http://localhost:8080/app/comments

Comments - GET by ID
> http://localhost:8080/app/comments/{commentID}