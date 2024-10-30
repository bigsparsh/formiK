import { FullFormType } from "@/app/form/[formId]/page";
import ImageOutputField from "@/components/ImageOutputField";
import OptionOutputField from "@/components/OptionOutputField";
import OutputRenderer from "@/components/OuputRenderer";
import TextOutputField from "@/components/TextOutputField";
import { FieldType } from "@prisma/client";
import { SetterOrUpdater } from "recoil";

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
  static instance: FormOutputManager | null;

  private constructor(
    setPc: SetterOrUpdater<JSX.Element>,
    setFs: SetterOrUpdater<FormState[]>,
    formFields: FullFormType,
  ) {
    this.formFields = formFields;
    this.setParentComponent = setPc;
    this.formJSX = [];
    this.setFormState = setFs;
    this.formState = [];
  }

  static getInstance(
    setPc?: SetterOrUpdater<JSX.Element>,
    setFs?: SetterOrUpdater<FormState[]>,
    formFields?: FullFormType,
  ) {
    if (!this.instance) {
      if (!setPc || !formFields || !setFs) {
        throw new Error(
          "Parent component and setter is required and also form fields",
        );
      }
      this.instance = new FormOutputManager(setPc, setFs, formFields);
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
              className={
                this.formJSX.length % 2 === 0
                  ? "bg-neutral-600"
                  : "bg-neutral-700"
              }
            />,
          );
          break;
        case FieldType.OPTION:
          this.formJSX.push(
            <OptionOutputField
              key={crypto.randomUUID()}
              title={field.title}
              options={field.options}
              field_id={field.field_id}
              className={
                this.formJSX.length % 2 === 0
                  ? "bg-neutral-600"
                  : "bg-neutral-700"
              }
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
        case FieldType.IMAGE:
          this.formJSX.push(
            <ImageOutputField
              key={crypto.randomUUID()}
              src={(field.image as string) || ""}
              alt={field.title}
              width={500}
              height={500}
              className={
                this.formJSX.length % 2 === 0
                  ? "bg-neutral-600"
                  : "bg-neutral-700"
              }
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

  update() {
    if (!this.setParentComponent || !this.formJSX || !this.formFields) {
      throw new Error("Parent component, form fields and form JSX is required");
    }
    this.setParentComponent(
      <OutputRenderer formJSX={this.formJSX} formFields={this.formFields} />,
    );
  }
}
