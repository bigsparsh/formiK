import { FormElement } from "@/app/form/create/page";
import { atom, selector } from "recoil";

export const formElements = atom<FormElement[]>({
  key: "formElements",
  default: [],
});

export const currentFieldId = atom<number>({
  key: "currentFormId",
  default: 0,
});

export const currrentFormField = selector({
  key: "currrentUserForm",
  get: ({ get }) => {
    const filter = get(currentFieldId);
    const allElements = get(formElements);

    return allElements.find((ele) => ele.index === filter);
  },
});
