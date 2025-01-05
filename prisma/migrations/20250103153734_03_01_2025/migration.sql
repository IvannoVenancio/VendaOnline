/*
  Warnings:

  - You are about to alter the column `tipoCategoriaId` on the `produto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `detalhes` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `produto` DROP FOREIGN KEY `produto_tipoCategoriaId_fkey`;

-- DropIndex
DROP INDEX `produto_tipoCategoriaId_fkey` ON `produto`;

-- AlterTable
ALTER TABLE `carrinho` ADD COLUMN `imagem` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `produto` ADD COLUMN `detalhes` VARCHAR(1500) NOT NULL,
    ADD COLUMN `imagem` VARCHAR(1500) NULL,
    MODIFY `descricao` VARCHAR(1000) NULL,
    MODIFY `tipoCategoriaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tipo_categoria` ADD COLUMN `imagem` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `perfilId` INTEGER NULL;

-- CreateTable
CREATE TABLE `perfil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_utilizador` VARCHAR(191) NULL,
    `descricao` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_perfilId_fkey` FOREIGN KEY (`perfilId`) REFERENCES `perfil`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produto` ADD CONSTRAINT `produto_tipoCategoriaId_fkey` FOREIGN KEY (`tipoCategoriaId`) REFERENCES `tipo_categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
