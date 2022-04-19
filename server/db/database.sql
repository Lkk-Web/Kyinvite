/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : database

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 19/01/2022 10:39:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建日期',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改日期',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 48 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test
-- ----------------------------
INSERT INTO `test` VALUES (1, '张三', '这是张三', '2022-01-17 15:14:23', NULL);
INSERT INTO `test` VALUES (2, '李四', '这是李四', '2022-01-17 15:14:27', NULL);
INSERT INTO `test` VALUES (3, '王五', '这是王五', '2022-01-17 15:14:30', NULL);
INSERT INTO `test` VALUES (44, '赵六', '赵六赵六赵六', '2022-01-17 15:14:32', NULL);
INSERT INTO `test` VALUES (45, 'test1', '这是第一次增加接口测试的第一次修改测试', '2022-01-17 15:27:48', '2022-01-17 09:18:23');
INSERT INTO `test` VALUES (47, 'test3', '这是第三次测试第一次修改', '2022-01-19 02:35:06', '2022-01-19 02:36:47');

-- ----------------------------
-- Table structure for test2
-- ----------------------------
DROP TABLE IF EXISTS `test2`;
CREATE TABLE `test2`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `tid` int(11) NOT NULL COMMENT 'test表id',
  `age` int(3) NULL DEFAULT NULL COMMENT '年龄',
  `sex` tinyint(1) NULL DEFAULT NULL COMMENT '性别',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `tid`(`tid`) USING BTREE,
  CONSTRAINT `test2_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `test` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test2
-- ----------------------------
INSERT INTO `test2` VALUES (4, 1, 20, 0);
INSERT INTO `test2` VALUES (5, 2, 24, 1);

SET FOREIGN_KEY_CHECKS = 1;
