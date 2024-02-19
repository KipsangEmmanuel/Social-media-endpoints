-- USE SOCIAL_MEDIA
CREATE TABLE Comment(
    CommentID VARCHAR(255) PRIMARY KEY,
    UserID VARCHAR(255),
    PostID VARCHAR(255),
    content VARCHAR(250) NOT NULL,
    comment_date TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(userID),
    FOREIGN KEY (PostID) REFERENCES Posts(postID)
);

SELECT * FROM Comment

INSERT INTO Comment (CommentID, UserID, PostID, content)
VALUES
    ('1', '1', '1', 'Great post!'),
    ('2', '2', '2', 'Interesting discussion!'),
    ('3', '3', '3', 'I have a question.'),
    ('4', '4', '4', 'Thanks for sharing!'),
    ('5', '5', '5', 'I totally agree!'),
    ('6', '6', '6', 'What are your thoughts?'),
    ('7', '7', '7', 'Keep up the good work!'),
    ('8', '8', '8', 'This helped me a lot.'),
    ('11', '5', '3', 'This will be the best thing.'),
    ('8', '4', '3', 'This helped me a lot.'),
    ('9', '9', '9', 'Nice job!'),
    ('10', '10','10', 'I appreciate your insights.');


DROP TABLE Comment
ALTER TABLE Comment


-- SELECT 
--     Comment.CommentID,
--     Users.userID,
--     Users.username,
--     Users.email,
--     Posts.postID,
--     Posts.content AS post_content,
--     Comment.content AS comment_content,
--     Photos.photoURL
-- FROM 
--     Comment
-- INNER JOIN 
--     Users ON Users.userID = Comment.UserID
-- INNER JOIN 
--     Posts ON Posts.postID = Comment.PostID
-- LEFT JOIN 
--     Photos ON Photos.userID = Users.userID
-- WHERE 
--     Posts.postID = '3';
