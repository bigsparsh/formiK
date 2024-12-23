import { createForm } from "@/actions/Form";
import { FormElement } from "@/app/form/create/page";
import ImageInputField from "@/components/ImageInputField";
import OptionInputField from "@/components/OptionInputField";
import TextInputField from "@/components/TextInputField";
import { FieldType, FontSize, TextFieldType } from "@prisma/client";
import { put } from "@vercel/blob";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SetterOrUpdater } from "recoil";
import { Sheets } from "./Sheets";

export class FormInputManager {
  formFields: FormElement[];
  formProperties: {
    title?: string;
    cover?: string;
  };
  formJSX: JSX.Element[];
  setParentComponent: SetterOrUpdater<JSX.Element> | null;
  static instance: FormInputManager | null;
  GoogleSheets: Sheets;

  private constructor(setPc: SetterOrUpdater<JSX.Element>) {
    this.formFields = [];
    this.setParentComponent = setPc;
    this.formJSX = [];
    this.formProperties = {};
    this.GoogleSheets = Sheets.get_instance();
  }

  static getInstance(setPc?: SetterOrUpdater<JSX.Element>) {
    if (this.instance && setPc) this.instance = null;
    if (!this.instance) {
      if (!setPc) {
        throw new Error("Parent component and setter is required");
      }
      this.instance = new FormInputManager(setPc);
    }
    return this.instance;
  }

  // Sets all the options
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

  // Sets the Image in a field
  setImagePathToField(index: number, file?: File) {
    if (!file) {
      delete this.formFields[index].image;
      return;
    }
    this.formFields[index].image = file;
  }

  // Sets the size of the text i.e SM, MD, LG, XL
  setTextSize(index: number, size: FontSize) {
    if (this.formFields[index].text_style)
      this.formFields[index].text_style.size = size;
  }

  // Sets the format of the text i.e BOLD, ITALIC, UNDERLINE
  setTextFormat(
    index: number,
    bold: boolean,
    italic: boolean,
    underline: boolean,
  ) {
    if (this.formFields[index].text_style) {
      this.formFields[index].text_style.bold = bold;
      this.formFields[index].text_style.italic = italic;
      this.formFields[index].text_style.underline = underline;
    }
  }

  setTextInput(index: number, isInput: boolean) {
    this.formFields[index].type = isInput
      ? FieldType.TEXT_INPUT
      : FieldType.TEXT;
  }

  setFormTitle(title: string) {
    this.formProperties.title = title;
  }

  async setFormCover(image: File) {
    if (!image) this.formProperties.cover = "https://picsum.photos/1920/1080";
    else
      this.formProperties.cover = (
        await put("form-cover-" + crypto.randomUUID(), image, {
          access: "public",
          token:
            "vercel_blob_rw_ZPhL3fptqWzBDjqA_Rb3o9O1rDajr2QtBDy4Qpprd57J5sa",
        })
      ).url;
  }

  setTextToField(index: number, text: string) {
    this.formFields[index].title = text;
  }
  editTextFieldType(index: number, fieldType: TextFieldType) {
    this.formFields[index].text_field_type = fieldType;
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

  setMultipleChoice(index: number, multiple: boolean) {
    this.formFields[index].multi_select = multiple;
  }
  setTextFieldType(index: number, fieldType: TextFieldType) {
    this.formFields[index].text_field_type = fieldType;
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
      multi_select: false,
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
      text_field_type: TextFieldType.TEXT,
      text_style: {
        bold: false,
        italic: false,
        underline: false,
        size: FontSize.MD,
      },
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

  async finalizeForm(cover: File, router: AppRouterInstance) {
    await this.setFormCover(cover);
    const updatedFields = this.formFields.map(async (field) => {
      if (field.image) {
        field.image = (
          await put(
            "form-image-" + field.index + crypto.randomUUID(),
            field.image as File,
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
    const newForm = await createForm({
      formProperties: this.formProperties,
      formFields: this.formFields,
    });
    await Promise.all([
      this.GoogleSheets.create_sheet(
        this.formProperties.title as string,
        newForm.form_id,
        this.formFields,
      ),
    ]);
    router.push("/dashboard");
  }
}
