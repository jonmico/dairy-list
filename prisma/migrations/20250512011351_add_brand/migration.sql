/*
  Warnings:

  - Added the required column `brandId` to the `ListItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ListItem` ADD COLUMN `brandId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Brand` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ListItem` ADD CONSTRAINT `ListItem_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
