import express from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";
import {pollRouter} from "./routes/poll.js"
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const PORT=process.env.PORT;

app.use(express.json());



export async function createConnection (){
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

app.get("/",(request,response)=>{
    response.send("welcome to app");
});
   
    
app.use('/poll',pollRouter);



app.listen(PORT,()=>console.log("the server started",PORT));

async function genPassword(password){
    
    const salt=await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    console.log(hashedPassword);
}
genPassword("password@123");