/*
  Warnings:

  - You are about to alter the column `tipo_usuario` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `tipo_usuario` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `tipo_usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(30) NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_tipo_usuario_fkey` FOREIGN KEY (`tipo_usuario`) REFERENCES `tipo_usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
