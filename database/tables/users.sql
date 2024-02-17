USE SOCIAL_MEDIA

CREATE TABLE Users(
    userID VARCHAR(255) PRIMARY KEY,
    username VARCHAR(250) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    tag_name VARCHAR(250) NOT NULL,
    location VARCHAR(255) NOT NULL
)


INSERT INTO Users (userID, username, email, password, tag_name, location)
VALUES
    ('1', 'JohnDoe', 'john.doe@example.com', 'hashed_password_1', 'Explorer', 'CityA'),
    ('2', 'AliceSmith', 'alice.smith@example.com', 'hashed_password_2', 'Adventurer', 'CityB'),
    ('3', 'BobJohnson', 'bob.johnson@example.com', 'hashed_password_3', 'Traveler', 'CityC'),
    ('4', 'EvaWilliams', 'eva.williams@example.com', 'hashed_password_4', 'Foodie', 'CityD'),
    ('5', 'ChrisBrown', 'chris.brown@example.com', 'hashed_password_5', 'Techie', 'CityE'),
    ('6', 'OliviaJones', 'olivia.jones@example.com', 'hashed_password_6', 'Gamer', 'CityF'),
    ('7', 'DavidMiller', 'david.miller@example.com', 'hashed_password_7', 'Artist', 'CityG'),
    ('8', 'SophieWilson', 'sophie.wilson@example.com', 'hashed_password_8', 'Reader', 'CityH'),
    ('9', 'MichaelLee', 'michael.lee@example.com', 'hashed_password_9', 'Coder', 'CityI'),
    ('10', 'EmmaDavis', 'emma.davis@example.com', 'hashed_password_10', 'Dreamer', 'CityJ');


SELECT * FROM Users
DROP TABLE Users  


SELECT Users.username, Users.tag_name, Photos.photoURL
FROM Users
INNER JOIN Photos ON Users.userID = Photos.userID
WHERE USERS.userID='2'




