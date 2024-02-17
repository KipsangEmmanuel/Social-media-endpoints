import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import {poolRequest,sql} from '../dbconnect/dbConnect.js'

dotenv.config();

// Register user service
export const registerNewUserService = async(newUser)=>{

  try {
    const result=await poolRequest()
    .input('UserID', sql.VarChar,newUser.UserID)
    .input('Username', sql.VarChar,newUser.Username)
    .input('Email', sql.VarChar,newUser.Email)
    .input('Password', sql.VarChar,newUser.Password)
    .input('TagName', sql.VarChar,newUser.TagName)
    .input('Location', sql.VarChar,newUser.Location)
    .query(`INSERT INTO tbl_user (UserID,Username,Email,Password,TagName,Location) VALUES(@UserID,@Username,@Email,@Password,@TagName,@Location)`)

    return result;

  } catch (error) {
    return error
  }
};

// Login user and generate token which returns user details except the password

export const authenticateUserService=async(user)=>{
try {
  const userFoundResponse=await poolRequest()
  .input('Email', sql.VarChar, user.Email)
  .query('SELECT * FROM tbl_user WHERE Email=@Email')

  if(userFoundResponse.recordset[0]){
    if(await bcrypt.compare(user.Password,userFoundResponse.recordset[0].Password)){

      let token=jwt.sign({
        UserID:userFoundResponse.recordset[0].UserID,
        Password:userFoundResponse.recordset[0].Password,
        Email:userFoundResponse.recordset[0].Email
      },process.env.SECRET_KEY,{ expiresIn: "24h" })
      console.log("Token is",token);
      const {Password,...user}=userFoundResponse.recordset[0]
      return {user,token:`JWT ${token}`}

    }else{
      return { error: 'Invalid Credentials' };
    }
  }else{
    return { error: 'Invalid Credentials' };
  }
} catch (error) {
  return error
}
}

// updating user details based on the id

export const updateUserService=async(updateUser)=>{
  try {
    const updatedUser=await poolRequest()
    .input('Username', sql.VarChar,updateUser.Username)
    .input('UserID', sql.VarChar,updateUser.UserID)
    .input('TagName', sql.VarChar,updateUser.TagName)
    .input('Location', sql.VarChar,updateUser.Location)
  .query(`UPDATE tbl_user  SET Username = @Username, TagName = @TagName,Location = @Location  WHERE  userID = @userID`)
console.log(updateUser);
  return updatedUser
  
  } catch (error) {
    return error
  }
}

export const updateUserPasswordService=async(updatePass)=>{
  try {
    const updatedPass=await poolRequest()
    .input('Password', sql.VarChar,updatePass.Password)
    .input('UserID', sql.VarChar,updatePass.UserID)
  .query(`UPDATE tbl_user  SET Password = @Password  WHERE  userID = @userID`)
console.log("user pass",updatePass);
  return updatedPass
  
  } catch (error) {
    return error
  }
}


export const getSingleUserServices=async(UserID)=>{
  const singleUser= await poolRequest()
  .input('UserID', sql.VarChar,UserID)
  .query('SELECT * FROM tbl_user WHERE UserID = @UserID ')
  console.log('single user',singleUser.recordset);
  return singleUser.recordset;
}


export const findUserByEmailService = async(email) => {
  try {
    const result = await poolRequest()
      .input('Email', sql.VarChar, email)
      .query('SELECT * FROM tbl_user WHERE Email = @Email')

     return result.recordset.length > 0 ? result.recordset[0] : null
    
  } catch (error) {
    throw new Error(error.message)
    
  }

}



// Fetching all available users in the database
export const getAllUsersService=async(users)=>{
    try {
        const allUsers=await poolRequest().query(`SELECT * FROM tbl_user`)
        return allUsers
    } catch (error) {
        return error
    }
}

// Fetching delete user
export const deleteUserServices=async(UserID)=>{
  const deletedUser= await poolRequest()
  .input('UserID', sql.VarChar,UserID)
  .query('DELETE FROM tbl_user WHERE UserID = @UserID ')
  console.log('single user',deletedUser.recordset);
  return deletedUser.recordset;
}