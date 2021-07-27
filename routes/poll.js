import { getPolls, getPollById, deletePollById, insertPoll ,updatePollById} from "../helper.js";

import {createConnection} from "../index.js";
import express from 'express';
import {auth} from "../middleware/auth.js"


const router=express.Router();



router
.route("/")
.get( auth,async (request,response)=>{
    const client=await createConnection();
    const contestants=await getPolls(client,{});
    response.send(contestants);
 }).post(auth,async (request,response)=>{

    const client=await createConnection();
    const polls=request.body;
    const contestant=await insertPoll(client,polls);
    response.send(contestant);
    
});
router
.route("/:id")
.get(auth,async (request,response)=>{
    const id = request.params.id;
    const client=await createConnection();
    const contestant=await getPollById(client,id);
    response.send(contestant);
    
}).patch(auth,async (request,response)=>{
    const id = request.params.id;
    const client=await createConnection();
    const newPoll=request.body;
    const contestant=await updatePollById(client,id,newPoll);
    response.send(contestant);
    
})
.delete(auth,async (request,response)=>{
    const id = request.params.id;
    const client=await createConnection();
    const contestant=await deletePollById(client,id);
    response.send(contestant);
    
});
router.get("/content/:search",auth,async (request,response)=>{
    const search = request.params.search;
    const client=await createConnection();
    const contestants=await getPolls(client,{content:{$regex:search , $options:"i"}});
    response.send(contestants);
 });
router.get("/name/:companyname", auth,async (request,response)=>{
    const companyname = request.params.companyname;
    const client=await createConnection();
    const contestants=await getPolls(client,{company:companyname});
    response.send(contestants);
 });





export const pollRouter=router;
