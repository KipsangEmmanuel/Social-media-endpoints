CREATE TABLE Event(
    eventID VARCHAR(255) PRIMARY KEY,
    eventName VARCHAR(250) NOT NULL,
    description VARCHAR(500) NOT NULL,
    location VARCHAR(250) NOT NULL,
    eventPosterUrl VARCHAR(500) NOT NULL,
    event_date DATETIME DEFAULT GETDATE()
);

INSERT INTO Event (eventID, eventName, description, location, eventPosterUrl)
VALUES
    ('1', 'Tech Meetup', 'Explore the latest in technology', 'Tech Hub', 'https://example.com/poster1.jpg'),
    ('2', 'Fitness Workshop', 'Stay fit and healthy', 'Fitness Center', 'https://example.com/poster2.jpg'),
    ('3', 'Art Exhibition', 'Showcasing local artists', 'Art Gallery', 'https://example.com/poster3.jpg'),
    ('4', 'Book Club Gathering', 'Discussing the latest book', 'Library', 'https://example.com/poster4.jpg'),
    ('5', 'Music Concert', 'Live performance by renowned artists', 'Concert Hall', 'https://example.com/poster5.jpg'),
    ('6', 'Food Festival', 'Taste a variety of delicious cuisines', 'City Park', 'https://example.com/poster6.jpg'),
    ('7', 'Language Exchange Meetup', 'Practice and learn new languages', 'Community Center', 'https://example.com/poster7.jpg'),
    ('8', 'Movie Night', 'Enjoy a movie under the stars', 'Outdoor Theater', 'https://example.com/poster8.jpg'),
    ('9', 'Science Fair', 'Discover exciting scientific experiments', 'Science Museum', 'https://example.com/poster9.jpg'),
    ('10', 'Charity Gala', 'Support a noble cause', 'Convention Center', 'https://example.com/poster10.jpg');

SELECT * FROM Event


DROP TABLE Event

SELECT event_date, CONVERT(VARCHAR, event_date, 120) AS formatted_date
FROM Event;

