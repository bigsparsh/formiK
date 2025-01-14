import { FullFormType } from "@/app/form/[formId]/page";
import ImageOutputField from "@/components/ImageOutputField";
import OptionOutputField from "@/components/OptionOutputField";
import OutputRenderer from "@/components/OuputRenderer";
import TextOutputField from "@/components/TextOutputField";
import { FieldType, TextFieldType } from "@prisma/client";
import { SetterOrUpdater } from "recoil";
import { FormResponseManager } from "./FormResponseManager";
import TextPromptField from "@/components/TextPromptField";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type FormState = {
  index: number;
  field_id: string;
  options?: {
    index: number;
    checked: boolean;
  }[];
};

export class FormOutputManager {
  formFields: FullFormType;
  formJSX: JSX.Element[];
  setParentComponent: SetterOrUpdater<JSX.Element> | null;
  setFormState: SetterOrUpdater<FormState[]> | null;
  formState: FormState[];
  formResponseManager: FormResponseManager;
  setError: SetterOrUpdater<string | null>;
  static instance: FormOutputManager | null;

  private constructor(
    setPc: SetterOrUpdater<JSX.Element>,
    setFs: SetterOrUpdater<FormState[]>,
    formFields: FullFormType,
    setError: SetterOrUpdater<string | null>,
  ) {
    this.formFields = formFields;
    this.setParentComponent = setPc;
    this.formJSX = [];
    this.setFormState = setFs;
    this.formState = [];
    this.formResponseManager = FormResponseManager.getInstance(
      formFields,
      setError,
    );
    this.setError = setError;
  }

  static getInstance(
    setPc?: SetterOrUpdater<JSX.Element>,
    setFs?: SetterOrUpdater<FormState[]>,
    formFields?: FullFormType,
    setError?: SetterOrUpdater<string | null>,
  ) {
    if (this.instance && setPc && formFields && setFs && setError) {
      this.instance = null;
    }
    if (!this.instance) {
      if (!setPc || !formFields || !setFs || !setError) {
        throw new Error(
          "Parent component and setter is required and also form fields",
        );
      }
      this.instance = new FormOutputManager(setPc, setFs, formFields, setError);
    }
    return this.instance;
  }

  createFrontendForm() {
    if (!this.formFields || !this.setFormState) {
      throw new Error("Form fields and form state setter is required");
    }
    this.formFields.fields.map((field) => {
      switch (field.type) {
        case FieldType.TEXT:
          this.formJSX.push(
            <TextOutputField
              key={crypto.randomUUID()}
              title={field.title}
              image={field.url as string}
              size={field.text_style.size}
              bold={field.text_style.bold}
              italic={field.text_style.italic}
              underline={field.text_style.underline}
              className={""}
            />,
          );
          break;

        case FieldType.TEXT_INPUT:
          this.formJSX.push(
            <TextPromptField
              type={field.text_field_type as TextFieldType}
              required={field.required}
              key={crypto.randomUUID()}
              id={field.field_id}
              title={field.title}
              image={field.url as string}
              className={""}
            />,
          );
          break;
        case FieldType.OPTION:
          this.formJSX.push(
            <OptionOutputField
              key={crypto.randomUUID()}
              required={field.required}
              title={field.title}
              options={field.options}
              field_id={field.field_id}
              responseManager={this.formResponseManager}
              multiSelect={field.multi_select!}
              className={""}
            />,
          );
          this.formState = [
            ...this.formState,
            {
              field_id: field.field_id,
              index: field.index,
              options: field.options?.map((option) => ({
                index: option.index,
                checked: false,
              })),
            },
          ];
          this.setFormStateSetter();
          break;
        case FieldType.FILE:
          this.formJSX.push(
            <ImageOutputField
              key={crypto.randomUUID()}
              src={(field.url as string) || ""}
              alt={field.title}
              width={500}
              height={500}
              className={""}
            />,
          );
      }
    });
    this.update();
  }

  setFormStateSetter() {
    if (!this.setFormState) {
      throw new Error("Form state setter is required");
    }
    this.setFormState(this.formState);
  }

  checkRadioField(field_id: string, option_index: number) {
    this.formState = this.formState.map((field) => {
      if (field.field_id === field_id) {
        return {
          index: field.index,
          field_id: field.field_id,
          options: field.options?.map((option) => {
            if (option.index === option_index) {
              return {
                index: option.index,
                checked: true,
              };
            }
            return {
              index: option.index,
              checked: false,
            };
          }),
        };
      }
      return field;
    });
    this.setFormStateSetter();
    this.update();
  }

  submitForm(router: AppRouterInstance) {
    this.formResponseManager.submitForm(router);
  }

  update() {
    if (!this.setParentComponent || !this.formJSX || !this.formFields) {
      throw new Error("Parent component, form fields and form JSX is required");
    }
    this.setParentComponent(
      <OutputRenderer formJSX={this.formJSX} formFields={this.formFields} />,
    );
  }
}
