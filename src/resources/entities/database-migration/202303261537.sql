ALTER TABLE `users` CHANGE `userid` `userid` INT(11) NOT NULL AUTO_INCREMENT;


CREATE TABLE `users` (
  `userid` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `gmail` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) ,
  `dayat` datetime DEFAULT CURRENT_TIMESTAMP,
  `fullname` varchar(40) DEFAULT 'anonymous',
  `gender` varchar(6) DEFAULT 'khác',
  `point` int DEFAULT 0
)

CREATE TABLE `history` (
  `idhistory` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `userid` int,
  `comicid` int,
  `chapterid` int
)

ALTER TABLE `chapters` CHANGE `name` `chap` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;
