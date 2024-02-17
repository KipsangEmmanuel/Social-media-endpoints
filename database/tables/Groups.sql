CREATE TABLE tbl_Group(
groupID VARCHAR(255) PRIMARY KEY,
group_name VARCHAR (250) NOT NULL,
description VARCHAR(500) NOT NULL,
createdDate TIMESTAMP
)


INSERT INTO tbl_Group (groupID, group_name, description)
VALUES
    ('1', 'TeamA', 'A wonderful team for projects'),
    ('2', 'Study Group', 'Group for studying together'),
    ('3', 'Book Club', 'Discussing and sharing favorite books'),
    ('4', 'Fitness Enthusiasts', 'Stay fit and healthy together'),
    ('5', 'Photography Club', 'Capturing moments through lenses'),
    ('6', 'Cooking Enthusiasts', 'Sharing recipes and culinary tips'),
    ('7', 'Tech Innovators', 'Exploring the latest in technology'),
    ('8', 'Language Exchange', 'Learning and practicing languages'),
    ('9', 'Music Lovers', 'Discovering and sharing favorite tunes'),
    ('10', 'Artists Collective', 'Expressing creativity through art');
