const express=require('express');
const route=express.Router();
const user=require('../model/signup');
const {addUserValidation,userValidation}=require('../validations/uservalidation');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

route.post('/signup',addUserValidation,async (req,res)=>{
    const {firstname,lastname,email,password}=req.body;

    const deviceid=req.body.deviceid || " ";
    const appid=req.body.appid || " "
    const hashemail=await bcrypt.hashSync(email,salt);
    const hashpsw=await  bcrypt.hashSync(password, salt);
        await  user.findOne({ email:email}).then(user => {
            if (user){
                res.send("the user is already exist")
                return res.status(400).json(errors);
            }
        })
        const newuser= await new user({firstname, lastname,email:hashemail,password:hashpsw, deviceid,appid} )
       await newuser.save();
        return res.send("profile is added..")
})
route.post('/signin',userValidation,async (req,res)=>{
        const {email,password}=req.body;
        const hashemail=await bcrypt.hashSync(email,salt);
          user.findOne({ email:hashemail}).then(user => {
            const isMatch=  bcrypt.compare(password,user.password);
            if (!user){
                return res.send("the email id is wrong")
            }
            
          else if(!isMatch){
                return res.send("the password is wrong")
             }
            else {
                res.send(user);
            }
            
       })
 
       
})
module.exports=route;