CREATE TABLE `Comics` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) CHARSET utf8,
  `author` varchar(255) CHARSET utf8,
  `image` varchar (1000),
   `tag` varchar(255)  CHARSET utf8,
  `status` int,
  `views` int
);

CREATE TABLE `Chapters` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `comicid` int,
  `comicLocalId` int,
  `name` varchar(255),
  `uploadTime` datetime,
  `imagenumber` int
);

CREATE TABLE `UserFollowingComics` (
  `userid` int FOREIGN KEY REFERENCES `users` (`userid`),
  `comicid` int FOREIGN KEY REFERENCES `Comics`(`id`)
);


-- SELECT * FROM chapters WHERE id=(SELECT max(id) FROM chapters WHERE comicid=3)