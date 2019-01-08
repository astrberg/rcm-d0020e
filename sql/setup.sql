CREATE USER 'java'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON * . * TO 'java'@'localhost';


CREATE SCHEMA IF NOT EXISTS `db` DEFAULT CHARACTER SET utf8 ;
USE `db` ;
CREATE TABLE `station_data` (
  `id` char(20) NOT NULL,
  `lat` float DEFAULT NULL,
  `lon` float DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `road_number` int(10) DEFAULT NULL,
  `county_number` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;


CREATE TABLE `weather_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `station_id` char(20) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  `road_temperature` float DEFAULT NULL,
  `air_temperature` float DEFAULT NULL,
  `air_humidity` float DEFAULT NULL,
  `wind_speed` float DEFAULT NULL,
  `wind_direction` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `station_id` (`station_id`),
  CONSTRAINT `weather_data_ibfk_1` FOREIGN KEY (`station_id`) REFERENCES `station_data` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

