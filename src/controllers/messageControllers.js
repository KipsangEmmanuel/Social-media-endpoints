import {v4} from 'uuid'
import { notAuthorized, sendCreated, sendDeleteSuccess, sendServerError} from "../helpers/helperFunctions.js"
import { createPostValidator } from '../validators/postsValidators.js';
import { createMessageValidator } from '../validators/messageValidators.js';
import { createMessageService, getAllMessagesService } from '../services/messageService.js';
import { getAllPostsService } from '../services/postService.js';


export const createMessageController = async (req, res) => {
  try {
    const { SenderID, ReceiverID, Content } = req.body;
    // console.log(req.body);

    const MessageID = v4();

    const { error } = createMessageValidator({ Content });
    // console.log("error", error);
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      const MessageDate = new Date();
      const messageData = { MessageID, SenderID, ReceiverID, Content, MessageDate };

      const result = await createMessageService(messageData);

      if (result.message) {
        sendServerError(res, result.message);
      } else {
        sendCreated(res, 'Message created successfully');
      }
    }
  } catch (error) {
    sendServerError(res, error.erro);
  }
};



  export const updateMessageControllers = async (req, res) => {
    try {
      const { Content,Likes,Comments } = req.body;
      const { PostID } = req.params;

      const PostDate = new Date();    
      const { error } = updatePostValidator({Content });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedPost = await updatePostService({ Content,PostDate,Likes,Comments, PostID });
      console.log('Updated one',updatedPost);
      if (updatedPost.error) {
        return sendServerError(res, updatedPost.error);
      }
  
      return sendCreated(res, 'Post updated successfully');
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
  
      return sendCreated(res, 'post updated successfully');
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

  export const getSingleMessageController=async(req,res)=>{
    try {
      const {PostID}=req.params
      const singlePost=await getSinglePostServices(PostID)
      
      console.log('single',singlePost); 
      res.status(200).json({ post: singlePost });

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
      const deletedPost=await deletePostServices(PostID)
      console.log('deleted post',deletedPost); 
      sendDeleteSuccess(res,"Deleted successfully")
    } catch (error) {
      return error
    }
  }



