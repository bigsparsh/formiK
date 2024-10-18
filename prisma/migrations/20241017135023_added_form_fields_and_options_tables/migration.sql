-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('OPTION', 'TEXT');

-- CreateTable
CREATE TABLE "Form" (
    "form_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("form_id")
);

-- CreateTable
CREATE TABLE "Field" (
    "field_id" TEXT NOT NULL,
    "form_id" TEXT NOT NULL,
    "type" "FieldType" NOT NULL,
    "required" BOOLEAN NOT NULL,
    "index" INTEGER NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("field_id")
);

-- CreateTable
CREATE TABLE "Option" (
    "option_id" TEXT NOT NULL,
    "field_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "index" INTEGER NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("option_id")
);

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Form"("form_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "Field"("field_id") ON DELETE RESTRICT ON UPDATE CASCADE;
