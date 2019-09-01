/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 5.7.17-log : Database - test
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`test` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `test`;

/*Table structure for table `websites` */

DROP TABLE IF EXISTS `websites`;

CREATE TABLE `websites` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` CHAR(20) NOT NULL DEFAULT '' COMMENT '站点名称',
  `url` VARCHAR(255) NOT NULL DEFAULT '',
  `alexa` INT(11) NOT NULL DEFAULT '0' COMMENT 'Alexa 排名',
  `country` CHAR(10) NOT NULL DEFAULT '' COMMENT '国家',
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `websites` */

INSERT  INTO `websites`(`id`,`name`,`url`,`alexa`,`country`) VALUES (1,'Google','https://www.google.cm/',1,'USA'),(2,'淘宝','https://www.taobao.com/',13,'CN'),(3,'汪政','https://www.google-api.ac.cn',4689,'CN'),(4,'微博','http://weibo.com/',20,'CN'),(5,'Facebook','https://www.facebook.com/',3,'USA');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;