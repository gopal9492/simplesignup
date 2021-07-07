const {usersignup,usersignin}=require('./userschema');
module.exports={
    addUserValidation:async(req,res,next)=>{
        const value=await usersignup.validate(req.body);
        if(value.error){
            res.json({
                success :0,
                message: value.error.details[0].message
            })
        }
        else{
            next();
        }
    },
    userValidation:async(req,res,next)=>{
        const value=await usersignin.validate(req.body);
        if(value.error){
            res.json({
                success :0,
                message: value.error.details[0].message
            })
        }
        else{
            next();
        }
    }
}