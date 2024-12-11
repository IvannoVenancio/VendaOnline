/*
  Warnings:

  - You are about to drop the column `estoque` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `status_pagamento` on the `produto` table. All the data in the column will be lost.
  - Added the required column `quantidade` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produto` DROP COLUMN `estoque`,
    DROP COLUMN `status_pagamento`,
    ADD COLUMN `quantidade` INTEGER NOT NULL;
