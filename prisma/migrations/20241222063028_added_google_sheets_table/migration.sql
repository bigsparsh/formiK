-- CreateTable
CREATE TABLE "GoogleSheet" (
    "id" TEXT NOT NULL,
    "form_id" TEXT NOT NULL,
    "sheet_id" TEXT NOT NULL,

    CONSTRAINT "GoogleSheet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GoogleSheet_form_id_key" ON "GoogleSheet"("form_id");

-- CreateIndex
CREATE INDEX "GoogleSheet_id_idx" ON "GoogleSheet"("id");

-- AddForeignKey
ALTER TABLE "GoogleSheet" ADD CONSTRAINT "GoogleSheet_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Form"("form_id") ON DELETE CASCADE ON UPDATE CASCADE;
