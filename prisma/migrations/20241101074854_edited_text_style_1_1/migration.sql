/*
  Warnings:

  - You are about to drop the column `format` on the `TextStyle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[field_id]` on the table `TextStyle` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "cover_image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TextStyle" DROP COLUMN "format",
ADD COLUMN     "bold" BOOLEAN,
ADD COLUMN     "italic" BOOLEAN,
ADD COLUMN     "underline" BOOLEAN;

-- CreateIndex
CREATE UNIQUE INDEX "TextStyle_field_id_key" ON "TextStyle"("field_id");
