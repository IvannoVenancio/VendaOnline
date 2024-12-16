/*
  Warnings:

  - You are about to drop the column `update_at` on the `tipo_usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[type]` on the table `tipo_usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `tipo_usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_tipo_usuario_fkey`;

-- AlterTable
ALTER TABLE `tipo_usuario` DROP COLUMN `update_at`,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `tipo_usuario` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tipo_usuario_type_key` ON `tipo_usuario`(`type`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_tipo_usuario_fkey` FOREIGN KEY (`tipo_usuario`) REFERENCES `tipo_usuario`(`type`) ON DELETE RESTRICT ON UPDATE CASCADE;
