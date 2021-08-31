import express from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";
import {pollRouter} from "./routes/poll.js"
import {userRouter} from "./routes/user.js"
import cors from "cors"


dotenv.config();

const app = express();

const PORT=process.env.PORT;

app.use(express.json());

app.use(cors()); 



app.use('/poll',pollRouter);
app.use('/user',userRouter);



app.listen(PORT,()=>console.log("the server started",PORT));

app.get("/",(request,response)=>{
    response.send("welcome to app");
});



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


   


