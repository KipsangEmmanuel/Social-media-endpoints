CREATE TABLE Friendship(
    FriendshipID VARCHAR(255) PRIMARY KEY,
    userID VARCHAR(255),
    friendID VARCHAR(255),
    Friendship_date TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (friendID) REFERENCES Users(userID)
);

   INSERT INTO Friendship (FriendshipID, userID, friendID)
    VALUES
    ('1', '1', '2'),
    ('2', '2', '3'),
    ('3', '2', '4'),
    ('4', '1', '5'),
    ('5', '4', '5'),
    ('6', '1', '6'),
    ('7', '2', '10'),
    ('8', '6', '8');


DROP TABLE Friendship

-- SELECT Friendship.FriendshipID, Users.userID, Users.username, Users.email, Users.location  
-- FROM Friendship
-- INNER JOIN Users ON Users.userID = Friendship.friendID
-- WHERE Friendship.userID = '2';



-- SELECT * FROM Friendship CROSS JOIN Users
-- WHERE Users.userID='1'
