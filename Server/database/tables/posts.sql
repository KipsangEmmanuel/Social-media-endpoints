-- USE SOCIAL_MEDIA

CREATE TABLE Posts(
    postID VARCHAR(255) PRIMARY KEY,
    userID VARCHAR(255) ,
    content VARCHAR(250) NOT NULL,
    post_date VARCHAR(250) NOT NULL,
    likes VARCHAR(250) NOT NULL,
    comments VARCHAR(250) NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID)
)


INSERT INTO Posts (postID, userID, content, post_date, likes, comments)
VALUES
    ('1', '1', 'Exciting day at the beach!', '2024-02-08 10:00:00', '50', '15'),
    ('2', '2', 'Just finished a great book!', '2024-02-08 12:30:00', '25', '8'),
    ('3', '3', 'Exploring the city vibes.', '2024-02-08 14:45:00', '40', '12'),
    ('4', '4', 'Delicious homemade dinner tonight.', '2024-02-08 18:15:00', '35', '20'),
    ('5', '5', 'New coding project underway!', '2024-02-08 09:30:00', '60', '25'),
    ('6', '6', 'Gaming marathon with friends.', '2024-02-08 20:00:00', '30', '18'),
    ('7', '7', 'Art exhibition opening tonight.', '2024-02-08 16:30:00', '45', '10'),
    ('8', '8', 'Lost in a captivating novel.', '2024-02-08 11:00:00', '55', '22'),
    ('9', '9', 'Algorithm optimization success!', '2024-02-08 13:45:00', '75', '30'),
    ('10', '10', 'Dreaming big for the future.', '2024-02-08 15:00:00', '65', '28');



SELECT * FROM PostS

-- INSERT INTO Posts (postID, userID, content, post_date, likes, comments)
-- VALUES
--   ('101', '1', 'This is a post by John Doe.', '2024-02-08', '10', '3'),
--   ('102', '2', 'Hello, world!', '2024-02-09', '5', '2'),
--   ('103', '1', 'Another post by John Doe.', '2024-02-10', '15', '7');


DROP TABLE Posts