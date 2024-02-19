import {Router} from 'express';
import { createMessageController, deleteMessageController, getAllMessagesController, getSingleMessageController, updateContentControllers, updateMessageControllers } from '../controllers/messageControllers.js';

const messageRouter=Router();

messageRouter.post('/messages', createMessageController)

messageRouter.get('/messages', getAllMessagesController )

messageRouter.get('/messages/single/:MessageID', getSingleMessageController)

messageRouter.put('/messages/update/:MessageID', updateMessageControllers)

messageRouter.patch('/messages/patch/:MessageID', updateContentControllers)

messageRouter.delete('/messages/delete/:MessageID', deleteMessageController)


export default messageRouter;