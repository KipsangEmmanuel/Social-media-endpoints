import joi from 'joi';

export  const createFriendshipValidator=(friendship)=>{
    const createFriendshipValidatorSchema=joi.object({
        User1ID: joi.string().required(),
        User2ID: joi.string().required()
    })

    return createFriendshipValidatorSchema.validate(friendship);
}

