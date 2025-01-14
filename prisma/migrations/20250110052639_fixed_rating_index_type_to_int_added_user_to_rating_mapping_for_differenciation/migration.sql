/*
  Warnings:

  - Changed the type of `index` on the `RatingLabel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `user_id` to the `RatingMapping` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RatingLabel" DROP COLUMN "index",
ADD COLUMN     "index" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RatingMapping" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RatingMapping" ADD CONSTRAINT "RatingMapping_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
