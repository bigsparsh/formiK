import { submitForm } from "@/actions/Form";
import { FullFormType } from "@/app/form/[formId]/page";
import { FieldType } from "@prisma/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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

  setText(field_id: string, text: string) {
    this.formResponseState = this.formResponseState.map((state) => {
      if (state.field_id == field_id) {
        return {
          text: text,
          field_id: state.field_id,
          option: state.option,
        };
      }
      return state;
    });
  }

  async submitForm(router: AppRouterInstance) {
    if (!this.form) throw new Error("Form is required");
    await submitForm(this.form.form_id, this.formResponseState);
    router.push("/dashboard");
  }
}
