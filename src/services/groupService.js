
import dotenv from 'dotenv'

import {poolRequest,sql} from '../dbconnect/dbConnect.js'

dotenv.config();

// Register post service
export const createGroupService=async(group)=>{
  
  try {
    const result=await poolRequest()
    .input('GroupID', sql.VarChar,group.GroupID )
    .input('GroupName', sql.VarChar,group.GroupName)
    .input('Description', sql.VarChar,group.Description)
    .input('CreatedDate', sql.DateTime,group.CreatedDate)
    .query('INSERT INTO tbl_group (GroupID,GroupName,Description,CreatedDate) VALUES(@GroupID,@GroupName,@Description,@CreatedDate)')
    console.log('results',result);
    return result;

  } catch (error) {
    return error
  }
};


// updating post details based on the id

export const updateGroupService=async(updateGroup)=>{
  try {
    const updatedGroup=await poolRequest()
    .input('GroupID', sql.VarChar,updateGroup.GroupID )
    .input('GroupName', sql.VarChar,updateGroup.GroupName)
    .input('Description', sql.VarChar,updateGroup.Description)
    .input('CreatedDate', sql.DateTime,updateGroup.CreatedDate)
    .query(`UPDATE tbl_group SET GroupID=@GroupID, GroupName = @GroupName,Description=@Description, CreatedDate = @CreatedDate  WHERE  GroupID=@GroupID`)
    console.log(updatedGroup);
    return updatedGroup
  
  } catch (error) {
    return error
  }
}


// updating the content
export const updateGroupNameService=async(updateGroupName)=>{
  try {
    const updatedGroupName=await poolRequest()
    .input('GroupID', sql.VarChar,updateGroupName.GroupID )
    .input('GroupName', sql.VarChar,updateGroupName.GroupName)
    .query(`UPDATE tbl_group SET GroupName = @GroupName  WHERE  GroupID = @GroupID`)
    console.log("updating GroupName",updatedGroupName);
  return updatedGroupName
  
  } catch (error) {
    return error
  }
}


export const getSingleGroupServices=async(GroupID)=>{
  const singleGroup= await poolRequest()
  .input('GroupID', sql.VarChar,GroupID)
  .query('SELECT * FROM tbl_group WHERE GroupID = @GroupID ')
  console.log('single group',singleGroup.recordset);
  return singleGroup.recordset;
}




// Fetching all available post in the database
export const getAllGroupsService=async()=>{
    try {
        const allGroups=await poolRequest().query(`SELECT * FROM tbl_group`)
        return allGroups
    } catch (error) {
        return error
    }
}

// Fetching delete post
export const deleteGroupServices=async(GroupID)=>{
  const deletedGroup= await poolRequest()
  .input('GroupID', sql.VarChar,GroupID)
  .query('DELETE FROM tbl_group WHERE GroupID = @GroupID ')
  console.log('single group',deletedGroup.recordset);
  return deletedGroup.recordset;
}