-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_form_id_fkey";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_field_id_fkey";

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Form"("form_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "Field"("field_id") ON DELETE CASCADE ON UPDATE CASCADE;
