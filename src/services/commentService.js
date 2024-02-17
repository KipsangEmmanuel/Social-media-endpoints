
import dotenv from 'dotenv'

import {poolRequest,sql} from '../dbconnect/dbConnect.js'

dotenv.config();

// Register Comment service
export const createCommentService=async(comment)=>{
  
  try {
    const result=await poolRequest()
    .input('CommentID', sql.VarChar,comment.CommentID )
    .input('UserID', sql.VarChar,comment.UserID )
    .input('PostID', sql.VarChar,comment.PostID )
    .input('Content', sql.VarChar,comment.Content)
    .input('CommentDate', sql.DateTime,comment.CommentDate)
    .query('INSERT INTO Comment (CommentID,UserID,PostID,Content,CommentDate) VALUES(@CommentID,@UserID,@PostID,@Content,@CommentDate)')
    console.log('results',result);
    return result;

  } catch (error) {
    return error
  }
};

// updating Comment details based on the id

export const updateCommentService=async(updateComment)=>{
  try {
    const updatedComment=await poolRequest()
    .input('CommentID', sql.VarChar,updateComment.CommentID)
    .input('Content', sql.VarChar,updateComment.Content)
    .input('CommentDate', sql.DateTime,updateComment.CommentDate)
  .query(`UPDATE Comment  SET CommentID=@CommentID, Content = @Content, CommentDate = @CommentDate  WHERE  CommentID = @CommentID`)
console.log(updatedComment);
  return updatedComment
  
  } catch (error) {
    return error
  }
}


// updating the content
export const updateContentService=async(updateContent)=>{
  try {
    const updatedContent=await poolRequest()
    .input('Content', sql.VarChar,updateContent.Content)
    .input('CommentID', sql.VarChar,updateContent.CommentID)
    .query(`UPDATE Comment  SET Content = @Content  WHERE  CommentID = @CommentID`)
    console.log("updating content",updateContent);
  return updatedContent
  
  } catch (error) {
    return error
  }
}


export const getSingleCommentServices=async(CommentID)=>{
  const singleComment= await poolRequest()
  .input('CommentID', sql.VarChar,CommentID)
  .query('SELECT * FROM Comment WHERE CommentID = @CommentID ')
  console.log('single post',singleComment.recordset);
  return singleComment.recordset;
}


// Fetching all available comment in the database
export const getAllCommentsService=async(comments)=>{
    try {
        const allComments=await poolRequest().query(`SELECT * FROM Comment`)
        return allComments
    } catch (error) {
        return error
    }
}

// Fetching delete comment
export const deleteCommentServices=async(CommentID)=>{
  const deletedComment= await poolRequest()
  .input('CommentID', sql.VarChar,CommentID)
  .query('DELETE FROM Comment WHERE CommentID = @CommentID ')
  console.log('single comment',deletedComment.recordset);
  return deletedComment.recordset;
}