-- AlterEnum
ALTER TYPE "TextFieldType" ADD VALUE 'TEXTAREA';

-- AlterTable
ALTER TABLE "Field" ADD COLUMN     "max_char" INTEGER;
