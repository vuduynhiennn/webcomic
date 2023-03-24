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
  `uploadTime` datetime
);

INSERT INTO `chapters`(`id`, `comicid`, `comicLocalId`, `name`, `uploadTime`)
VALUES(NULL, '2', '', 'Chap 1', NULL),
(NULL, '3', '', 'Chap 1', NULL),
(NULL, '1', '', 'Chap 2', NULL),
(NULL, '2', '', 'Chap 2', NULL),
(NULL, '3', '', 'Chap 2', NULL),
(NULL, '1', '', 'Chap 3', NULL),
(NULL, '2', '', 'Chap 3', NULL);

-- SELECT * FROM chapters WHERE id=(SELECT max(id) FROM chapters WHERE comicid=3)