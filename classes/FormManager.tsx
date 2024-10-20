import { FormElement } from "@/app/form/create/page";
import OptionField from "@/components/OptionField";
import TextComponent from "@/components/TextComponent";
import { FieldType } from "@prisma/client";
import { SetterOrUpdater } from "recoil";

export class FormManager {
  formFields: FormElement[];
  // parentComponent: JSX.Element | null;
  setParentComponent: SetterOrUpdater<JSX.Element> | null;
  static instance: FormManager | null;

  private constructor(setPc: SetterOrUpdater<JSX.Element>) {
    this.formFields = [];
    // this.parentComponent = null;
    this.setParentComponent = setPc;
  }

  static getInstance(setPc: SetterOrUpdater<JSX.Element>) {
    if (!this.instance) {
      if (!setPc) {
        throw new Error("Parent component and setter is required");
      }
      this.instance = new FormManager(setPc);
    }
    return this.instance;
  }

  addOptionField() {
    if (!this.setParentComponent) {
      throw new Error("Parent component and setter is required");
    }

    this.formFields.push({
      type: FieldType.OPTION,
      index: this.formFields.length - 1,
      title: "New Option field",
      options: [
        {
          index: 1,
          value: "Option",
        },
      ],
      required: false,
    });

    this.setParentComponent((r: JSX.Element) => (
      <>
        {r}
        <OptionField key={crypto.randomUUID()} id={this.formFields.length} />
      </>
    ));
  }

  addTextField() {
    if (!this.setParentComponent) {
      throw new Error("Parent component and setter is required");
    }

    this.formFields.push({
      type: FieldType.TEXT,
      index: this.formFields.length,
      title: "New Text field",
      required: false,
    });

    this.setParentComponent((r: JSX.Element) => (
      <>
        {r}
        <TextComponent
          key={crypto.randomUUID()}
          id={this.formFields.length - 1}
        />
      </>
    ));
  }
}
