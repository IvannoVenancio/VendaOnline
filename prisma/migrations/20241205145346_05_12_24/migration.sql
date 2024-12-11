/*
  Warnings:

  - You are about to drop the column `id_categoria` on the `produto` table. All the data in the column will be lost.
  - Added the required column `categoria` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produto` DROP COLUMN `id_categoria`,
    ADD COLUMN `categoria` VARCHAR(191) NOT NULL;
