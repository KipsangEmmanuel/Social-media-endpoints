CREATE TABLE EventAttendee(
    eventID VARCHAR(255),
    attendeeID VARCHAR(255)
    FOREIGN KEY(eventID) REFERENCES Event(eventID),
    FOREIGN KEY(attendeeID) REFERENCES Users(userID)
)


INSERT INTO EventAttendee (eventID, attendeeID)
VALUES
    ('1', '1'),
    ('1', '2'),
    ('2', '3'),
    ('2', '4'),
    ('3', '5'),
    ('4', '6'),
    ('5', '7'),
    ('6', '8'),
    ('7', '9'),
    ('8', '10');


SELECT * FROM EventAttendee

DROP TABLE EventAttendee