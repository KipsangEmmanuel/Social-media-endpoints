import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import {poolRequest,sql} from '../dbconnect/dbConnect.js'

dotenv.config();

// Register post service
export const createMessageService=async(message)=>{
  
  try {
    const result=await poolRequest()
    .input('MessageID', sql.VarChar,message.MessageID  )
    .input('SenderID', sql.VarChar,message.SenderID )
    .input('ReceiverID', sql.VarChar,message.ReceiverID )
    .input('Content', sql.VarChar,message.Content)
    .input('MessageDate', sql.DateTime,message.MessageDate)
    .query('INSERT INTO Message (MessageID,SenderID,ReceiverID,Content,MessageDate) VALUES(@MessageID,@SenderID,@ReceiverID,@Content,@MessageDate)')
    console.log('results',result);
    return result;

  } catch (error) {
    return error
  }
};
     

// updating post details based on the id

export const updateMessageService=async(updateMessage)=>{
  try {
    const updatedMessage=await poolRequest()
    .input('MessageID', sql.VarChar,updateMessage.MessageID  )
    .input('Content', sql.VarChar,updateMessage.Content)
    .input('MessageDate', sql.DateTime,updateMessage.MessageDate)
  .query(`UPDATE Message  SET MessageID=@MessageID, Content = @Content, MessageDate = @MessageDate  WHERE  MessageID = @MessageID`)
console.log(updateMessage);
  return updatedMessage
  
  } catch (error) {
    return error
  }
}


// updating the content
export const updateContentService=async(updateContent)=>{
  try {
    const updatedContent=await poolRequest()
    .input('Content', sql.VarChar,updateContent.Content)
    .input('MessageID', sql.VarChar,updateContent.MessageID)
    .query(`UPDATE Message  SET Content = @Content  WHERE  MessageID = @MessageID`)
    console.log("updating content",updateContent);
  return updatedContent
  
  } catch (error) {
    return error
  }
}


export const getSingleMessageServices=async(MessageID)=>{
  const singleMessage= await poolRequest()
  .input('MessageID', sql.VarChar,MessageID)
  .query('SELECT * FROM Message WHERE MessageID = @MessageID ')
  console.log('single message',singleMessage.recordset);
  return singleMessage.recordset;
}


// Fetching all available post in the database
export const getAllMessagesService=async()=>{
    try {
        const allMessages=await poolRequest().query(`SELECT * FROM Message`)
        return allMessages
    } catch (error) {
        return error
    }
}

// Fetching delete message
export const deleteMessageServices=async(MessageID)=>{
  const deletedMessage= await poolRequest()
  .input('MessageID', sql.VarChar,MessageID)
  .query('DELETE FROM Message WHERE MessageID = @MessageID ')
  console.log('single message',deletedMessage.recordset);
  return deletedMessage.recordset;
}