
import joi from 'joi';

export  const createCommentValidator=(Comment)=>{
    const createCommentValidatorSchema=joi.object({
        Content: joi.string().required()
    })

    return createCommentValidatorSchema.validate(Comment);
}


export  const updateCommentValidator=(updatedComment)=>{
    const updateCommentValidatorSchema=joi.object({
        Content: joi.string().required()

    })

    return updateCommentValidatorSchema.validate(updatedComment);
}



export  const updateContentValidator=(updatedContent)=>{
    const updateContentValidatorSchema=joi.object({
        Content: joi.string().required()

    })

    return updateContentValidatorSchema.validate(updatedContent);
}