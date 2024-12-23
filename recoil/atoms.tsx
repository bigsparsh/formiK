import { FormState } from "@/classes/FormOutputManager";
import React from "react";
import { atom } from "recoil";

export const formInputElements = atom<JSX.Element>({
  key: "formInputElements",
  default: <></>,
});

export const formOutputElements = atom<JSX.Element>({
  key: "formOutputElements",
  default: <></>,
});

export const formStateAtom = atom<FormState[]>({
  key: "formStateAtom",
  default: [],
});

export const errorAtom = atom<string | null>({
  key: "errorAtom",
  default: null,
});

export const liveFormAtom = atom<JSX.Element>({
  key: "liveFormAtom",
  default: <></>,
});

export const globalLoadingAtom = atom<boolean>({
  key: "globalLoadingAtom",
  default: false,
});
