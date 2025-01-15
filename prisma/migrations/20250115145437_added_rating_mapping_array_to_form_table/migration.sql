/*
  Warnings:

  - Added the required column `form_id` to the `RatingMapping` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RatingMapping" ADD COLUMN     "form_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RatingMapping" ADD CONSTRAINT "RatingMapping_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Form"("form_id") ON DELETE CASCADE ON UPDATE CASCADE;
