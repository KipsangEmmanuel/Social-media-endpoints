import {v4} from 'uuid'
import { notAuthorized, sendCreated, sendDeleteSuccess, sendServerError} from "../helpers/helperFunctions.js"
import { createFriendshipValidator } from '../validators/FriendshipValidator.js';
import { checkExistingFriendshipService, createFriendshipService, deleteFriendshipServices, getAllFriendshipsService, getAlluserFriendsService, getSingleFriendshipServices, updateFriendshipService } from '../services/FriendshipService.js';


export const createFriendshipController = async (req, res) => {
    try {

      const {User1ID,User2ID } = req.body;
      console.log(req.body);
      const existingFriendship = await checkExistingFriendshipService(User1ID, User2ID);
      console.log(existingFriendship);
      if (existingFriendship.rowsAffected>0) {
        return res.status(400).send({message:"The two users are already friends."});
      }else{
        const FriendshipID = v4();
        const { error } = createFriendshipValidator(req.body);
        console.log("error",error);
        if (error) {
          return res.status(400).send(error.details[0].message);
        } else {
          const FriendshipDate = new Date();    
          const createdFriendship = { FriendshipID, User1ID,User2ID,FriendshipDate};
    
          const result = await createFriendshipService(createdFriendship);
    
          if (result.message) {
            sendServerError(res, result.message)
        } else {
            sendCreated(res, 'Friendship created successfully');
        }
        }
      }
   
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


  export const updateFriendshipControllers = async (req, res) => {
    try {
      const { FriendshipID } = req.params;

      const FriendshipDate = new Date();    
      // const { error } = updatePostValidator({Content });
      // if (error) {
      //   return res.status(400).json({ error: error.details[0].message });
      // }
  
      const updatedFriendship = await updateFriendshipService({FriendshipDate,FriendshipID});
      console.log('Updated one',updatedFriendship);
      if (updatedFriendship.error) {
        return sendServerError(res, updatedFriendship.error);
      }
  
      return sendCreated(res, 'Friendship updated successfully');
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

  export const getSingleFriendshipController=async(req,res)=>{
    try {
      const {FriendshipID}=req.params
      const singleFriendship=await getSingleFriendshipServices(FriendshipID)
      console.log('single',singleFriendship.recordset); 

      if(singleFriendship.rowsAffected>0){
       const singleUserFrienships=singleFriendship.recordset
        res.status(200).json({ Friendship: singleUserFrienships });
      }else{
        res.status(400).json({ message: "No friendship for the user" });
      }

    } catch (error) {
      return error
    }
  }



  export const getAllFriendshipsController = async (req, res) => {
    try {
      const results = await getAllFriendshipsService()
       if(results.rowsAffected>0){
        const Friendships=results.recordset
        res.status(200).json({ Friendships: Friendships });
       }else{
        res.status(400).json({ message: "No friendships" });
       }
    } catch (error) {
      console.error("Error fetching all friendships:", error);
      res.status(500).json("Internal server error");
    }
  };
  

  export const getAllUserFriendshipsController = async (req, res) => {
    try {
      const {User1ID}=req.params
      console.log(User1ID);
      const results = await getAlluserFriendsService(User1ID)
      console.log(results);
       if(results.rowsAffected>0){
        const Friendships=results.recordset
        console.log("Friends",Friendships);
      res.status(200).json({ Friendships: Friendships });
       }else{
        return res.status(400).send({message: "No existing friendships"});
       }
    } catch (error) {
      console.error("Error fetching all friendships:", error);
      res.status(500).json("Internal server error");
    }
  };
  
  export const deleteFriendshipController=async(req,res)=>{
    try {
      const {FriendshipID}=req.params
      const deletedFriendship=await deleteFriendshipServices(FriendshipID)
      console.log('deleted friendship',deletedFriendship); 
      sendDeleteSuccess(res,"Deleted successfully")
    } catch (error) {
      return error
    }
  }