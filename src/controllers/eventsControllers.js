import {v4} from 'uuid'
import { notAuthorized, sendCreated, sendDeleteSuccess, sendServerError} from "../helpers/helperFunctions.js"
import { createEventValidator, updateEventNameValidator, updateEventValidator } from '../validators/EventValidator.js';
import { createEventService, deleteEventServices, getAllEventsService, getSingleEventServices, updateEventNameService, updateEventService } from '../services/eventService.js';


export const createEventController = async (req, res) => {
    try {
      const { EventName,EventPosterURL,Description,Location,EventDate } = req.body;
      console.log(req.body);

      const EventID = v4();
      const { error } = createEventValidator( req.body);
      console.log("error",error);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
        const createdEvent = { EventID, EventPosterURL,Description,EventName,Location,EventDate};
  
        const result = await createEventService(createdEvent);
  
        if (result.message) {
          sendServerError(res, result.message)
      } else {
          sendCreated(res, 'Event created successfully');
      }
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


  export const updateEventControllers = async (req, res) => {
    try {
      const { EventPosterURL,Description,Location,EventDate } = req.body;
      const { EventID } = req.params;
      const { error } = updateEventValidator(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedEvent = await updateEventService({EventPosterURL,Description,Location,EventDate, EventID });
      console.log('Updated one',updatedEvent);
      if (updatedEvent.error) {
        return sendServerError(res, updatedEvent.error);
      }
  
      return sendCreated(res, 'Event updated successfully');
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

  export const updateEventNameControllers = async (req, res) => {
    try {
      const { EventName } = req.body;
      const { EventID } = req.params;

      const { error } = updateEventNameValidator({ EventName });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedEventName = await updateEventNameService({ EventName, EventID });
      console.log('Updated one',updatedEventName);
  
      if (updatedEventName.error) {
        return sendServerError(res, updatedEventName.error);
      }
  
      return sendCreated(res, 'Event updated successfully');
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

  export const getSingleEventController=async(req,res)=>{
    try {
      const {EventID}=req.params
      const singleEvent=await getSingleEventServices(EventID)
      
      console.log('single',singleEvent); 
      res.status(200).json({ event: singleEvent });

    } catch (error) {
      return error
    }
  }



  export const getAllEventsController = async (req, res) => {
    try {
      const results = await getAllEventsService()
        const events=results.recordset
        console.log(events);
      res.status(200).json({ events: events });
    } catch (error) {
      console.error("Error fetching all events:", error);
      res.status(500).json("Internal server error");
    }
  };
  

  export const deleteEventController=async(req,res)=>{
    try {
      const {EventID}=req.params
      const deletedEvent=await deleteEventServices(EventID)
      console.log('deleted event',deletedEvent); 
      sendDeleteSuccess(res,"Deleted successfully")
    } catch (error) {
      return error
    }
  }