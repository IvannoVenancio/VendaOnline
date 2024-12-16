/*
  Warnings:

  - A unique constraint covering the columns `[tipo_categoria]` on the table `tipo_categoria` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `produto` DROP FOREIGN KEY `produto_tipoCategoriaId_fkey`;

-- AlterTable
ALTER TABLE `produto` MODIFY `tipoCategoriaId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tipo_categoria_tipo_categoria_key` ON `tipo_categoria`(`tipo_categoria`);

-- AddForeignKey
ALTER TABLE `produto` ADD CONSTRAINT `produto_tipoCategoriaId_fkey` FOREIGN KEY (`tipoCategoriaId`) REFERENCES `tipo_categoria`(`tipo_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;
