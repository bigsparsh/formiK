import { FullFormType } from "@/app/form/[formId]/page";
import ImageOutputField from "@/components/ImageOutputField";
import OptionOutputField from "@/components/OptionOutputField";
import TextOutputField from "@/components/TextOutputField";
import { FieldType } from "@prisma/client";
import { SetterOrUpdater } from "recoil";

export class FormOutputManager {
  formFields: FullFormType;
  formJSX: JSX.Element[];
  setParentComponent: SetterOrUpdater<JSX.Element> | null;
  static instance: FormOutputManager | null;

  private constructor(
    setPc: SetterOrUpdater<JSX.Element>,
    formFields: FullFormType,
  ) {
    this.formFields = formFields;
    this.setParentComponent = setPc;
    this.formJSX = [];
  }

  static getInstance(
    setPc?: SetterOrUpdater<JSX.Element>,
    formFields?: FullFormType,
  ) {
    if (!this.instance) {
      if (!setPc || !formFields) {
        throw new Error(
          "Parent component and setter is required and also form fields",
        );
      }
      this.instance = new FormOutputManager(setPc, formFields);
    }
    return this.instance;
  }

  createFrontendForm() {
    if (!this.formFields) {
      throw new Error("Form fields not found");
    }
    this.formFields.fields.map((field) => {
      switch (field.type) {
        case FieldType.TEXT:
          this.formJSX.push(<TextOutputField title={field.title} />);
          break;
        case FieldType.OPTION:
          this.formJSX.push(
            <OptionOutputField title={field.title} options={field.options} />,
          );
          break;
        case FieldType.IMAGE:
          this.formJSX.push(
            <ImageOutputField
              src={(field.image as string) || ""}
              alt={field.title}
              width={500}
              height={500}
              className="self-center"
            />,
          );
      }
    });
  }

  update() {
    if (!this.setParentComponent || !this.formJSX || !this.formFields) {
      throw new Error("Parent component, form fields and form JSX is required");
    }
    this.setParentComponent(
      <>
        <h1 className="p-5 bg-neutral-600 ma text-neutral-50 font-bold text-3xl">
          {this.formFields.title}
        </h1>
        {this.formJSX}
      </>,
    );
  }
}
