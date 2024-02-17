import {v4} from 'uuid'
import {  sendCreated, sendDeleteSuccess, sendServerError} from "../helpers/helperFunctions.js"
import { createPhotoService, deletePhotoServices, getAllPhotoService, getSinglePhotoServices, updatePhotoService, updatePhotoUrlService } from '../services/photoService.js';
import { createPhotoValidator, updatePhotoURLValidator, updatePhotoValidator } from '../validators/PhotosValidators.js';


export const createPhotoController = async (req, res) => {
    try {

      const {UserID,PhotoURL } = req.body;
      console.log(req.body);

      const PhotoID = v4();
      const { error } = createPhotoValidator({PhotoURL});
      console.log("error",error);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
        const newDate = new Date();
        const UploadDate=newDate.toISOString()    
        const createdPhoto = { UserID, PhotoID,PhotoURL,UploadDate};
  
        const result = await createPhotoService(createdPhoto);
  
        if (result.message) {
          sendServerError(res, result.message)
      } else {
          sendCreated(res, 'photo created successfully');
      }
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


  export const updatePhotoControllers = async (req, res) => {
    try {
      const { PhotoURL } = req.body;
      const { PhotoID } = req.params;

      const UploadDate = new Date();    
      const { error } = updatePhotoValidator({PhotoURL});
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedPhoto = await updatePhotoService({ PhotoURL, PhotoID,UploadDate });
      console.log('Updated one',updatedPhoto);
      if (updatedPhoto.error) {
        return sendServerError(res, updatedPhoto.error);
      }
  
      return sendCreated(res, 'Photo updated successfully');
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

  export const updatePhotoUrlControllers = async (req, res) => {
    try {
      const { PhotoURL } = req.body;
      const { PhotoID } = req.params;

      const { error } = updatePhotoURLValidator({ PhotoURL});
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedUrl = await updatePhotoUrlService({ PhotoURL, PhotoID });
      console.log('Updated one',updatedUrl);
  
      if (updatedUrl.error) {
        return sendServerError(res, updatedUrl.error);
      }
  
      return sendCreated(res, 'photo url updated successfully');
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

  export const getSinglePhotoController=async(req,res)=>{
    try {
      const {PhotoID}=req.params
      const singlePhoto=await getSinglePhotoServices(PhotoID)
      
      console.log('single',singlePhoto); 
      res.status(200).json({ photo: singlePhoto });

    } catch (error) {
      return error
    }
  }



  export const getAllPhotosController = async (req, res) => {
    try {
      const results = await getAllPhotoService()
        const photos=results.recordset
        console.log(photos);
      res.status(200).json({ Photos: photos });
    } catch (error) {
      console.error("Error fetching all photos:", error);
      res.status(500).json("Internal server error");
    }
  };
  

  export const deletePhotoController=async(req,res)=>{
    try {
      const {PhotoID}=req.params
      const deletedPhoto=await deletePhotoServices(PhotoID)
      console.log('deleted photo',deletedPhoto); 
      sendDeleteSuccess(res,"Deleted successfully")
    } catch (error) {
      return error
    }
  }