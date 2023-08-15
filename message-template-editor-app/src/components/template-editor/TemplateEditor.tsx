import { FormEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";

import { AppContext } from "../../context/Context";
import { TemplateForm } from "../../interfaces/Intefaces";
import RecursiveComponent from "../recursive-component/RecursiveComponent";
import {
  findObjectAndReplaceInNestedArray,
  findObjectAndAddInNestedArray,
  Action,
} from "../../utils/utils";
import Preview from "../preview/Preview";

import "./TemplateEditor.scss";

const TemplateEditor = () => {
  Modal.setAppElement("*");
  const context = useContext(AppContext);

  const [template, setTemplate] = useState(context.template);
  const [modalMessageIsOpen, setModalMessageIsOpen] = useState(false);
  const [modalPreviewIsOpen, setModalPreviewIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openModalMessage = (
    Action: { mess: string; color: string },
    error?: string
  ) => {
    setMessage(Action.mess);
    setModalMessageIsOpen(true);
  };

  const openModalPreview = (
    Action: { mess: string; color: string },
    error?: string
  ) => {
    setModalPreviewIsOpen(true);
  };

  const closeModalMessage = () => {
    setModalMessageIsOpen(false);
  };

  const closeModalPreview = () => {
    setModalPreviewIsOpen(false);
  };

  const addVariable = (event: MouseEvent<HTMLButtonElement>) => {
    if (context.currElement) {
      const position: number = Number(context.currElement.selectionStart);
      const id = context.currElement.dataset.id;
      const searchCriteria = { id: id };
      const output: string = [
        context.currElement.value.slice(0, position),
        event.currentTarget.textContent,
        context.currElement.value.slice(position),
      ].join("");
      findObjectAndReplaceInNestedArray(
        context?.template?.list,
        searchCriteria,
        output
      );
      setTemplate({ ...template });
    } else {
      const elTopInput: HTMLInputElement | null =
        document.querySelector(".textarea-text");
      if (elTopInput) {
        const position: number = Number(elTopInput.selectionStart);
        const id = elTopInput.dataset.id;
        const searchCriteria = { id: id };
        const output: string = [
          elTopInput.value.slice(0, position),
          event.currentTarget.textContent,
          elTopInput.value.slice(position),
        ].join("");
        findObjectAndReplaceInNestedArray(
          template?.list,
          searchCriteria,
          output
        );
        setTemplate({ ...template });
      }
    }
  };

  const addCondition = () => {
    if (context.currElement) {
      const position: number = Number(context.currElement.selectionStart);
      const id = context.currElement.dataset.id;
      const searchCriteria = { id: id };
      const firstPartStr: string = context.currElement.value.slice(0, position);
      const seconPartdStr: string = context.currElement.value.slice(position);

      findObjectAndAddInNestedArray(
        template.list,
        searchCriteria,
        firstPartStr,
        seconPartdStr
      );

      setTemplate({ ...template });
    }
  };

  const handleSave = (e: FormEvent<TemplateForm>) => {
    e.preventDefault();

    context.callbackSave({ ...template }).then((res) => {
      if (res) {
        openModalMessage(Action.SUCCESS);
      } else {
        openModalMessage(Action.ERROR);
      }
    });
  };

  const handlePreview = () => {
    openModalPreview(Action.SUCCESS);
  };

  useEffect(() => {
    const myTimer = window.setTimeout(() => {
      closeModalMessage();
    }, 2000);
    return () => {
      window.clearTimeout(myTimer);
    };
  }, [context.template]);

  return (
    <main className="template-editor">
      <Modal
        className="container-modal"
        isOpen={modalPreviewIsOpen}
        contentLabel="Modal preview"
      >
        <Preview template={template} arrVarNames={context.arrVarNames} />
        <div onClick={closeModalPreview} className="icon-cross">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </div>
        <button
          onClick={closeModalPreview}
          className="btn rounded light center"
        >
          Close
        </button>
      </Modal>
      <Modal
        className="container-modal"
        isOpen={modalMessageIsOpen}
        onRequestClose={closeModalMessage}
        contentLabel="Modal message"
      >
        <p className="modal-text">{message}</p>
      </Modal>
      <div className="container">
        <h1 className="center title-top">Message Template Editor</h1>
        <div className="template-editor-control-block">
          <div className="template-editor-variables">
            {Array.isArray(context.arrVarNames) &&
            context.arrVarNames.length > 0 ? (
              context.arrVarNames.map((item, index) => (
                <button
                  onClick={addVariable}
                  className="btn btn-small rounded green-dark"
                  key={index}
                >
                  {`{${item.variable}}`}
                </button>
              ))
            ) : (
              <div>Variables not defined</div>
            )}
          </div>
          <button onClick={addCondition} className="btn btn-small rounded grey">
            IF-THEN-ELSE
          </button>
        </div>
        <form onSubmit={handleSave} className="form">
          <div className="template-container">
            {Array.isArray(template?.list?.children) ? (
              template.list.children.map((item: any) => (
                <RecursiveComponent key={item.id} {...item} />
              ))
            ) : (
              <RecursiveComponent {...template.list} />
            )}
          </div>

          <div className="template-editor-btn-group">
            <button
              onClick={handlePreview}
              type="button"
              className="btn rounded blue center"
            >
              Preview
            </button>
            <button type="submit" className="btn rounded green-dark center">
              Save
            </button>
            <Link className="btn rounded accent center" to="/">
              Close
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default TemplateEditor;
