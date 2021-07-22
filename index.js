import express from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT=5000;


   async function createConnection (){
       const MONGO_URL=process.env.MONGO_URI;
       const client = new MongoClient(MONGO_URL);

       try{
           await client.connect();
           console.log("successfully connected");
           return client;
          
       }
       catch(err) {
           console.log(err);

       }
   }

   async function getPolls(client,filter)
   {
    const result=await client.db("contestant").collection("poll").find(filter).toArray();
    console.log("successfully found all contentant",result);
    return result;
   }
   
 

   async function getPollById(client,id)
   {
    const result=await client.db("contestant").collection("poll").findOne({id:id});
    console.log("successfully found poll by id",result);
    return result;
   }

   app.get("/",(request,response)=>{
    response.send("welcome to app");
});
   
 app.get("/poll", async (request,response)=>{
    const client=await createConnection();
    const contestants=await getPolls(client,{});
    response.send(contestants);
 });

app.get("/poll/content/:search", async (request,response)=>{
    const search = request.params.search;
    const client=await createConnection();
    const contestants=await getPolls(client,{content:{$regex:search , $options:"i"}});
    response.send(contestants);
 });


 app.get("/poll/name/:companyname", async (request,response)=>{
    const companyname = request.params.companyname;
    const client=await createConnection();
    const contestants=await getPolls(client,{company:companyname});
    response.send(contestants);
 });

app.get("/poll/:id", async (request,response)=>{
    const id = request.params.id;
    const client=await createConnection();
    const contestant=await getPollById(client,id);
    response.send(contestant);
    
});

app.listen(PORT,()=>console.log("the server started",PORT));
console.log("pk");