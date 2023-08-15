interface TemplateElements extends HTMLFormControlsCollection {
  text: HTMLInputElement;
}

export interface TemplateForm extends HTMLFormElement {
  readonly elements: TemplateElements;
}
