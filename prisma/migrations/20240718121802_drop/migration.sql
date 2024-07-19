/*
  Warnings:

  - You are about to drop the `report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `report` DROP FOREIGN KEY `Report_userId_fkey`;

-- DropTable
DROP TABLE `report`;

-- DropTable
DROP TABLE `user`;
