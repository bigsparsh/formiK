/*
  Warnings:

  - The values [IMAGE,TEXT_IMAGE] on the enum `FieldType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `max_char` on the `Field` table. All the data in the column will be lost.
  - Added the required column `rating_group_id` to the `Field` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FileExtension" AS ENUM ('PDF', 'PPT', 'XLSX', 'JPEG', 'PNG');

-- AlterEnum
BEGIN;
CREATE TYPE "FieldType_new" AS ENUM ('OPTION', 'TEXT', 'TEXT_INPUT', 'RATING_GROUP', 'FILE');
ALTER TABLE "Field" ALTER COLUMN "type" TYPE "FieldType_new" USING ("type"::text::"FieldType_new");
ALTER TYPE "FieldType" RENAME TO "FieldType_old";
ALTER TYPE "FieldType_new" RENAME TO "FieldType";
DROP TYPE "FieldType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Field" DROP COLUMN "max_char",
ADD COLUMN     "extension" "FileExtension",
ADD COLUMN     "max_size" INTEGER,
ADD COLUMN     "rating_group_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RatingMapping" (
    "ratingMapping_id" TEXT NOT NULL,
    "group_name" TEXT NOT NULL,

    CONSTRAINT "RatingMapping_pkey" PRIMARY KEY ("ratingMapping_id")
);

-- CreateTable
CREATE TABLE "RatingLabel" (
    "ratingLabel_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "index" TEXT NOT NULL,
    "rating_group_id" TEXT NOT NULL,

    CONSTRAINT "RatingLabel_pkey" PRIMARY KEY ("ratingLabel_id")
);

-- CreateIndex
CREATE INDEX "RatingMapping_ratingMapping_id_idx" ON "RatingMapping"("ratingMapping_id");

-- CreateIndex
CREATE INDEX "RatingLabel_ratingLabel_id_idx" ON "RatingLabel"("ratingLabel_id");

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_rating_group_id_fkey" FOREIGN KEY ("rating_group_id") REFERENCES "RatingMapping"("ratingMapping_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingLabel" ADD CONSTRAINT "RatingLabel_rating_group_id_fkey" FOREIGN KEY ("rating_group_id") REFERENCES "RatingMapping"("ratingMapping_id") ON DELETE CASCADE ON UPDATE CASCADE;
