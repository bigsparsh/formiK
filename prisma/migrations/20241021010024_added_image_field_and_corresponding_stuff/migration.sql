-- AlterEnum
ALTER TYPE "FieldType" ADD VALUE 'IMAGE';

-- AlterTable
ALTER TABLE "Field" ADD COLUMN     "image" TEXT,
ADD COLUMN     "is_heading" BOOLEAN;
