import { TodoApi } from "../../api/todo";
import { ToDo } from "..";
import { AlertMessage } from "../alert";
import { validate } from "../../utils/validate-to-trim";

export class FormProvider {
  api: TodoApi;
  todo: ToDo;
  alert: AlertMessage;
  constructor() {
    this.api = new TodoApi();
    this.todo = new ToDo();
    this.alert = new AlertMessage();
  }
  handlerSubmit = async (e: Event, list: HTMLElement) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target) {
      const input: HTMLInputElement = target.querySelector("#form2")!;
      if (!validate(input.value)) {
        this.alert.viewAlert({
          type: "error",
          message: "Поле не должно быть пустым!",
        });
        return;
      }
      const data = await this.api.create(input!.value);
      input.value = "";
      list?.insertAdjacentHTML("afterbegin", this.todo.templateItem(data));
      this.alert.viewAlert({
        type: "success",
        message: "Задача успешно создана!",
      });
    }
  };
}
