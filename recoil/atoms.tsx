import React from "react";
import { atom, selector } from "recoil";

export const formElements = atom<JSX.Element>({
  key: "formElements",
  default: <></>,
});

// export const currentFieldId = atom<number>({
//   key: "currentFormId",
//   default: 0,
// });
//
// export const currrentFormField = selector({
//   key: "currrentUserForm",
//   get: ({ get }) => {
//     const filter = get(currentFieldId);
//     const allElements = get(formElements);
//
//     return allElements.find((ele) => ele.index === filter);
//   },
// });
