-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2023 at 07:05 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aswpro`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `commentID` int(11) NOT NULL,
  `reportID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `commentText` varchar(50) NOT NULL,
  `timeStamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`commentID`, `reportID`, `userID`, `commentText`, `timeStamp`) VALUES
(2, 1, 2, 'first comment1', '2023-11-07 20:27:59'),
(4, 1, 2, 'first comment1', '2023-11-07 20:28:05'),
(5, 5, 2, 'first comment1', '2023-11-07 20:28:13'),
(6, 4, 2, 'first comment1', '2023-11-07 20:28:21'),
(7, 4, 1, 'first comment1', '2023-11-07 20:28:36'),
(8, 1, 1, 'first comment1', '2023-11-07 20:28:39'),
(9, 5, 1, 'first comment1', '2023-11-07 20:28:47'),
(10, 5, 9, 'first comment1', '2023-11-07 20:28:52'),
(11, 5, 6, 'first comment1', '2023-11-10 10:42:19'),
(12, 6, 8, 'first comment1', '2023-11-10 10:44:23'),
(13, 6, 8, 'first comment12', '2023-11-10 11:02:26'),
(14, 6, 8, 'first comment123', '2023-11-10 11:02:33'),
(15, 2, 6, 'hi', '2023-11-24 13:21:44');

-- --------------------------------------------------------

--
-- Table structure for table `datasource`
--

CREATE TABLE `datasource` (
  `SourceID` int(11) NOT NULL,
  `Sourcename` varchar(20) NOT NULL,
  `Sourcetype` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `datasource`
--

INSERT INTO `datasource` (`SourceID`, `Sourcename`, `Sourcetype`) VALUES
(1, 'Test Source', 'image'),
(10, 'Updated Source', 'Updated Type'),
(11, 'Updated Source', 'Updated Type');

-- --------------------------------------------------------

--
-- Table structure for table `environment`
--

CREATE TABLE `environment` (
  `DataID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `SourceID` int(11) NOT NULL,
  `TimeStamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `AirQuality` int(11) NOT NULL,
  `Humidity` int(11) NOT NULL,
  `WaterQuality` varchar(24) NOT NULL,
  `BiodiversityMetrics` varchar(20) NOT NULL,
  `WindSpeed` int(11) NOT NULL,
  `RainFall` int(11) NOT NULL,
  `PollutionLevels` varchar(20) NOT NULL,
  `SoilQuality` varchar(20) NOT NULL,
  `UvIndex` int(11) NOT NULL,
  `NoiseLevels` varchar(20) NOT NULL,
  `Weather` varchar(45) NOT NULL,
  `EventDescription` varchar(45) NOT NULL,
  `Note` varchar(45) NOT NULL,
  `reportFake` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `environment`
--

INSERT INTO `environment` (`DataID`, `UserID`, `SourceID`, `TimeStamp`, `AirQuality`, `Humidity`, `WaterQuality`, `BiodiversityMetrics`, `WindSpeed`, `RainFall`, `PollutionLevels`, `SoilQuality`, `UvIndex`, `NoiseLevels`, `Weather`, `EventDescription`, `Note`, `reportFake`) VALUES
(1, 8, 1, '2023-12-26 15:38:08', 25, 60, 'Good', 'High', 10, 1, 'Low', 'Fertile', 5, 'Low', 'Sunny', 'Sunny day with clear skies', 'No notable observations', -2),
(2, 8, 1, '2023-12-26 16:39:01', 25, 60, 'Good', 'High', 10, 1, 'Low', 'Fertile', 5, 'Low', 'Sunny', 'Sunny day with clear skies', 'No notable observations', -2),
(8, 8, 1, '2023-11-10 11:29:35', 25, 60, 'Good', 'High', 10, 1, 'Low', 'Fertile', 5, 'Low', 'Sunny', 'Sunny day with clear skies', 'No notable observations', 0),
(9, 8, 1, '2023-12-26 15:38:34', 25, 60, 'Good', 'High', 10, 1, 'Low', 'Fertile', 5, 'Low', 'Sunny', 'Sunny day with clear skies', 'No notable observations', -1),
(10, 7, 1, '2023-12-26 17:03:48', 25, 60, 'Good', 'High', 10, 1, 'Low', 'Fertile', 5, 'Low', 'Sunny', 'Sunny day with clear skies', 'No notable observations', -1),
(11, 6, 0, '2023-12-26 17:43:02', 0, 70, 'potable', 'high', 13, 20, 'low', 'rich', 5, 'moderate', 'sunny', 'some_description', 'some_note', 0),
(12, 6, 0, '2023-12-26 18:00:41', 0, 70, 'potable', 'high', 13, 20, 'low', 'rich', 5, 'moderate', 'sunny', 'some_description', 'some_note', 0);

-- --------------------------------------------------------

--
-- Table structure for table `env_parameters`
--

CREATE TABLE `env_parameters` (
  `id` int(11) NOT NULL,
  `environment_parameter` varchar(255) DEFAULT NULL,
  `current_value` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `env_parameters`
--

INSERT INTO `env_parameters` (`id`, `environment_parameter`, `current_value`) VALUES
(1, 'air quality', 55),
(2, 'humidity', 25),
(3, 'wind speed', 40),
(4, 'pollution level', 15),
(5, 'temperature', 27);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `ImageID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `ImageURL` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`ImageID`, `UserID`, `ImageURL`) VALUES
(1, 2, 'HHHH'),
(2, 2, 'HHHHNSKDHGHG'),
(3, 2, 'HHHHNSKDXSADHGHG');

