
import dotenv from 'dotenv'

import {poolRequest,sql} from '../dbconnect/dbConnect.js'

dotenv.config();



// Register post service
export const createEventService=async(event)=>{
  
  try {
    const result=await poolRequest()
    .input('EventID', sql.VarChar,event.EventID )
    .input('EventName', sql.VarChar,event.EventName)
    .input('Description', sql.VarChar,event.Description)
    .input('Location', sql.VarChar,event.Location)
    .input('EventPosterURL', sql.VarChar,event.EventPosterURL)
    .input('EventDate', sql.VarChar,event.EventDate)
    .query('INSERT INTO Event (EventID,EventName,EventPosterURL,Description,Location,EventDate) VALUES(@EventID,@EventName,@EventPosterURL,@Description,@Location,@EventDate)')
    console.log('results',result);
    return result;

  } catch (error) {
    return error
  }
};


// updating post details based on the id

export const updateEventService=async(updateEvent)=>{
  try {
    const updatedEvent=await poolRequest()
    .input('EventID', sql.VarChar,updateEvent.EventID )
    .input('Description', sql.VarChar,updateEvent.Description)
    .input('Location', sql.VarChar,updateEvent.Location)
    .input('EventPosterURL', sql.VarChar,updateEvent.EventPosterURL)
    .input('EventDate', sql.VarChar,updateEvent.EventDate)
    .query(`UPDATE Event  SET EventID=@EventID, Description=@Description,Location=@Location,EventPosterURL=@EventPosterURL, EventDate = @EventDate  WHERE  EventID = @EventID`)
console.log(updatedEvent);
  return updatedEvent
  
  } catch (error) {
    return error
  }
}

// updating the content
export const updateEventNameService=async(updateEventName)=>{
  try {
    const updatedEventName=await poolRequest()
    .input('EventID', sql.VarChar,updateEventName.EventID )
    .input('EventName', sql.VarChar,updateEventName.EventName)
    .query(`UPDATE Event  SET EventName = @EventName  WHERE  EventID = @EventID`)
    console.log("updating event",updatedEventName);
  return updatedEventName
  
  } catch (error) {
    return error
  }
}


export const getSingleEventServices=async(EventID)=>{
  const singleEvent= await poolRequest()
  .input('EventID', sql.VarChar,EventID)
  .query('SELECT * FROM Event WHERE EventID = @EventID ')
  console.log('single EventID',singleEvent.recordset);
  return singleEvent.recordset;
}


// Fetching all available post in the database
export const getAllEventsService=async(posts)=>{
    try {
        const allPosts=await poolRequest().query(`SELECT * FROM Event`)
        return allPosts
    } catch (error) {
        return error
    }
}

// Fetching delete post
export const deleteEventServices=async(EventID)=>{
  const deletedEvent= await poolRequest()
  .input('EventID', sql.VarChar,EventID)
  .query('DELETE FROM Event WHERE EventID = @EventID ')
  console.log('single EventID',deletedEvent.recordset);
  return deletedEvent.recordset;
}