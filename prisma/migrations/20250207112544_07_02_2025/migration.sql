/*
  Warnings:

  - You are about to drop the column `data_cadastro` on the `produto` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `tipo_usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(30)` to `Int`.
  - You are about to alter the column `tipo_usuario` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `item_pagamento` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_produto` to the `carrinho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_unitario` to the `carrinho` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_tipo_usuario_fkey`;

-- DropIndex
DROP INDEX `user_tipo_usuario_fkey` ON `user`;

-- AlterTable
ALTER TABLE `carrinho` ADD COLUMN `id_produto` INTEGER NOT NULL,
    ADD COLUMN `quantidade` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `total` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `valor_unitario` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `produto` DROP COLUMN `data_cadastro`;

-- AlterTable
ALTER TABLE `tipo_usuario` MODIFY `type` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `tipo_usuario` INTEGER NOT NULL;

-- DropTable
DROP TABLE `item_pagamento`;

-- CreateTable
CREATE TABLE `resumo_compra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_produto` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `preco_total` DOUBLE NOT NULL,
    `data_compra` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_tipo_usuario_fkey` FOREIGN KEY (`tipo_usuario`) REFERENCES `tipo_usuario`(`type`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_id_pedido_fkey` FOREIGN KEY (`id_pedido`) REFERENCES `pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedido` ADD CONSTRAINT `pedido_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pagamento` ADD CONSTRAINT `pagamento_id_pedido_fkey` FOREIGN KEY (`id_pedido`) REFERENCES `pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `endereco` ADD CONSTRAINT `endereco_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `avaliacao` ADD CONSTRAINT `avaliacao_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `avaliacao` ADD CONSTRAINT `avaliacao_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carrinho` ADD CONSTRAINT `carrinho_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carrinho` ADD CONSTRAINT `carrinho_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resumo_compra` ADD CONSTRAINT `resumo_compra_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resumo_compra` ADD CONSTRAINT `resumo_compra_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
