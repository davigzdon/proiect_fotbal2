-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2026 at 10:43 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fc_progamare_web`
--

-- --------------------------------------------------------

--
-- Table structure for table `jucatori`
--

CREATE TABLE `jucatori` (
  `id` int(11) NOT NULL,
  `nume_jucator` varchar(100) NOT NULL,
  `pozitie` varchar(50) NOT NULL,
  `poza` varchar(255) NOT NULL,
  `statistica1` varchar(100) NOT NULL,
  `statistica2` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jucatori`
--

INSERT INTO `jucatori` (`id`, `nume_jucator`, `pozitie`, `poza`, `statistica1`, `statistica2`) VALUES
(1, 'Popa Marius', 'Portar', 'imagine_portar.jfif', 'Parade: 26', 'Meciuri fără gol: 10'),
(2, 'Cristea Andrei', 'Atacant', 'imagine_atacant.jfif', 'Goluri: 15', 'Pase decisive: 4');

-- --------------------------------------------------------

--
-- Table structure for table `utilizatori`
--

CREATE TABLE `utilizatori` (
  `id` int(11) NOT NULL,
  `nume` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `parola` varchar(255) NOT NULL,
  `rol` varchar(20) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `utilizatori`
--

INSERT INTO `utilizatori` (`id`, `nume`, `email`, `parola`, `rol`) VALUES
(1, 'david', 'david@gmail.com', '$2y$10$PARzD/mZ00mfzEiKRH1vLuhp1ChQy1aaJSOKB8wrTNIsfnFw2HQ1u', 'user'),
(2, 'davidu', 'davidu@gmail.com', '$2y$10$I1lj64uRMhu4/XCEQlxU8uPwRrZMoIz4ymd3j2RFD6JpQW4hwuChO', 'user'),
(3, 'david145', 'davidut@gmail.com', '$2y$10$yrRYBcA6zSihLBngllUA6uLJD0fzFk/zDmCT.RF3uuPwg6kuAqS0q', 'admin'),
(4, 'davidutu', 'davidutu@gmail.com', '$2y$10$xjlXQ3wphYT3MD38Z8YQhe6GzVbN61V7p0Nn8EjqghMaCMK/1LNS6', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jucatori`
--
ALTER TABLE `jucatori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `utilizatori`
--
ALTER TABLE `utilizatori`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jucatori`
--
ALTER TABLE `jucatori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `utilizatori`
--
ALTER TABLE `utilizatori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
