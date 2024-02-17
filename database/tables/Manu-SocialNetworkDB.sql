-- Create Database
-- CREATE DATABASE SocialNetworkDB;
USE social_database;
SELECT * FROM tbl_user WHERE userID = '1d8be6aa-6f0e-43d9-87d1-637a257408e5'

-- Create User Table
CREATE TABLE tbl_user (
    UserID VARCHAR(255) PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    TagName VARCHAR(50),
    Location VARCHAR(100)
);

SELECT * FROM tbl_user

DROP TABLE tbl_user

-- Create Post Table
CREATE TABLE Post (
    PostID VARCHAR(255) PRIMARY KEY,
    UserID VARCHAR(255),
    Content TEXT,
    PostDate DATETIME DEFAULT GETDATE(),
    Likes INT DEFAULT 0,
    Comments INT DEFAULT 0,
    FOREIGN KEY (UserID) REFERENCES tbl_user(UserID)
);

SELECT * FROM Post

DROP TABLE Post

-- Create Comment Table
CREATE TABLE Comment (
    CommentID VARCHAR(255) PRIMARY KEY,
    PostID VARCHAR(255),
    UserID VARCHAR(255),
    CommentDate DATETIME,
    Content TEXT,
    FOREIGN KEY (PostID) REFERENCES Post(PostID),
    FOREIGN KEY (UserID) REFERENCES tbl_user(UserID)
);

SELECT * FROM Comment

DROP TABLE Comment

-- Create Friendship Table
CREATE TABLE Friendship (
    FriendshipID VARCHAR(255) PRIMARY KEY,
    User1ID VARCHAR(255),
    User2ID VARCHAR(255),
    FriendshipDate DATETIME,
    FOREIGN KEY (User1ID) REFERENCES tbl_user(UserID),
    FOREIGN KEY (User2ID) REFERENCES tbl_user(UserID)
);


SELECT * FROM Friendship

DROP TABLE Friendship

-- Create Photo Table
CREATE TABLE Photo (
    PhotoID VARCHAR(255) PRIMARY KEY,
    UserID VARCHAR(255),
    PhotoURL VARCHAR(255),
    UploadDate DATETIME,
    FOREIGN KEY (UserID) REFERENCES tbl_user(UserID)
);

SELECT * FROM Photo

DROP TABLE Photo


-- Create Group Table
CREATE TABLE tbl_group (
    GroupID VARCHAR(255) PRIMARY KEY,
    GroupName VARCHAR(255),
    Description TEXT,
    CreatedDate DATETIME
);


SELECT * FROM tbl_group

DROP TABLE tbl_group

-- Create GroupMembers Table
CREATE TABLE GroupMembers (
    GroupID VARCHAR(255),
    MemberID VARCHAR(255),
    PRIMARY KEY (GroupID, MemberID),
    FOREIGN KEY (GroupID) REFERENCES tbl_group(GroupID),
    FOREIGN KEY (MemberID) REFERENCES tbl_user(UserID)
);


SELECT * FROM GroupMembers

DROP TABLE GroupMembers

-- Create Event Table
CREATE TABLE Event (
    EventID VARCHAR(255) PRIMARY KEY,
    EventName VARCHAR(255),
    Description TEXT,
    EventDate DATETIME,
    Location VARCHAR(100),
    EventPosterURL VARCHAR(255)
);


SELECT * FROM Event

DROP TABLE Event

-- Create EventAttendee Table
CREATE TABLE EventAttendee (
    EventID VARCHAR(255),
    AttendeeID VARCHAR(255),
    PRIMARY KEY (EventID, AttendeeID),
    FOREIGN KEY (EventID) REFERENCES Event(EventID),
    FOREIGN KEY (AttendeeID) REFERENCES tbl_user(UserID)
);

SELECT * FROM EventAttendee

DROP TABLE EventAttendee

-- Create Message Table
CREATE TABLE Message (
    MessageID VARCHAR(255) PRIMARY KEY,
    SenderID VARCHAR(255),
    ReceiverID VARCHAR(255),
    MessageDate DATETIME,
    Content TEXT,
    FOREIGN KEY (SenderID) REFERENCES tbl_user(UserID),
    FOREIGN KEY (ReceiverID) REFERENCES tbl_user(UserID)
);

SELECT * FROM Message

DROP TABLE Message

-- Insert Dummy Data (Example for User table)
-- Dummy data for User table
INSERT INTO tbl_user (UserID, Username, Email, Password, TagName, Location)
VALUES 
    (1, 'user1', 'user1@example.com', 'password1', 'tag1', 'Location 1'),
    (2, 'user2', 'user2@example.com', 'password2', 'tag2', 'Location 2'),
    (3, 'user3', 'user3@example.com', 'password3', 'tag3', 'Location 3');

