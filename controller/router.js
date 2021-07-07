const express=require('express');
const route=express.Router();
const user=require('../model/signup');
const {addUserValidation,userValidation}=require('../validations/uservalidation');
route.post('/signup',addUserValidation,async (req,res)=>{
    const {firstname,lastname,email,password}=req.body;
    // if((firstname==null) || (lastname==null) ||( email ==null) || (password == null)){
    //     res.send("The data is not allowed null ")
    //     }
    // else if((firstname.length===0)||(lastname.length===0) ||( email.length===0) || (password.length===0)){
    //     res.send("The email length is not allowed zero")
    // }  
    const deviceid=req.body.deviceid || " ";
    const appid=req.body.appid || " "
 
        await user.findOne({ email:email }).then(user => {
            if (user){
                res.send("the user is already exist")
                return res.status(400).json(errors);
            }
        })
        const newuser=await new user({firstname, lastname,email,password, deviceid,appid} )
        await newuser.save();
        return res.send("profile is added..")
})
route.post('/signin',userValidation,(req,res)=>{
        const {email,password}=req.body;
    //    if(( email ==null) || (password == null)){
    //         res.send("The data is not allowed null ")
    //         }
    //     else if(( email.length===0) || (password.length===0)){
    //         res.send("The email length is not allowed zero")
    //     }  
         user.findOne({ email:req.body.email }).then(user => {
            if (!user){
                res.send("the email id is wrong")
            }
            else if(password == user.password){
                res.send(user);
            }
            else{
                res.send("password is not matched")
            }
        })
       
})
module.exports=route;