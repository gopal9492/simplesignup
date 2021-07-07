const joi=require('joi');

const schema={
    usersignup: joi.object({
        firstname:joi.string().min(1).max(30).required(),
        lastname:joi.string().min(1).max(30).required(),
        email:joi.string().email().required(),
        password:joi.string().required()
    }),
    usersignin:joi.object({
        email:joi.string().email().required(),
        password:joi.string().required()
    })
}
module.exports=schema;