-- Dummy data for Post table
INSERT INTO Post (PostID, UserID, Content, PostDate, Likes, Comments)
VALUES 
    (1, 1, 'Post content 1', GETDATE(), 10, 5),
    (2, 2, 'Post content 2', GETDATE(), 15, 8),
    (3, 3, 'Post content 3', GETDATE(), 20, 12);

-- Dummy data for Comment table
INSERT INTO Comment (CommentID, PostID, UserID, CommentDate, Content)
VALUES 
    (1, 1, 2, GETDATE(), 'Comment on post 1 by user 2'),
    (2, 2, 3, GETDATE(), 'Comment on post 2 by user 3'),
    (3, 3, 1, GETDATE(), 'Comment on post 3 by user 1');

-- Dummy data for Friendship table
INSERT INTO Friendship (FriendshipID, User1ID, User2ID, FriendshipDate)
VALUES 
    (1, 1, 2, GETDATE()),
    (2, 1, 3, GETDATE());

-- Dummy data for Photo table
INSERT INTO Photo (PhotoID, UserID, PhotoURL, UploadDate)
VALUES 
    (1, 1, 'url1', GETDATE()),
    (2, 2, 'url2', GETDATE()),
    (3, 3, 'url3', GETDATE());

-- Dummy data for Group table
INSERT INTO tbl_Group (GroupID, GroupName, Description, CreatedDate)
VALUES 
    (1, 'Group 1', 'Description for Group 1', GETDATE()),
    (2, 'Group 2', 'Description for Group 2', GETDATE());

-- Dummy data for GroupMembers table
INSERT INTO GroupMembers (GroupID, MemberID)
VALUES 
    (1, 1),
    (1, 2),
    (2, 2),
    (2, 3);

-- Dummy data for Event table
INSERT INTO Event (EventID, EventName, Description, EventDate, Location, EventPosterURL)
VALUES 
    (1, 'Event 1', 'Description for Event 1', GETDATE(), 'Location 1', 'poster_url_1'),
    (2, 'Event 2', 'Description for Event 2', GETDATE(), 'Location 2', 'poster_url_2');

-- Dummy data for EventAttendee table
INSERT INTO EventAttendee (EventID, AttendeeID)
VALUES 
    (1, 1),
    (1, 2),
    (2, 2),
    (2, 3);

-- Dummy data for Message table
INSERT INTO Message (MessageID, SenderID, ReceiverID, MessageDate, Content)
VALUES 
    (1, 1, 2, GETDATE(), 'Message from user 1 to user 2'),
    (2, 2, 1, GETDATE(), 'Reply from user 2 to user 1'),
    (3, 3, 1, GETDATE(), 'Message from user 3 to user 1');
--------------------------------
-- QUESTION 1 Friday 2/2024 ASSESSMENT
--------------------------------

-- 1. Retrieve all posts with their comments and likes for a specific user
-- SELECT * FROM Post
-- WHERE UserID = 1;

SELECT Post.*, Comment.*
FROM Post
LEFT JOIN Comment ON Post.PostID = Comment.PostID
WHERE Post.UserID = 1;


-- 2. Retrieve all friends of a user

SELECT Friendship.FriendshipID, tbl_user.userID, tbl_user.username, tbl_user.email, tbl_user.location  
FROM Friendship
INNER JOIN tbl_user ON tbl_user.userID = Friendship.User2ID
WHERE Friendship.User1ID = 1;

-- 3. Retrieve all events attended by a specific user


SELECT EventAttendee.AttendeeID,Event.*
FROM Event
INNER JOIN EventAttendee ON Event.eventID = EventAttendee.eventID
WHERE EventAttendee.attendeeID = 2;


-- 4. To display group members and their details for a certain group

SELECT tbl_group.groupID,tbl_group.GroupName,tbl_user.userID,tbl_user.username,tbl_user.location 
FROM GroupMembers
INNER JOIN tbl_user ON tbl_user.userID=GroupMembers.memberID
INNER JOIN tbl_Group ON tbl_Group.groupID=GroupMembers.groupID

WHERE GroupMembers.groupID= 2


-- 5. Retrieve all messages between two users


SELECT *  
FROM Message
INNER JOIN tbl_user ON tbl_user.userID = Message.ReceiverID
WHERE Message.SenderID = 3;

-- SELECT *  
-- FROM Message
-- WHERE (SenderID = 3 AND ReceiverID = 1) OR (SenderID = 1 AND ReceiverID = 3);


-- 6. To display event details and the details of their attendees

SELECT Event.*, tbl_user.*
FROM EventAttendee
INNER JOIN tbl_user ON tbl_user.userID = EventAttendee.AttendeeID
INNER JOIN Event ON Event.EventID = EventAttendee.EventID
WHERE Event.EventID = 1;


-- 7. Retrieve all messages between two users

