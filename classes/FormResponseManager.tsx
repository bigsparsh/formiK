import { submitForm } from "@/actions/Form";
import { FullFormType } from "@/app/form/[formId]/page";
import { FieldType, TextFieldType } from "@prisma/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SetterOrUpdater } from "recoil";
import { z } from "zod";
import { Sheets } from "./Sheets";

const emailValidator = z.string().email();
const numberValidator = z.string().regex(/^\d+$/);

export type formResponseState = {
  field_id: string;
  text_type?: TextFieldType;
  option?: number;
  text?: string;
};

export class FormResponseManager {
  formResponseState: formResponseState[] = [];
  form: FullFormType;
  setError: SetterOrUpdater<string | null>;
  googleSheets: Sheets;
  static instance: FormResponseManager;

  private constructor(
    form: FullFormType,
    setError: SetterOrUpdater<string | null>,
  ) {
    this.form = form;
    this.generateResponseState();
    this.setError = setError;
    this.googleSheets = Sheets.get_instance();
  }

  static getInstance(
    form?: FullFormType,
    setError?: SetterOrUpdater<string | null>,
  ) {
    if (!this.instance) {
      if (!form || !setError) throw new Error("Form and error setter required");
      this.instance = new FormResponseManager(form, setError);
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
            option: 0,
          });
          break;
        case FieldType.TEXT:
          break;
        case FieldType.IMAGE:
          break;
        case FieldType.TEXT_INPUT:
          this.formResponseState.push({
            ...commonData,
            text_type: field.text_field_type as TextFieldType,
            text: "",
          });
          break;
        default:
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
          text_type: state.text_type,
          option: state.option,
        };
      }
      return state;
    });
  }

  async submitForm(router: AppRouterInstance) {
    if (!this.form) throw new Error("Form is required");
    try {
      this.formResponseState.map((state) => {
        if (state.text_type) {
          switch (state.text_type) {
            case TextFieldType.NUMBER:
              if (numberValidator.safeParse(state.text).success === false) {
                throw new Error("Invalid number");
              }
              break;
            case TextFieldType.EMAIL:
              if (emailValidator.safeParse(state.text).success === false) {
                throw new Error("Invalid email");
              }
              break;
            default:
              break;
          }
        }
      });
    } catch (e) {
      // @ts-expect-error "no"
      this.setError(e.message);
      return;
    }

    await submitForm(this.form.form_id, this.formResponseState);

    await this.googleSheets.append_response(
      this.form.form.sheet_id,
      this.formResponseState,
    );

    router.push("/dashboard");
    return null;
  }
}
