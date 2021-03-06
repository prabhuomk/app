import {  insertUser,getUsers ,getUser} from "../helper.js";

import {createConnection} from "../index.js";
import express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {auth} from "../middleware/auth.js"


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
    if(!user){
        response.send({message:"user not exits,please sign up"})
    }else{
    const inDbStoredPassword=user.password;
    const isMatch= await bcrypt.compare(password,inDbStoredPassword);
    if(isMatch){
        const token=jwt.sign({id:user._id},process.env.KEY)
        response.send({message:"successfully login",token:token});
    }
    else{
        response.send({message:"invalid login"});

    } 
} 
    
});


router
.route("/")
.get(auth, async (request,response)=>{
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
