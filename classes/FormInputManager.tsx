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
import { draftForm, getDraftFromKey, removeDraft } from "@/actions/Redis";
import RatingInputField from "@/components/RatingInputField";
import cuid from "cuid";

export type RatingGroup = {
  group_id: string;
  group_name: string;
  rating_labels: {
    label: string;
    index: number;
  }[];
};

export class FormInputManager {
  formFields: FormElement[];
  ratingGroups: RatingGroup[];
  formProperties: {
    title: string;
    cover: string;
    publicVisibility: boolean;
    tags: string[];
    responseCount: number;
    responseMessage: string;
  };
  formJSX: JSX.Element[];
  setParentComponent: SetterOrUpdater<JSX.Element> | null;
  static instance: FormInputManager | null;
  GoogleSheets: Sheets;
  draftId: string;
  saveInterval?: NodeJS.Timeout;
  setInputState: SetterOrUpdater<FormElement[]>;

  private constructor(
    setPc: SetterOrUpdater<JSX.Element>,
    setInputState: SetterOrUpdater<FormElement[]>,
  ) {
    this.formFields = [];
    this.ratingGroups = [];
    this.setParentComponent = setPc;
    this.formJSX = [];
    this.setInputState = setInputState;
    this.formProperties = {
      title: "Untitled Form",
      cover: "https://picsum.photos/1920/1080",
      publicVisibility: false,
      tags: [],
      responseCount: 1,
      responseMessage: "Thanks for the response",
    };
    this.GoogleSheets = Sheets.get_instance();
    this.draftId = crypto.randomUUID();
    this.addListeners();
  }

  addListeners() {
    let ctrl_pressed: boolean = false;
    this.saveInterval = setInterval(() => {
      if (this.formFields.length > 0)
        draftForm(
          JSON.stringify({
            formFields: this.formFields,
            form_properties: {
              title: this.formProperties.title || "Untitled Form",
              cover:
                this.formProperties.cover || "https://picsum.photos/1920/1080",
              publicVisibility: this.formProperties.publicVisibility,
              tags: this.formProperties.tags,
              responseCount: this.formProperties.responseCount,
              responseMessage: this.formProperties.responseMessage,
            },
          }),
          this.draftId,
        );
    }, 240000);
    document.onkeydown = (e) => {
      if (e.ctrlKey) ctrl_pressed = true;
      else ctrl_pressed = false;
      if (e.key === "s" && ctrl_pressed) {
        e.preventDefault();
        draftForm(
          JSON.stringify({
            formFields: this.formFields,
            form_properties: {
              title: this.formProperties.title || "Untitled Form",
              cover:
                this.formProperties.cover || "https://picsum.photos/1920/1080",
              publicVisibility: this.formProperties.publicVisibility,
              tags: this.formProperties.tags,
              responseCount: this.formProperties.responseCount,
              responseMessage: this.formProperties.responseMessage,
            },
          }),
          this.draftId,
        );
      }
    };
  }

  static getInstance(
    setPc?: SetterOrUpdater<JSX.Element>,
    draftId?: string,
    setInputState?: SetterOrUpdater<FormElement[]>,
  ) {
    if (this.instance && setPc) this.instance = null;
    if (!this.instance) {
      if (!setPc || !setInputState) {
        throw new Error(
          "Parent component, setter and input state setter is required",
        );
      }
      this.instance = new FormInputManager(setPc, setInputState);
      if (draftId) {
        console.log("Shifting to draft mode");
        this.instance.draftId = draftId;
        this.instance.loadDraft();
      }
    }
    return this.instance;
  }

  async loadDraft() {
    const draft: {
      formFields: FormElement[];
      form_properties: {
        title: string;
        cover: string;
        publicVisibility: boolean;
        tags: string[];
        responseCount: number;
        responseMessage: string;
      };
    } = await getDraftFromKey(this.draftId);
    this.formProperties = {
      title: draft.form_properties.title,
      cover: draft.form_properties.cover,
      publicVisibility: draft.form_properties.publicVisibility,
      tags: draft.form_properties.tags,
      responseCount: draft.form_properties.responseCount,
      responseMessage: draft.form_properties.responseMessage,
    };
    this.formFields = draft.formFields;

    this.formJSX.push(
      ...this.formFields.map((ele) => {
        switch (ele.type) {
          case FieldType.TEXT:
            return (
              <TextInputField
                key={crypto.randomUUID()}
                id={ele.index}
                defaultValue={ele.title}
              />
            );
          case FieldType.OPTION:
            return (
              <OptionInputField
                key={crypto.randomUUID()}
                id={ele.index}
                options={ele.options}
                defaultValue={ele.title}
              />
            );
          case FieldType.TEXT_INPUT:
            return (
              <TextInputField
                key={crypto.randomUUID()}
                id={ele.index}
                defaultValue={ele.title}
              />
            );
          case FieldType.FILE:
            return <ImageInputField key={crypto.randomUUID()} id={ele.index} />;
          default:
            return <></>;
        }
      }),
    );
    this.update();
  }