SELECT Message.*  
FROM Message
INNER JOIN tbl_user ON tbl_user.userID = Message.ReceiverID
WHERE Message.SenderID = 3;
----------------
-- QUESTION 2 THIS WEEK'S ASSIGNMENT
----------------

----------------
--User Table:
----------------
-- Retrieve all users
SELECT * FROM tbl_user

-- Retrieve user by UserID

SELECT * FROM tbl_user
WHERE userID= 1

-- Retrieve users in a specific location

SELECT * FROM tbl_user
WHERE Location='Location 1'

-- Update user information
UPDATE tbl_user
SET
    Username = 'newuser',
    Email = 'newuser@gmail.com',
    Password = 'newpassword',
    TagName = 'newtagname',
    Location = 'newlocation'
WHERE
    userID = 1;
    GO


-- Delete a user

DELETE FROM tbl_user
WHERE userID = 2;

----------------
--Post Table:
----------------
-- Retrieve all posts

SELECT * FROM Post

-- Retrieve posts for a specific user

SELECT * FROM Post
WHERE userID= 1

-- Retrieve posts with more than 10 likes

SELECT * FROM Post
WHERE likes > 10

-- Update post content

UPDATE Post
SET
    content = 'new content'
FROM
    Post
INNER JOIN tbl_user ON Post.UserID = tbl_user.userID
WHERE
    PostID = 1 AND tbl_user.userID = 1;


-- Delete a post

DELETE FROM Post 
WHERE PostID= 1


----------------
--Comment Table:
----------------
-- Retrieve all comments

SELECT * FROM Comment

-- Retrieve comments for a specific post
SELECT * FROM Comment WHERE PostID = 1;

-- Retrieve comments by a specific user
SELECT * FROM Comment WHERE UserID = 2;

-- Update comment content

UPDATE Comment
SET Content = 'Updated content'
WHERE CommentID = 1;

-- Delete a comment
DELETE FROM Comment WHERE CommentID = 2;

-------------------
--Friendship Table:
-------------------
-- Retrieve all friendships

SELECT * FROM Friendship


-- Retrieve friendships for a specific user
SELECT * FROM Friendship 
WHERE User1ID = 1;

-- Update friendship date
UPDATE Friendship
SET FriendshipDate = GETDATE()
WHERE FriendshipID = 1;

-- Delete a friendship
DELETE FROM Friendship WHERE FriendshipID = 2;

----------------
--Photo Table:
----------------
-- Retrieve all photos
SELECT * FROM Photo


-- Retrieve photos for a specific user

SELECT * FROM Photo 
WHERE UserID = 3;

-- Update photo URL

UPDATE Photo
SET PhotoURL = 'new_url'
WHERE PhotoID = 1;


-- Delete a photo
DELETE FROM Photo 
WHERE PhotoID = 2;

----------------
--Group Table:
----------------
-- Retrieve all groups
SELECT * FROM tbl_Group;

-- Retrieve a group by GroupID
SELECT * FROM tbl_Group 
WHERE GroupID = 2;

-- Update group information
UPDATE tbl_Group
SET Description = 'Updated description'
WHERE GroupID = 1;

-- Delete a group

DELETE FROM tbl_Group WHERE GroupID = 2;

------------------------
--GroupMembers Table:
-------------------------
-- Retrieve all group members
SELECT * FROM GroupMembers;

-- Retrieve members of a specific group
-- Replace '1' with the desired GroupID
SELECT * FROM GroupMembers 
WHERE GroupID = 1;


-- Remove a member from a group
DELETE FROM GroupMembers 
WHERE GroupID = 1 AND MemberID = 2;

----------------
--Event Table:
----------------
-- Retrieve all events
SELECT * FROM Event;

-- Retrieve events with a specific location
SELECT * FROM Event 
WHERE Location = 'Location 1';

-- Update event information

UPDATE Event
SET EventName = 'Updated Event'
WHERE EventID = 1;

-- Delete an event
DELETE FROM Event 
WHERE EventID = 2;

-------------------------
--EventAttendee Table:
-------------------------

-- Retrieve all event attendees
SELECT * FROM EventAttendee 
WHERE EventID = 1;

-- Retrieve attendees for a specific event

SELECT * FROM EventAttendee 
WHERE EventID = 1;


-- Remove an attendee from an event
DELETE FROM EventAttendee 
WHERE EventID = 1 AND AttendeeID = 2;

---------------------
--Message Table:
---------------------
-- Retrieve all messages
SELECT * FROM Message;

-- Retrieve messages between two users

SELECT * FROM Message 
WHERE (SenderID = 1 AND ReceiverID = 2) OR (SenderID = 2 AND ReceiverID = 1);

-- Update message content

UPDATE Message
SET Content = 'Updated message content'
WHERE MessageID = 1 AND (SenderID = 1 OR ReceiverID = 1);


-- Delete a message
DELETE FROM Message WHERE MessageID = 2;
