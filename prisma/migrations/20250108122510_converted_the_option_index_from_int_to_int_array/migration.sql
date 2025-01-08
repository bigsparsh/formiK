/*
  Warnings:

  - The `option_index` column on the `FieldResponse` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "FieldResponse" DROP COLUMN "option_index",
ADD COLUMN     "option_index" INTEGER[];
