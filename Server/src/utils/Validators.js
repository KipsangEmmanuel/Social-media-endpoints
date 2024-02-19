
import joi from 'joi';

export  const RegisterUserValidator=(user)=>{
    const RegisterUserValidatorSchema=joi.object({
        Username: joi.string().required(),
        Email: joi.string().email().required(),
        Password: joi.string().min(4).required(),
        TagName: joi.string().required(),
        Location: joi.string().required(),
    })

    return RegisterUserValidatorSchema.validate(user);
}


export const loginUserValidator = (user) => {
    const loginUserValidatorSchema = joi.object({
        Email: joi.string().email().required(),
        Password: joi.string().min(4).required(),
    });
    return loginUserValidatorSchema.validate(user);
}


export  const updateUserValidator=(updateduser)=>{
    const updateUserValidatorSchema=joi.object({
        Username: joi.string().required(),
        TagName: joi.string().required(),
        Location: joi.string().required(),
    })

    return updateUserValidatorSchema.validate(updateduser);
}



export  const updateUserPasswordValidator=(updateduser)=>{
    const updateUserPassValidatorSchema=joi.object({
        Password: joi.string().min(4).required(),
    })

    return updateUserPassValidatorSchema.validate(updateduser);
}
