/*
  Warnings:

  - You are about to alter the column `labId` on the `report` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `labId` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `report` DROP FOREIGN KEY `Report_labId_fkey`;

-- AlterTable
ALTER TABLE `report` MODIFY `labId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `labId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_labId_fkey` FOREIGN KEY (`labId`) REFERENCES `User`(`labId`) ON DELETE RESTRICT ON UPDATE CASCADE;
