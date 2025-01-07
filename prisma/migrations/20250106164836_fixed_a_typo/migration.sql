/*
  Warnings:

  - You are about to drop the `FromSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FromSettings" DROP CONSTRAINT "FromSettings_form_id_fkey";

-- DropTable
DROP TABLE "FromSettings";

-- CreateTable
CREATE TABLE "FormSettings" (
    "formsettings_id" TEXT NOT NULL,
    "form_id" TEXT NOT NULL,
    "response_limit" INTEGER,
    "response_message" TEXT,
    "stars" INTEGER,

    CONSTRAINT "FormSettings_pkey" PRIMARY KEY ("formsettings_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormSettings_form_id_key" ON "FormSettings"("form_id");

-- CreateIndex
CREATE INDEX "FormSettings_formsettings_id_idx" ON "FormSettings"("formsettings_id");

-- AddForeignKey
ALTER TABLE "FormSettings" ADD CONSTRAINT "FormSettings_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Form"("form_id") ON DELETE CASCADE ON UPDATE CASCADE;
