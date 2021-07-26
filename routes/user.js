import {  insertUser,getUsers ,getUser} from "../helper.js";

import {createConnection} from "../index.js";
import express from 'express';
import bcrypt from "bcrypt";


const router=express.Router();




router
.route("/signup")
.post(async (request,response)=>{
    const { username,password }= request.body;
    const client=await createConnection();
    const hashedPassword=await genPassword(password);
    const pass=await insertUser(client,{username:username,password:hashedPassword})
    console.log(hashedPassword,pass );
    response.send(pass);
    
});

router
.route("/login")
.post(async (request,response)=>{
    const { username,password }= request.body;
    const client=await createConnection();
    const user=await getUser(client,{username:username});
    console.log(user);
    const inDbStoredPassword=user.password;
    const isMatch= await bcrypt.compare(password,inDbStoredPassword);
    if(isMatch){
        response.send({message:"successfully login"});
    }
    else{
        response.send({message:"invalid login"});

    }  
    
});


router
.route("/")
.get( async (request,response)=>{
    const client=await createConnection();
    const contestants=await getUsers(client,{});
    response.send(contestants);
});

async function genPassword(password){
    
    const salt=await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword;
}




export const userRouter=router;
