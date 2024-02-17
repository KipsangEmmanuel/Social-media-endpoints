CREATE TABLE GroupMembers(
groupMembersID VARCHAR(255),
groupID VARCHAR(255),
memberID VARCHAR(255),
FOREIGN KEY (groupID) REFERENCES tbl_Group(groupID),
FOREIGN KEY (memberID) REFERENCES Users(userID)
)

INSERT INTO GroupMembers (groupMembersID, groupID, memberID)
VALUES
    ('1', '1', '1'),
    ('2', '1', '2'),
    ('3', '1', '3'),
    ('4', '2', '4'),
    ('5', '2', '5'),
    ('6', '3', '6'),
    ('7', '4', '7'),
    ('8', '5', '8'),
    ('9', '6', '9'),
    ('10', '7', '10');

SELECT tbl_Group.groupID,tbl_Group.group_name,Users.userID,Users.username,Users.location 
FROM GroupMembers
INNER JOIN Users ON Users.userID=GroupMembers.memberID
INNER JOIN tbl_Group ON tbl_Group.groupID=GroupMembers.groupID

WHERE GroupMembers.groupID='2'
