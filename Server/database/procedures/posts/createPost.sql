CREATE PROCEDURE createPost (
    @PostID VARCHAR(255),
    @UserID VARCHAR(255),
    @Content TEXT,
    @PostDate DATETIME,
    @Likes INT,
    @Comments INT
)

AS
BEGIN

SELECT 
  p.PostID,
  p.UserID,
  p.Content,
  p.PostDate,
  p.Likes AS PostLikes,
  p.Comments AS PostComments,
  COUNT(c.CommentID) AS TotalComments,
  SUM(LEN(c.CommentContent)) AS TotalCommentLength
FROM Post p
LEFT JOIN Comment c ON p.PostID = c.PostID
GROUP BY p.PostID, p.UserID, p.Content, p.PostDate, p.Likes, p.Comments;
END
