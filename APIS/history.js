//create router to get user api.js file
const exp=require("express");
const userApp=exp.Router();
const expressAsyncHandler=require('express-async-handler');

userApp.use(exp.json())

//create REST API
//create route to handle './getusers' path
userApp.get('/getAllData',expressAsyncHandler(async (request,response)=>{
    //get usercollectionobject
    let projectCollectionObject=request.app.get("projectCollectionObject");
    //read all users
    let history = await projectCollectionObject.find().toArray();
    //send response
    response.send({message:"Total History:  ",payload: history});
}));


userApp.post('/createobject',expressAsyncHandler(async(request,response)=>{
  let projectCollectionObject=request.app.get("projectCollectionObject");
  //get userobj from client
  let histObj = request.body;
  await projectCollectionObject.insertOne(histObj);
  response.send({message:"Object Creation Success"});
}));


module.exports=userApp;