
import joi from 'joi';

export  const createEventValidator=(event)=>{
    const createPostValidatorSchema=joi.object({
        EventName: joi.string().required(),
        Description: joi.string().required(),
        Location: joi.string().required(),
        EventPosterURL: joi.string().required(),
        EventDate: joi.string().required()
    })

    return createPostValidatorSchema.validate(event);
}
    
export  const updateEventValidator=(updatedEvent)=>{
    const updateEventValidatorSchema=joi.object({
        Description: joi.string().required(),
        EventDate: joi.string().required(),
        EventPosterURL: joi.string().required(),
        Location: joi.string().required()

    })

    return updateEventValidatorSchema.validate(updatedEvent);
}

export  const updateEventNameValidator=(updatedEventName)=>{
    const updateEventNameValidatorSchema=joi.object({
        EventName: joi.string().required()

    })

    return updateEventNameValidatorSchema.validate(updatedEventName);
}
    