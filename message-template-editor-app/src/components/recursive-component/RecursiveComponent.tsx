import { FormEvent, useContext, useEffect, useState } from "react";

import { AppContext } from "../../context/Context";
import "./RecursiveComponent.scss";
import {
  findObjectAndDeleteInNestedArray,
  findObjectAndReplaceInNestedArray,
} from "../../utils/utils";

const RecursiveComponent = ({ id, parent_id, text, type, children }: any) => {
  const context = useContext(AppContext);
  const [textValue, setTextValue] = useState("");

  const handleEvents = (e: FormEvent<HTMLInputElement>) => {
    context.setCurrElement(e.currentTarget);
    setTextValue(e.currentTarget.value);
    const searchCriteria = { id: id };

    findObjectAndReplaceInNestedArray(
      context.template.list,
      searchCriteria,
      e.currentTarget.value
    );
  };

  const handleDelete = () => {
    const id = parent_id;
    const searchCriteria = { id: id };

    findObjectAndDeleteInNestedArray(context.template.list, searchCriteria);

    context.callbackSave({ ...context.template });
  };

  useEffect(() => {
    setTextValue(text?.value ? text.value : "");
  }, [text?.value]);

  return (
    <div className="template-block">
      {type !== "TEXT" && <div className="template-type">{type}</div>}
      {type === "IF" && (
        <button onClick={handleDelete} type="button" className="btn-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash3"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          </svg>
        </button>
      )}

      {Array.isArray(children) ? (
        <div className="template-container mt-clear">
          {children.map((item) => (
            <RecursiveComponent key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <input
          className="textarea-text rounded"
          name={type}
          id={id}
          value={textValue}
          onChange={handleEvents}
          onKeyUp={handleEvents}
          onClick={handleEvents}
          data-id={id}
          data-parent_id={parent_id}
        />
      )}
    </div>
  );
};

export default RecursiveComponent;
