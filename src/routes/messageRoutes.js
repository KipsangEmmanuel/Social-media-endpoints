import {Router} from 'express';
import { createMessageController, deleteMessageController, getAllMessagesController, getSingleMessageController, updateMessageControllers } from '../controllers/messageControllers.js';
import { updateContentControllers } from '../controllers/postsControllers.js';

const messageRouter = Router();

messageRouter.post('/message', createMessageController)

messageRouter.get('/messages', getAllMessagesController)

messageRouter.get('/messages/single/:MessageID', getSingleMessageController)

messageRouter.put('/messages/update/:MessageID', updateMessageControllers)

messageRouter.patch('/messages/patch/:MessageID', updateContentControllers)

messageRouter.delete('/messages/delete/:MessageID', deleteMessageController)


export default messageRouter;

