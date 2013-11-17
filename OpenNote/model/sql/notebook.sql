SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `folder`;
CREATE TABLE IF NOT EXISTS `folder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parrentFolderID` int(11) DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `parrentFolderID` (`parrentFolderID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5382 ;

DROP TABLE IF EXISTS `note`;
CREATE TABLE IF NOT EXISTS `note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `folderID` int(11) NOT NULL,
  `originNoteID` int(11) DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `note` longtext,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `originNote` (`originNoteID`),
  KEY `folderID` (`folderID`),
  KEY `userID` (`userID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5484 ;

DROP TABLE IF EXISTS `uploads`;
CREATE TABLE IF NOT EXISTS `uploads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `originalName` varchar(255) NOT NULL,
  `diskName` varchar(255) NOT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `lastLoginIP` varchar(255) NOT NULL,
  `lastLoginTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;


ALTER TABLE `folder`
  ADD CONSTRAINT `folder_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `folder_ibfk_2` FOREIGN KEY (`parrentFolderID`) REFERENCES `folder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `note`
  ADD CONSTRAINT `note_ibfk_3` FOREIGN KEY (`originNoteID`) REFERENCES `note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `note_ibfk_4` FOREIGN KEY (`folderID`) REFERENCES `folder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `note_ibfk_5` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `uploads`
  ADD CONSTRAINT `uploads_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
