import {Router} from 'express';
import { createGroupController, deleteGroupControllers, getAllGroupsController, getSingleGroupController, updateGroupControllers, updateGroupNameControllers } from '../controllers/groupController.js';


const groupRouter=Router();

groupRouter.post('/groups', createGroupController)

groupRouter.get('/groups',  getAllGroupsController)

groupRouter.get('/groups/single/:GroupID', getSingleGroupController )

groupRouter.put('/groups/update/:GroupID', updateGroupControllers)

groupRouter.patch('/groups/patch/:GroupID', updateGroupNameControllers)

groupRouter.delete('/groups/delete/:GroupID', deleteGroupControllers)


export default groupRouter;