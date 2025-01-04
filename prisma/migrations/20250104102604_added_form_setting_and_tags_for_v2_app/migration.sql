-- CreateTable
CREATE TABLE "FromSettings" (
    "formsettings_id" TEXT NOT NULL,
    "form_id" TEXT NOT NULL,
    "response_limit" INTEGER,
    "response_message" TEXT,
    "stars" INTEGER,

    CONSTRAINT "FromSettings_pkey" PRIMARY KEY ("formsettings_id")
);

-- CreateTable
CREATE TABLE "FormTags" (
    "formtag_id" TEXT NOT NULL,
    "form_id" TEXT NOT NULL,
    "tagname" TEXT NOT NULL,

    CONSTRAINT "FormTags_pkey" PRIMARY KEY ("formtag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FromSettings_form_id_key" ON "FromSettings"("form_id");

-- CreateIndex
CREATE INDEX "FromSettings_formsettings_id_idx" ON "FromSettings"("formsettings_id");

-- CreateIndex
CREATE INDEX "FormTags_formtag_id_idx" ON "FormTags"("formtag_id");

-- AddForeignKey
ALTER TABLE "FromSettings" ADD CONSTRAINT "FromSettings_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Form"("form_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormTags" ADD CONSTRAINT "FormTags_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Form"("form_id") ON DELETE CASCADE ON UPDATE CASCADE;
