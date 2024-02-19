CREATE TABLE Message (
    messageID VARCHAR(255) PRIMARY KEY,
    senderID VARCHAR(255),
    receiverID VARCHAR(255),
    Content VARCHAR(500),
    message_date TIMESTAMP,
    FOREIGN KEY (senderID) REFERENCES Users(userID),
    FOREIGN KEY (receiverID) REFERENCES Users(userID)
);


INSERT INTO Message (messageID, senderID, receiverID, Content)
VALUES
    ('1', '1', '2', 'Hello user2! How are you?' ),
    ('2', '2', '1', 'Hi user1! Im doing well, thank you!'),
    ('3', '1', '3', 'Hey there, user3! Whats up?'),
    ('4', '3', '1', 'Not much, just relaxing. How about you?'),
    ('5', '2', '3', 'Hello user3! Hows your day going?'),
    ('6', '3', '2', 'Hi user2! Its going well, thanks!'),
    ('7', '1', '4', 'Greetings user4! Any exciting plans today?'),
    ('8', '4', '1', 'Not really, just the usual. How about you?'),
    ('9', '2', '4', 'Hey user4! Have you seen the latest movie?'),
    ('10', '4', '2', 'Yes, it was great! I highly recommend it.');

SELECT * FROM Message

DROP TABLE Message