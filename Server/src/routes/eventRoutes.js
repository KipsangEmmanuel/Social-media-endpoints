import {Router} from 'express';
import { createEventController, deleteEventController, getAllEventsController, getSingleEventController, updateEventControllers, updateEventNameControllers } from '../controllers/eventControllers.js';

const eventRouter=Router();

eventRouter.post('/events', createEventController )

eventRouter.get('/events', getAllEventsController )

eventRouter.get('/events/single/:EventID', getSingleEventController)

eventRouter.put('/events/update/:EventID',updateEventControllers)

eventRouter.patch('/events/patch/:EventID',updateEventNameControllers)

eventRouter.delete('/events/delete/:EventID', deleteEventController)


export default eventRouter;