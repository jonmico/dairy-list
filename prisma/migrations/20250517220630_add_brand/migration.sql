/*
  Warnings:

  - You are about to drop the column `brandId` on the `ListItem` table. All the data in the column will be lost.
  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brand` to the `ListItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ListItem` DROP FOREIGN KEY `ListItem_brandId_fkey`;

-- DropIndex
DROP INDEX `ListItem_brandId_fkey` ON `ListItem`;

-- AlterTable
ALTER TABLE `ListItem` DROP COLUMN `brandId`,
    ADD COLUMN `brand` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Brand`;
