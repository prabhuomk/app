//we are going to plug  auth for route you want to protect


import jwt from "jsonwebtoken";

//this is how a middleware need tobe implement
//next is the function you call it once you think is everything is ok
//token is present in header
//in the header we can look for auth token whichis generally termed authorization/x-auth-token
//verifiying token
// custom middleware
export const auth=(request,response,next)=>{
    try{
    const token=request.header("x-auth-token");
    console.log(token);
    jwt.verify(token,process.env.KEY);
    next();
    }catch(err){
        response.status(401);
        response.send({err:err.message})
    }
    

}

 