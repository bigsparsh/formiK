import { submitForm } from "@/actions/Form";
import { FullFormType } from "@/app/form/[formId]/page";
import { FieldType } from "@prisma/client";

export type formResponseState = {
  field_id: string;
  option?: number;
  text?: string;
};
export class FormResponseManager {
  formResponseState: formResponseState[] = [];
  form: FullFormType;
  static instance: FormResponseManager;

  private constructor(form: FullFormType) {
    this.form = form;
    this.generateResponseState();
  }

  static getInstance(form?: FullFormType) {
    if (!this.instance) {
      if (!form) throw new Error("Form is required");
      this.instance = new FormResponseManager(form);
    }
    return this.instance;
  }

  generateResponseState() {
    this.form?.fields.map((field) => {
      const commonData = {
        field_id: field.field_id,
      };

      switch (field.type) {
        case FieldType.OPTION:
          this.formResponseState.push({
            ...commonData,
            option: -1,
          });
          break;
        case FieldType.TEXT:
          break;
        case FieldType.IMAGE:
          break;
        case FieldType.TEXT_INPUT:
          this.formResponseState.push({
            ...commonData,
            text: "",
          });
          break;
        default:
          console.log(field.type);
          throw new Error("Invalid field type");
      }
    });
  }

  checkRadioField(field_id: string, opt_index: number) {
    this.formResponseState.forEach((state) => {
      if (state.field_id === field_id) {
        state.option = opt_index;
        return {
          field_id: state.field_id,
          option: opt_index,
        };
      }
      return state;
    });
  }

  submitForm() {
    if (!this.form) throw new Error("Form is required");
    submitForm(this.form.form_id, this.formResponseState);
  }
}
