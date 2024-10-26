import { createForm } from "@/actions/Form";
import { FormElement } from "@/app/form/create/page";
import ImageInputField from "@/components/ImageInputField";
import OptionInputField from "@/components/OptionInputField";
import TextInputField from "@/components/TextInputField";
import { FieldType } from "@prisma/client";
import { put } from "@vercel/blob";
import { SetterOrUpdater } from "recoil";

export class FormInputManager {
  formFields: FormElement[];
  formJSX: JSX.Element[];
  setParentComponent: SetterOrUpdater<JSX.Element> | null;
  static instance: FormInputManager | null;

  private constructor(setPc: SetterOrUpdater<JSX.Element>) {
    this.formFields = [];
    this.setParentComponent = setPc;
    this.formJSX = [];
  }

  static getInstance(setPc?: SetterOrUpdater<JSX.Element>) {
    if (!this.instance) {
      if (!setPc) {
        throw new Error("Parent component and setter is required");
      }
      this.instance = new FormInputManager(setPc);
    }
    return this.instance;
  }

  setOptionToField(index: number) {
    this.formFields[index].options?.push({
      index: this.formFields[index].options.length,
      value: "Option",
    });
    this.formJSX[index] = (
      <OptionInputField
        key={crypto.randomUUID()}
        id={index}
        options={this.formFields[index].options}
      />
    );
  }

  setImagePathToField(index: number, file?: File) {
    this.formFields[index].image = file;
  }

  setTextToField(index: number, text: string) {
    this.formFields[index].title = text;
  }

  setTextToOptionField(
    field_index: number,
    option_index: number,
    text: string,
  ) {
    if (this.formFields[field_index].options)
      this.formFields[field_index].options[option_index].value = text;
  }

  setRequired(index: number, required: boolean) {
    this.formFields[index].required = required;
  }

  editOptionCount(index: number, amount: number) {
    this.formFields[index].options = [];
    for (let i = 0; i < amount; i++) {
      this.formFields[index].options.push({
        index: i,
        value: "Option " + (i + 1),
      });
    }
    this.formJSX[index] = (
      <OptionInputField
        key={this.formJSX[index].key}
        id={index}
        options={this.formFields[index].options}
      />
    );
    this.update();
  }

  addOptionField() {
    this.formFields.push({
      type: FieldType.OPTION,
      index: this.formFields.length,
      title: "",
      options: [
        {
          index: 0,
          value: "",
        },
        {
          index: 1,
          value: "",
        },
      ],
      required: false,
    });

    this.formJSX?.push(
      <OptionInputField
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
      title: "",
      required: false,
    });

    this.formJSX?.push(
      <TextInputField
        key={crypto.randomUUID()}
        id={this.formFields.length - 1}
      ></TextInputField>,
    );

    this.update();
  }

  addImageField() {
    this.formFields.push({
      type: FieldType.IMAGE,
      index: this.formFields.length,
      title: "",
      required: false,
    });

    this.formJSX?.push(
      <ImageInputField
        key={crypto.randomUUID()}
        id={this.formFields.length - 1}
      ></ImageInputField>,
    );

    this.update();
  }

  async finalizeForm() {
    const updatedFields = this.formFields.map(async (field) => {
      if (field.type === FieldType.IMAGE) {
        field.image = (
          await put(
            "form-image-" + field.index + crypto.randomUUID(),
            field.image as string,
            {
              access: "public",
              token:
                "vercel_blob_rw_ZPhL3fptqWzBDjqA_Rb3o9O1rDajr2QtBDy4Qpprd57J5sa",
            },
          )
        ).url;
      }
      return field;
    });
    this.formFields = await Promise.all(updatedFields);
    createForm({
      formFields: this.formFields,
    });
  }
}
