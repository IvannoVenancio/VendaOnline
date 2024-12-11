/*
  Warnings:

  - You are about to drop the column `quantidade` on the `produto` table. All the data in the column will be lost.
  - Added the required column `estoque` to the `produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_pagamento` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produto` DROP COLUMN `quantidade`,
    ADD COLUMN `estoque` INTEGER NOT NULL,
    ADD COLUMN `status_pagamento` VARCHAR(191) NOT NULL;
