CREATE TABLE Likes (
    LikeID VARCHAR(255) PRIMARY KEY,
    UserID VARCHAR(255),
    PostID VARCHAR(255),
    like_date TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (PostID) REFERENCES Posts(PostID)
);

INSERT INTO Likes (LikeID, UserID, PostID)
VALUES
    ('1', '1', '1'),
    ('2', '2', '2'),
    ('3', '3', '3'),
    ('4', '4', '4'),
    ('5', '1', '5'),
    ('6', '2', '6'),
    ('7', '3', '7'),
    ('8', '4', '8'),
    ('9', '1', '9'),
    ('10', '2', '10');

SELECT * FROM Likes

DROP TABLE Likes