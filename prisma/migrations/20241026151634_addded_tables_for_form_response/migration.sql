-- CreateTable
CREATE TABLE "Response" (
    "response_id" TEXT NOT NULL,
    "form_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("response_id")
);

-- CreateTable
CREATE TABLE "FieldResponse" (
    "field_response_id" TEXT NOT NULL,
    "field_id" TEXT NOT NULL,
    "response_id" TEXT NOT NULL,
    "option_index" INTEGER,
    "text" TEXT,

    CONSTRAINT "FieldResponse_pkey" PRIMARY KEY ("field_response_id")
);

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Form"("form_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldResponse" ADD CONSTRAINT "FieldResponse_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "Field"("field_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldResponse" ADD CONSTRAINT "FieldResponse_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "Response"("response_id") ON DELETE CASCADE ON UPDATE CASCADE;
