/*
  Warnings:

  - You are about to drop the column `image` on the `Field` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Field" DROP COLUMN "image",
ADD COLUMN     "url" TEXT;
