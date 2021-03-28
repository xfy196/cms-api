/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50540
Source Host           : localhost:3306
Source Database       : cms

Target Server Type    : MYSQL
Target Server Version : 50540
File Encoding         : 65001

Date: 2021-03-28 22:58:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cms_resource
-- ----------------------------
DROP TABLE IF EXISTS `cms_resource`;
CREATE TABLE `cms_resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of cms_resource
-- ----------------------------
INSERT INTO `cms_resource` VALUES ('1', '权限管理', '0');
INSERT INTO `cms_resource` VALUES ('2', '角色管理', '1');
INSERT INTO `cms_resource` VALUES ('3', '资源管理', '1');
INSERT INTO `cms_resource` VALUES ('4', '用户管理', '1');

-- ----------------------------
-- Table structure for cms_role
-- ----------------------------
DROP TABLE IF EXISTS `cms_role`;
CREATE TABLE `cms_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of cms_role
-- ----------------------------
INSERT INTO `cms_role` VALUES ('1', '管理员');
INSERT INTO `cms_role` VALUES ('2', '超级管理员');

-- ----------------------------
-- Table structure for cms_user
-- ----------------------------
DROP TABLE IF EXISTS `cms_user`;
CREATE TABLE `cms_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `gender` varchar(1) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of cms_user
-- ----------------------------
INSERT INTO `cms_user` VALUES ('2', '小小荧', 'e10adc3949ba59abbe56e057f20f883e', 'xfy196@outlook,com', '15212186290', '男');

-- ----------------------------
-- Table structure for role_resource
-- ----------------------------
DROP TABLE IF EXISTS `role_resource`;
CREATE TABLE `role_resource` (
  `role_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`resource_id`),
  KEY `resource_id` (`resource_id`),
  CONSTRAINT `role_resource_ibfk_1` FOREIGN KEY (`resource_id`) REFERENCES `cms_resource` (`id`),
  CONSTRAINT `role_resource_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `cms_role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of role_resource
-- ----------------------------
INSERT INTO `role_resource` VALUES ('1', '1');
INSERT INTO `role_resource` VALUES ('1', '2');
INSERT INTO `role_resource` VALUES ('1', '3');

-- ----------------------------
-- Table structure for role_user
-- ----------------------------
DROP TABLE IF EXISTS `role_user`;
CREATE TABLE `role_user` (
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `role_user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `cms_role` (`id`),
  CONSTRAINT `role_user_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `cms_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of role_user
-- ----------------------------
INSERT INTO `role_user` VALUES ('1', '2');
INSERT INTO `role_user` VALUES ('2', '2');
