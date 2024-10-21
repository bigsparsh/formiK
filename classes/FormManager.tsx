import { FormElement } from "@/app/form/create/page";
import ImageField from "@/components/ImageField";
import OptionField from "@/components/OptionField";
import TextComponent from "@/components/TextComponent";
import { FieldType } from "@prisma/client";
import { SetterOrUpdater } from "recoil";

export class FormManager {
  formFields: FormElement[];
  formJSX: JSX.Element[];
  // parentComponent: JSX.Element | null;
  setParentComponent: SetterOrUpdater<JSX.Element> | null;
  static instance: FormManager | null;

  private constructor(setPc: SetterOrUpdater<JSX.Element>) {
    this.formFields = [];
    // this.parentComponent = null;
    this.setParentComponent = setPc;
    this.formJSX = [];
  }

  static getInstance(setPc?: SetterOrUpdater<JSX.Element>) {
    if (!this.instance) {
      if (!setPc) {
        throw new Error("Parent component and setter is required");
      }
      this.instance = new FormManager(setPc);
    }
    return this.instance;
  }

  addOptionToField(index: number) {
    this.formFields[index].options?.push({
      index: this.formFields[index].options.length,
      value: "Option",
    });
    this.formJSX[index] = (
      <OptionField
        key={crypto.randomUUID()}
        id={index}
        options={this.formFields[index].options}
      />
    );
  }

  addOptionField() {
    this.formFields.push({
      type: FieldType.OPTION,
      index: this.formFields.length,
      title: "New Option field",
      options: [
        {
          index: 0,
          value: "Option",
        },
      ],
      required: false,
    });

    this.formJSX?.push(
      <OptionField
        key={crypto.randomUUID()}
        id={this.formFields.length - 1}
        options={this.formFields[this.formFields.length - 1].options}
      />,
    );
    this.update();
  }

  update() {
    if (!this.setParentComponent) {
      throw new Error("Parent component and setter is required");
    }
    this.setParentComponent(() => <>{this.formJSX?.map((jsx) => jsx)}</>);
  }

  addTextField() {
    this.formFields.push({
      type: FieldType.TEXT,
      index: this.formFields.length,
      title: "New Text field",
      required: false,
    });

    this.formJSX?.push(
      <TextComponent
        key={crypto.randomUUID()}
        id={this.formFields.length - 1}
      ></TextComponent>,
    );

    this.update();
  }

  addImageField() {
    this.formFields.push({
      type: FieldType.IMAGE,
      index: this.formFields.length,
      title: "New Image field",
      required: false,
    });

    this.formJSX?.push(
      <ImageField
        key={crypto.randomUUID()}
        id={this.formFields.length - 1}
      ></ImageField>,
    );

    this.update();
  }
}
