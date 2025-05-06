run mongod --port 3000 --dbpath="C:\data\db" (similar to start.toDoSample.cmd) depends where your mongodb data file is present 
>mongosh "C:\Users\meher\SU-CLASSES\SAAS_class\project\CPSC-5240-4240.Updated\HowToMongooseDB\createDB\createSampleData.js"
run mongosh (shell to retrieve the data from db and check ) 
 use tutorialPlatform
 db.tutorials.find().pretty()
 db.comments.find().pretty()

run node AppServer.js and open localhost 8080 to see the webpage 

----
working till here but there are some errors between the appserver.js server and database 
once that is fixed its possible to retrive data from database to the frontend UI without mongoshell 

yet to test the rest api endpoints on postman 