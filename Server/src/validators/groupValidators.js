
import joi from 'joi';

export  const createGroupValidator=(group)=>{
    const createGroupValidatorSchema=joi.object({
        GroupName: joi.string().required(),
        Description: joi.string().required()
        })

    return createGroupValidatorSchema.validate(group);
}

export  const updateGroupValidator=(updatedGroup)=>{
    const updateGroupValidatorSchema=joi.object({
        GroupName: joi.string().required(),
        Description: joi.string().required()

    })
    return updateGroupValidatorSchema.validate(updatedGroup);
}



export  const updateGroupNameValidator=(GroupName)=>{
    const updateGroupNameValidatorSchema=joi.object({
        GroupName: joi.string().required()

    })

    return updateGroupNameValidatorSchema.validate(GroupName);
}