  setRatingGroupName(group_id: string, title: string) {
    const currRating = this.ratingGroups.find((r) => r.group_id === group_id);
    if (currRating) currRating.group_name = title;
  }

  setPublicVisibility(pv: boolean) {
    this.formProperties.publicVisibility = pv;
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
      delete this.formFields[index].url;
      return;
    }
    this.formFields[index].url = file;
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

  setRatingLabel(group_id: string, index: number, text: string) {
    const rating = this.ratingGroups.find((r) => r.group_id === group_id);
    if (!rating) return;
    rating.rating_labels[index].label = text;
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

  addRatingLabel(group_id: string, index: number) {
    const rating = this.ratingGroups.find((r) => r.group_id === group_id);

    if (!rating) return;

    rating.rating_labels.push({
      label: "UT Rating",
      index: rating.rating_labels.length,
    });

    this.formJSX[index] = (
      <RatingInputField
        key={`rating-${group_id}-${index}`}
        id={index}
        group_id={group_id}
        group_name={rating.group_name as string}
        rating_labels={rating.rating_labels}
        rating_headings={this.formFields.filter(
          (r) => r.group_id === rating.group_id,
        )}
      />
    );
    this.update();
  }

  addRatingHeading(group_id: string) {
    const rating: RatingGroup | undefined = this.ratingGroups.find(
      (r) => r.group_id === group_id,
    );

    if (!rating) return;

    const index = this.formFields.length;
    this.formFields = [
      ...this.formFields,
      {
        group_id,
        title: "Untitled Rating Heading",
        required: false,
        index,
        type: FieldType.RATING_GROUP,
      },
    ];

    this.formJSX = this.formJSX.map((ele) => {
      if (ele.props.id === index) {
        return (
          <RatingInputField
            key={`rating-${group_id}-${index}`}
            id={index}
            group_id={group_id}
            group_name={rating.group_name}
            rating_labels={rating.rating_labels}
            rating_headings={this.formFields.filter(
              (r) => r.group_id === group_id,
            )}
          />
        );
      }
      return ele;
    });
    this.update();
  }

  addRatingField() {
    const group_id = cuid();
    this.ratingGroups.push({
      group_name: "Untitled Rating group",
      rating_labels: [
        {
          index: 0,
          label: "Rating",
        },
      ],
      group_id,
    });

    this.formFields.push({
      type: FieldType.RATING_GROUP,
      index: this.formFields.length,
      title: "Untitled Rating Group",
      group_id,
      required: false,
    });

    this.formJSX?.push(
      <RatingInputField
        key={this.formFields.length}
        id={this.formFields.length - 1}
        group_id={group_id}
        group_name={"Untitled Rating Group"}
        rating_labels={[
          {
            index: 0,
            label: "Rating",
          },
        ]}
        rating_headings={[this.formFields[this.formFields.length - 1]]}
      />,
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
        key={this.formFields.length}
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
    this.setInputState(() => {
      return JSON.parse(JSON.stringify(this.formFields));
    });
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
        key={this.formFields.length}
        id={this.formFields.length - 1}
      />,
    );

    this.update();
  }

  addImageField() {
    this.formFields.push({
      type: FieldType.FILE,
      index: this.formFields.length,
      title: "",
      required: false,
    });

    this.formJSX?.push(
      <ImageInputField
        key={this.formFields.length}
        id={this.formFields.length - 1}
      />,
    );

    this.update();
  }

  async finalizeForm(cover: File, router: AppRouterInstance) {
    clearInterval(this.saveInterval);
    await this.setFormCover(cover);
    const updatedFields = this.formFields.map(async (field) => {
      if (field.url) {
        field.url = (
          await put(
            "form-image-" + field.index + crypto.randomUUID(),
            field.url as File,
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
      ratingGroups: this.ratingGroups,
    });

    if (this.draftId) await removeDraft(this.draftId);

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
