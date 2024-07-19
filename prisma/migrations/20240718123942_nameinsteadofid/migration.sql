/*
  Warnings:

  - You are about to drop the column `userId` on the `report` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `report` DROP FOREIGN KEY `Report_userId_fkey`;

-- AlterTable
ALTER TABLE `report` DROP COLUMN `userId`,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_name_key` ON `User`(`name`);

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_userName_fkey` FOREIGN KEY (`userName`) REFERENCES `User`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
