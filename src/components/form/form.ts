import { FormProvider } from "./provider";

export class FormTodo {
  formId: string;
  provider: FormProvider;
  classes: string | undefined;
  constructor() {
    this.classes = [
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "mb-4",
    ].join(" ");
    this.provider = new FormProvider();
    this.formId = "form";
  }
  render() {
    return this.template();
  }
  template = () => `
  <form class="${this.classes}" id="${this.formId}">
    <div class="form-outline flex-fill">
      <input type="text" id="form2" class="form-control" />
    </div>
    <button type="submit" class="btn btn-info ms-2">
      Добавить задачу
    </button>
    </form>
  `;
}
