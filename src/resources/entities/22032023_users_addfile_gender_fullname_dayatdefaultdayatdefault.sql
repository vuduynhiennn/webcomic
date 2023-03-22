-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th3 22, 2023 lúc 03:31 PM
-- Phiên bản máy phục vụ: 8.0.32-0ubuntu0.22.04.2
-- Phiên bản PHP: 8.1.2-1ubuntu2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `nettruyen`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `userid` int NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `gmail` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'https://www.rd.com/wp-content/uploads/2021/01/GettyImages-588935825.jpg',
  `dayat` datetime DEFAULT CURRENT_TIMESTAMP,
  `fullname` varchar(40) DEFAULT 'anonymous',
  `gender` varchar(6) DEFAULT 'khác'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`userid`, `username`, `pass`, `gmail`, `avatar`, `dayat`, `fullname`, `gender`) VALUES
(22, 'vuduynhien', '1', NULL, NULL, NULL, 'anonymous', 'khác'),
(23, 'vuduynhienx', 'x', NULL, NULL, NULL, 'anonymous', 'khác'),
(24, 'concactao', '1', NULL, NULL, NULL, 'anonymous', 'khác'),
(25, 'hellocu', '1', NULL, NULL, NULL, 'anonymous', 'khác'),
(26, 'ketu', '1', NULL, NULL, NULL, 'anonymous', 'khác'),
(27, 'concac', '1', NULL, NULL, NULL, 'anonymous', 'khác'),
(28, 'cacs', 'cacs', NULL, NULL, NULL, 'anonymous', 'khác'),
(29, 'daubuoix', '1', NULL, NULL, NULL, 'anonymous', 'khác'),
(30, 'conchi', '1', NULL, NULL, NULL, 'anonymous', 'khác'),
(32, 'toilanhien', '1', 'nhienduyvu@gmail.com', NULL, NULL, 'Vũ Duy Nhiên', 'nam'),
(33, NULL, NULL, NULL, 'https://www.rd.com/wp-content/uploads/2021/01/GettyImages-588935825.jpg', '2023-03-22 13:32:11', 'anonymous', 'khác'),
(34, 'ditkoe', '1', NULL, 'https://www.rd.com/wp-content/uploads/2021/01/GettyImages-588935825.jpg', '2023-03-22 15:25:35', 'anonymous', 'khác'),
(35, 'xingchao', '1', 'vuduynhiencute@gmail.com', 'https://www.rd.com/wp-content/uploads/2021/01/GettyImages-588935825.jpg', '2023-03-22 15:30:11', 'Ngô Bá Khá', 'nam');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `gmail` (`gmail`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `userid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
