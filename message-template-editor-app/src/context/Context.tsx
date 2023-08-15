import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useLocalStorage } from "./use-localStorage";
import { Context, Props, Template } from "../types/types";

const initialContext: Context = {
  template: {
    list: {
      id: uuidv4(),
      children: null,
      parentId: null,
      text: { value: "" },
      type: "TEXT",
    },
  },
  setTemplate: (): void => {
    throw new Error("setTemplate function must be overridden");
  },
  arrVarNames: [
    { variable: "firstname", value: "" },
    { variable: "lastname", value: "" },
    { variable: "company", value: "" },
    { variable: "position", value: "" },
  ],
  setArrVarNames: (): void => {
    throw new Error("arrVarNames function must be overridden");
  },
  currElement: null,
  setCurrElement: (): void => {
    throw new Error("setCurrElement function must be overridden");
  },
  callbackSave: (): Promise<boolean> => {
    throw new Error("callbackSave function must be overridden");
  },
};

export const AppContext = createContext<Context>(initialContext);

const AppContextProvider = ({ children }: Props): JSX.Element => {
  const [template, setTemplate] = useLocalStorage(
    "template",
    initialContext.template
  );
  const [arrVarNames, setArrVarNames] = useLocalStorage(
    "arrVarNames",
    initialContext.arrVarNames
  );

  const callbackSave = async (template: Template): Promise<boolean> => {
    try {
      await setTemplate({ ...template });
      return true;
    } catch (error) {
      return false;
    }
  };

  const [currElement, setCurrElement] = useState(initialContext.currElement);

  return (
    <AppContext.Provider
      value={{
        template,
        setTemplate,
        arrVarNames,
        setArrVarNames,
        currElement,
        setCurrElement,
        callbackSave,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
