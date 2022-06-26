 //create express application
 const exp=require('express');
 const app=exp();
 const mclient=require("mongodb").MongoClient;
 const cors = require('cors');

 app.use(cors());
 
 // //import dotenv
 // require('dotenv').config();
 
//import path module
  const path=require('path');
 
//connect build of reactapp with nodejs
app.use(exp.static(path.join(__dirname,'./build')));
 //connecting DB url
 //const DBurl="mongodb://frontendproject:frontendproject@cluster0-shard-00-00.uf8he.mongodb.net:27017,cluster0-shard-00-01.uf8he.mongodb.net:27017,cluster0-shard-00-02.uf8he.mongodb.net:27017/?ssl=true&replicaSet=atlas-mzh61n-shard-0&authSource=admin&retryWrites=true&w=majority";
   const DBurl="mongodb://calcproject:calcproject@cluster0-shard-00-00.uf8he.mongodb.net:27017,cluster0-shard-00-01.uf8he.mongodb.net:27017,cluster0-shard-00-02.uf8he.mongodb.net:27017/?ssl=true&replicaSet=atlas-mzh61n-shard-0&authSource=admin&retryWrites=true&w=majority";
 
 //connect with mongodb server
 mclient.connect(DBurl)
 .then((client)=>{
     
     //get db object
     let dbObj=client.db("projectdb");
     //let dbObj=client.db("frontprojectdb");
 
     //create collection objects
     //let calcCollectionObject=dbObj.collection("calcollection");
     let projectCollectionObject=dbObj.collection("projectcollection");
     
     //sharing collection objects to API's
     //app.set("calcCollectionObject",calcCollectionObject);
     app.set("projectCollectionObject",projectCollectionObject);
 
     console.log("DB connection success");
     
 })
 .catch(err=>console.log("Error in DB connection is ",err));



 const userApp = require('./APIS/history');
 app.use('/history',userApp);


 app.use('*',(request,response)=>{
  response.sendFile(path.join(__dirname,'./build/index.html'));
})


app.listen(4000, ()=> console.log("server listening on port 4000.."));
 