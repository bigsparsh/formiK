/*
  Warnings:

  - You are about to drop the column `is_heading` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cover_image` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TextFieldType" AS ENUM ('TEXT', 'EMAIL', 'NUMBER');

-- CreateEnum
CREATE TYPE "FontSize" AS ENUM ('XL', 'LG', 'MD', 'SM');

-- CreateEnum
CREATE TYPE "FontFormat" AS ENUM ('BOLD', 'ITALIC', 'UNDERLINE');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "FieldType" ADD VALUE 'TEXT_IMAGE';
ALTER TYPE "FieldType" ADD VALUE 'TEXT_INPUT';

-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- AlterTable
ALTER TABLE "Field" DROP COLUMN "is_heading",
ADD COLUMN     "multi_select" BOOLEAN,
ADD COLUMN     "text_field_type" "TextFieldType";

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "cover_image" TEXT NOT NULL;

-- DropTable
DROP TABLE "Authenticator";

-- CreateTable
CREATE TABLE "TextStyle" (
    "text_id" TEXT NOT NULL,
    "field_id" TEXT NOT NULL,
    "format" "FontFormat",
    "size" "FontSize" NOT NULL,

    CONSTRAINT "TextStyle_pkey" PRIMARY KEY ("text_id")
);

-- AddForeignKey
ALTER TABLE "TextStyle" ADD CONSTRAINT "TextStyle_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "Field"("field_id") ON DELETE CASCADE ON UPDATE CASCADE;
