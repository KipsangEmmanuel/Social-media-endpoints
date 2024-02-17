import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import {poolRequest,sql} from '../dbconnect/dbConnect.js'

dotenv.config();

// Register post service
export const createPostService=async(post)=>{
  
  try {
    const result=await poolRequest()
    .input('UserID', sql.VarChar,post.UserID )
    .input('PostID', sql.VarChar,post.PostID )
    .input('Content', sql.VarChar,post.Content)
    .input('PostDate', sql.DateTime,post.PostDate)
    .input('Likes', sql.Int,post.Likes)
    .input('Comments', sql.Int,post.Comments)
    .query('INSERT INTO post (PostID,UserID,Content,Likes,Comments,PostDate) VALUES(@PostID,@UserID,@Content,@Likes,@Comments,@PostDate)')
    console.log('results',result);
    return result;

  } catch (error) {
    return error
  }
};


// updating post details based on the id

export const updatePostService=async(updatePost)=>{
  try {
    const updatedPost=await poolRequest()
    .input('PostID', sql.VarChar,updatePost.PostID)
    .input('Content', sql.VarChar,updatePost.Content)
    .input('PostDate', sql.DateTime,updatePost.PostDate)
    .input('Likes', sql.Int,updatePost.Likes)
    .input('Comments', sql.Int,updatePost.Comments)
  .query(`UPDATE Post  SET PostID=@PostID, Content = @Content, PostDate = @PostDate,Likes = @Likes , Comments = @Comments  WHERE  PostID = @PostID`)
console.log(updatePost);
  return updatedPost
  
  } catch (error) {
    return error
  }
}


// updating the content
export const updateContentService=async(updateContent)=>{
  try {
    const updatedContent=await poolRequest()
    .input('Content', sql.VarChar,updateContent.Content)
    .input('PostID', sql.VarChar,updateContent.PostID)
    .query(`UPDATE Post  SET Content = @Content  WHERE  PostID = @PostID`)
    console.log("updating content",updateContent);
  return updatedContent
  
  } catch (error) {
    return error
  }
}


export const getSinglePostServices=async(PostID)=>{
  const singlePost= await poolRequest()
  .input('PostID', sql.VarChar,PostID)
  .query('SELECT * FROM Post WHERE PostID = @PostID ')
  console.log('single post',singlePost.recordset);
  return singlePost.recordset;
}


// Fetching all available post in the database
export const getAllPostsService=async()=>{
    try {
        const allPosts=await poolRequest().query(`SELECT * FROM Post`)
        return allPosts
    } catch (error) {
        return error
    }
}

// Fetching delete post
export const deletePostServices=async(PostID)=>{
  const deletedPost= await poolRequest()
  .input('PostID', sql.VarChar,PostID)
  .query('DELETE FROM Post WHERE PostID = @PostID ')
  console.log('single post',deletedPost.recordset);
  return deletedPost.recordset;
}