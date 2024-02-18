import {v4} from 'uuid'
import { notAuthorized, sendCreated, sendDeleteSuccess, sendServerError} from "../helpers/helperFunctions.js"
import { createMessageValidator, updateContentValidator, updateMessageValidator } from '../validators/messageValidators.js';
import { createMessageService, deleteMessageServices, getAllMessagesService, getSingleMessageServices, updateContentService, updateMessageService } from '../services/messageService.js';


export const createMessageController = async (req, res) => {
    try {

      const {SenderID,ReceiverID,Content } = req.body;
      console.log(req.body);

      const MessageID = v4();
      const { error } = createMessageValidator({ Content });
      console.log("error",error);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
        const MessageDate = new Date();    
        const createdMessage = { MessageID,SenderID,ReceiverID,Content,MessageDate};
  
        const result = await createMessageService(createdMessage);
  
        if (result.message) {
          sendServerError(res, result.message)
      } else {
          sendCreated(res, 'Message send successfully');
      }
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


  export const updateMessageControllers = async (req, res) => {
    try {
      const { Content } = req.body;
      const { MessageID } = req.params;

      const MessageDate = new Date();    
      const { error } = updateMessageValidator({Content });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedMessage = await updateMessageService({ Content,MessageDate, MessageID });
      console.log('Updated one',updatedMessage);
      if (updatedMessage.error) {
        return sendServerError(res, updatedMessage.error);
      }
  
      return sendCreated(res, 'Message updated successfully');
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

  export const updateContentControllers = async (req, res) => {
    try {
      const { Content } = req.body;
      const { PostID } = req.params;

      const { error } = updateContentValidator({ Content});
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedContent = await updateContentService({ Content, PostID });
      console.log('Updated one',updatedContent);
  
      if (updatedContent.error) {
        return sendServerError(res, updatedContent.error);
      }
  
      return sendCreated(res, 'message updated successfully');
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

  export const getSingleMessageController=async(req,res)=>{
    try {
      const {MessageID}=req.params
      const singleMessage=await getSingleMessageServices(MessageID)
      
      console.log('single',singleMessage); 
      res.status(200).json({ message: singleMessage });

    } catch (error) {
      return error
    }
  }



  export const getAllMessagesController = async (req, res) => {
    try {
      const results = await getAllMessagesService()
        const messages=results.recordset
        console.log(messages);
      res.status(200).json({ messages: messages });
    } catch (error) {
      console.error("Error fetching all messages:", error);
      res.status(500).json("Internal server error");
    }
  };
  

  export const deleteMessageController=async(req,res)=>{
    try {
      const {PostID}=req.params
      const deletedMessage=await deleteMessageServices(PostID)
      console.log('deleted message',deletedMessage); 
      sendDeleteSuccess(res,"Deleted successfully")
    } catch (error) {
      return error
    }
  }