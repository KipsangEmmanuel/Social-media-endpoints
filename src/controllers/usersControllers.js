import bcrypt from 'bcrypt'
import {v4} from 'uuid'
import { authenticateUserService, deleteUserServices, findUserByEmailService, getAllUsersService, getSingleUserServices, registerNewUserService, updateUserPasswordService, updateUserService } from "../services/userService.js"
import { RegisterUserValidator,loginUserValidator, updateUserPasswordValidator, updateUserValidator } from "../utils/Validators.js";
import { notAuthorized, sendCreated, sendDeleteSuccess, sendServerError} from "../helpers/helperFunctions.js"


export const createNewUserController = async (req, res) => {
    try {
      const { Username, Email, Password, TagName, Location } = req.body;
      // console.log(req.body);

      const existingUser = await findUserByEmailService(Email);
      if(existingUser) {
        return res.status(400).json({
          message: "User already exist!"
        })
      }

      const UserID = v4();
      const { error } = RegisterUserValidator({ Username, Email, Password, TagName, Location });
      console.log("error",error);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
        const hashedPassword = await bcrypt.hash(Password, 8);
        const registeredUser = { UserID, Username, Email, Password: hashedPassword, TagName, Location };
  
        const result = await registerNewUserService(registeredUser);
  
        if (result.message) {
          sendServerError(res, result.message)
      } else {
          sendCreated(res, 'User created successfully');
      }
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


  export const loginUserController = async (req, res) => {
    try {
      const { Email, Password } = req.body;
        const { error } = loginUserValidator({ Email, Password });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const user = await authenticateUserService({ Email, Password });
      console.log(user);
      if (user.error) {
        return notAuthorized(res, user.error);
      }
  
      // Successful login
      res.status(200).json({ user });
    } catch (error) {
      return sendServerError(res, "Internal server error");
    }
  };
  

  export const updateUserControllers = async (req, res) => {
    try {
      const { Username, TagName, Location } = req.body;
      const { UserID } = req.params;

      const { error } = updateUserValidator({ Username, TagName, Location });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedUser = await updateUserService({ Username, TagName, Location, UserID });
  console.log('Updated one',updatedUser);
      if (updatedUser.error) {
        return sendServerError(res, updatedUser.error);
      }
  
      return sendCreated(res, 'User updated successfully');
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

  export const updateUserPasswordControllers = async (req, res) => {
    try {
      const { Password } = req.body;
      const { UserID } = req.params;

      const { error } = updateUserPasswordValidator({ Password});
      const updatedhashedPassword=bcrypt.hash(Password,8)
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedPass = await updateUserPasswordService({ updatedhashedPassword, UserID });
      console.log('Updated one',updatedPass);
  
      if (updatedPass.error) {
        return sendServerError(res, updatedPass.error);
      }
  
      return sendCreated(res, 'User updated successfully');
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

  export const getSingleUserController=async(req,res)=>{
    try {
      const {UserID}=req.params
      const singleUser=await getSingleUserServices(UserID)
      
      console.log('single',singleUser); 
      res.status(200).json({ user: singleUser });

    } catch (error) {
      return error
    }
  }



  export const getAllUsersController = async (req, res) => {
    try {
      const results = await getAllUsersService()
        const users=results.recordset
        console.log(users);
      res.status(200).json({ Users: users });
    } catch (error) {
      console.error("Error fetching all users:", error);
      res.status(500).json("Internal server error");
    }
  };
  

  export const deleteUserController=async(req,res)=>{
    try {
      const {UserID}=req.params
      const deletedUser=await deleteUserServices(UserID)
      console.log('deleteed user',deletedUser); 
      sendDeleteSuccess(res,"Deleted successfull")
    } catch (error) {
      return error
    }
  }


  

