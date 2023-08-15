import { Dispatch, ReactNode, SetStateAction } from "react";

export type Template = {
  list: {
    id: string;
    children: [] | null;
    parentId: null | string;
    text: {
      value: string;
    };
    type: string;
  };
};

export type ArrVarNames = [
  {
    variable: string;
    value: string;
  }
];

export type Props = {
  children: ReactNode;
};

export type CallbackSave = (template: Template) => Promise<boolean>;

export type Context = {
  template: Template;
  setTemplate: Dispatch<SetStateAction<object>>;
  arrVarNames: any;
  setArrVarNames: Dispatch<SetStateAction<[]>>;
  currElement: HTMLInputElement | null;
  setCurrElement: Dispatch<SetStateAction<HTMLInputElement | null>>;
  callbackSave: CallbackSave;
};
