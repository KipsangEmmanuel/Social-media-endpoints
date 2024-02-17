
import dotenv from 'dotenv'

import {poolRequest,sql} from '../dbconnect/dbConnect.js'

dotenv.config();

// Register photo service
export const createPhotoService=async(photo)=>{
  
  try {
    const result=await poolRequest()
    .input('UserID', sql.VarChar,photo.UserID )
    .input('PhotoID', sql.VarChar,photo.PhotoID )
    .input('PhotoURL', sql.VarChar,photo.PhotoURL)
    .input('UploadDate', sql.DateTime,photo.UploadDate)
    .query('INSERT INTO Photo (PhotoID,UserID,PhotoURL,UploadDate) VALUES(@PhotoID,@UserID,@PhotoURL,@UploadDate)')
    console.log('results',result);
    return result;

  } catch (error) {
    return error
  }
};

    

// updating photo details based on the id

export const updatePhotoService=async(updatePhoto)=>{
  try {
    const updatedPhoto=await poolRequest()
    .input('PhotoID', sql.VarChar,updatePhoto.PhotoID )
    .input('PhotoURL', sql.VarChar,updatePhoto.PhotoURL)
    .input('UploadDate', sql.DateTime,updatePhoto.UploadDate)
    .query(`UPDATE Photo  SET PhotoID=@PhotoID, PhotoURL=@PhotoURL, UploadDate=@UploadDate  WHERE  PhotoID=@PhotoID`)
console.log("updated",updatePhoto);
  return updatedPhoto
  
  } catch (error) {
    return error
  }
}


// updating the photo url
export const updatePhotoUrlService=async(updatePhotoUrl)=>{
  try {
    const updatedPhotoUrl=await poolRequest()
    .input('PhotoID', sql.VarChar,updatePhotoUrl.PhotoID )
    .input('PhotoURL', sql.VarChar,updatePhotoUrl.PhotoURL)
    .query(`UPDATE Photo  SET PhotoURL = @PhotoURL  WHERE  PhotoID = @PhotoID`)
    console.log("updating content",updatePhotoUrl);
  return updatedPhotoUrl
  
  } catch (error) {
    return error
  }
}


export const getSinglePhotoServices=async(PhotoID)=>{
  const singlePhoto= await poolRequest()
  .input('PhotoID', sql.VarChar,PhotoID)
  .query('SELECT * FROM Photo WHERE PhotoID = @PhotoID ')
  console.log('single photo',singlePhoto.recordset);
  return singlePhoto.recordset;
}


// Fetching all available photos in the database
export const getAllPhotoService=async()=>{
    try {
        const allPhotos=await poolRequest().query(`SELECT * FROM Photo`)
        return allPhotos
    } catch (error) {
        return error
    }
}

// Fetching delete photo
export const deletePhotoServices=async(PhotoID)=>{
  const deletedPhoto= await poolRequest()
  .input('PhotoID', sql.VarChar,PhotoID)
  .query('DELETE FROM Photo WHERE PhotoID = @PhotoID ')
  console.log('single photo',deletedPhoto.recordset);
  return deletedPhoto.recordset;
}