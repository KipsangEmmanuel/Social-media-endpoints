CREATE TABLE Photos (
    photoID VARCHAR(255) PRIMARY KEY,
    userID VARCHAR(255),
    photoURL VARCHAR(255) NOT NULL,
    uploadDate  TIMESTAMP,
    profile_img BIT DEFAULT 0,
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

INSERT INTO Photos (photoID, userID, photoURL, profile_img)
VALUES
    ('1', '1', 'https://cdn.pixabay.com/photo/2019/08/01/05/59/girl-4376755_1280.jpg', 0),
    ('2', '2', 'https://cdn.pixabay.com/photo/2019/08/01/05/59/girl-4376755_1280.jpg', 0),
    ('3', '3', 'https://cdn.pixabay.com/photo/2019/08/01/05/59/girl-4376755_1280.jpg', 0),
    ('4', '4', 'https://cdn.pixabay.com/photo/2017/02/17/17/09/model-2074602_1280.jpg',  0),
    ('5', '5', 'https://cdn.pixabay.com/photo/2021/04/01/21/25/alone-boy-6143295_1280.jpg', 0),
    ('6', '6', 'https://cdn.pixabay.com/photo/2021/03/27/19/25/alone-boy-6129399_1280.jpg', 0),
    ('7', '7', 'https://cdn.pixabay.com/photo/2017/02/17/17/09/model-2074602_1280.jpg', 0),
    ('8', '8', 'https://cdn.pixabay.com/photo/2021/04/01/21/25/alone-boy-6143295_1280.jpg',  0),
    ('9', '9', 'https://cdn.pixabay.com/photo/2017/02/17/17/09/model-2074602_1280.jpg', 0),
    ('10', '10', 'https://cdn.pixabay.com/photo/2021/03/27/19/25/alone-boy-6129399_1280.jpg',  0);




SELECT * FROM Photos

DROP TABLE Photos

SELECT Users.username, Users.tag_name, Photos.photoURL
FROM Photos

WHERE USERS.userID='2'


SELECT
  (SELECT username FROM Users WHERE userID = '2') AS username,
  (SELECT tag_name FROM Users WHERE userID = '2') AS tag_name,
  (SELECT photoURL FROM Photos WHERE userID = '2') AS photoURL;