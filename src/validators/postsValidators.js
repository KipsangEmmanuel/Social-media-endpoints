
import joi from 'joi';

export  const createPostValidator=(post)=>{
    const createPostValidatorSchema=joi.object({
        Content: joi.string().required()
    })

    return createPostValidatorSchema.validate(post);
}


     


export  const updatePostValidator=(updatedpost)=>{
    const updatePostValidatorSchema=joi.object({
        Content: joi.string().required()

    })

    return updatePostValidatorSchema.validate(updatedpost);
}



export  const updateContentValidator=(updatedContent)=>{
    const updateContentValidatorSchema=joi.object({
        Content: joi.string().required()

    })

    return updateContentValidatorSchema.validate(updatedContent);
}