-- --------------------------------------------------------

--
-- Table structure for table `messagess`
--

CREATE TABLE `messagess` (
  `id` int(11) NOT NULL,
  `sender_name` varchar(50) NOT NULL,
  `receiver_name` varchar(50) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `message` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messagess`
--

INSERT INTO `messagess` (`id`, `sender_name`, `receiver_name`, `timestamp`, `message`) VALUES
(18, 'noor', 'batool', '2023-11-26 19:45:38', 'Hefgdfgdfgjjjjj12l.'),
(19, 'noor', 'batool', '2023-11-26 19:45:42', 'Hefgdfgdfgjjjjj1sdfds2l.'),
(20, 'noor', 'batool', '2023-11-26 19:46:34', 'Hefgdfgdfgjjjjj1sdfds2l.');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `reportID` int(11) NOT NULL,
  `reportType` varchar(20) NOT NULL,
  `location` varchar(20) NOT NULL,
  `descreption` varchar(40) NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`reportID`, `reportType`, `location`, `descreption`, `userID`) VALUES
(1, 'type', 'nabluse', ' hi', 0),
(2, 'type', 'nabluse', ' hi', 0),
(3, 'type', 'nabluse', ' hi', 0),
(4, 'AirQuality', 'Gaza', 'Pollution with white phosphorus and dust', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(20) NOT NULL,
  `Email` varchar(20) NOT NULL,
  `location` varchar(20) NOT NULL,
  `interests` varchar(20) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `score` int(11) DEFAULT 0,
  `badge` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `Username`, `Email`, `location`, `interests`, `Password`, `score`, `badge`) VALUES
(6, 'batool', 'batool@gmail.com', 'nablus', 'animals', '$2b$10$nz0gzqm6zXQoica2bEonUOLmeEyDvFXi/MqSakb5Xj4JOeSmKpYzG', 41, 'Bronze'),
(7, 'batool', 'batool@gmail.com', 'nablus', 'animals', '$2b$10$HE8OeGSN5251090YUhp0Oejbc4jekN9lTkXh0Ie9OOjuSIpbl/Go2', 98, 'Silver'),
(8, 'maha', 'maha@gmail.com', 'nablus', 'animals', '$2b$10$pGq4BCedFCTcL0.1PIMNV.2Aeoe8c1LAP3U0BFgC/.VkxfQnI7yEu', 50, 'Silver'),
(9, 'testuser', 'test@example.com', 'Test Location', 'Test Interests', '$2b$10$LtdCRSYsq4Ej36Yxrnan3u5h2y9moHRb3WcpabTUQmsuN/ZSh2soC', 20, 'Bronze'),
(10, 'noor', 'batool@gmail2.com', 'nablus', 'animals', '$2b$10$E2iqK.X5UHAIcZFsfSyazuwtN87y4.tcXp/F4qBLJpcWJXUI/cpn6', 30, 'Bronze');

-- --------------------------------------------------------

--
-- Table structure for table `user_alerts`
--

CREATE TABLE `user_alerts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `environmental_id` int(11) NOT NULL,
  `threshold` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_alerts`
--

INSERT INTO `user_alerts` (`id`, `user_id`, `environmental_id`, `threshold`) VALUES
(1, 6, 1, '50'),
(3, 9, 2, '30\n'),
(10, 8, 2, '20'),
(11, 8, 5, '40'),
(12, 6, 4, '30'),
(13, 6, 3, '30'),
(15, 6, 2, '20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentID`);

--
-- Indexes for table `datasource`
--
ALTER TABLE `datasource`
  ADD PRIMARY KEY (`SourceID`);

--
-- Indexes for table `environment`
--
ALTER TABLE `environment`
  ADD PRIMARY KEY (`DataID`);

--
-- Indexes for table `env_parameters`
--
ALTER TABLE `env_parameters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`ImageID`);

--
-- Indexes for table `messagess`
--
ALTER TABLE `messagess`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`reportID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `user_alerts`
--
ALTER TABLE `user_alerts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_environmental_id` (`environmental_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `commentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `datasource`
--
ALTER TABLE `datasource`
  MODIFY `SourceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `environment`
--
ALTER TABLE `environment`
  MODIFY `DataID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `env_parameters`
--
ALTER TABLE `env_parameters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `ImageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `messagess`
--
ALTER TABLE `messagess`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `reportID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_alerts`
--
ALTER TABLE `user_alerts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_alerts`
--
ALTER TABLE `user_alerts`
  ADD CONSTRAINT `fk_environmental_id` FOREIGN KEY (`environmental_id`) REFERENCES `env_parameters` (`id`),
  ADD CONSTRAINT `user_alerts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
