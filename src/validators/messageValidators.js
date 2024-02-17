
import joi from 'joi';

export  const createMessageValidator=(message)=>{
    const createMessageValidatorSchema=joi.object({
        Content: joi.string().required()
    })

    return createMessageValidatorSchema.validate(message);
}

export  const updateMessageValidator=(updatedmessage)=>{
    const updateMessageValidatorSchema=joi.object({
        Content: joi.string().required()

    })

    return updateMessageValidatorSchema.validate(updatedmessage);
}

export  const updateContentValidator=(updatedContent)=>{
    const updateContentValidatorSchema=joi.object({
        Content: joi.string().required()

    })

    return updateContentValidatorSchema.validate(updatedContent);
}

