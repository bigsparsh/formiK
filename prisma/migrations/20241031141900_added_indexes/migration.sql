-- CreateIndex
CREATE INDEX "Field_field_id_form_id_idx" ON "Field"("field_id", "form_id");

-- CreateIndex
CREATE INDEX "FieldResponse_field_response_id_field_id_idx" ON "FieldResponse"("field_response_id", "field_id");

-- CreateIndex
CREATE INDEX "Form_form_id_user_id_idx" ON "Form"("form_id", "user_id");

-- CreateIndex
CREATE INDEX "Option_option_id_field_id_idx" ON "Option"("option_id", "field_id");

-- CreateIndex
CREATE INDEX "Response_response_id_form_id_idx" ON "Response"("response_id", "form_id");

-- CreateIndex
CREATE INDEX "TextStyle_text_id_field_id_idx" ON "TextStyle"("text_id", "field_id");

-- CreateIndex
CREATE INDEX "User_id_email_idx" ON "User"("id", "email");
