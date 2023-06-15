import { TodoApi } from "../../api/todo";
import { AlertMessage } from "../alert";
import { validate } from "../../utils/validate-to-trim";

export class TodoProvider {
  api: TodoApi;
  alert: AlertMessage;
  constructor() {
    this.api = new TodoApi();
    this.alert = new AlertMessage();
  }
  handlerSubmitUpdateTodo = async (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target) {
      const currentFormUpdate = target.closest("form");
      const item: HTMLElement = target.closest("[data-todo-id]")!;
      const input = currentFormUpdate?.querySelector("input")!;
      const checkbox: HTMLInputElement =
        item.querySelector('[type="checkbox"]')!;
      const id = item.dataset.todoId!;
      if (!validate(input.value)) {
        this.alert.viewAlert({
          type: "error",
          message: "Поле не должно быть пустым!",
        });
        return;
      }
      const data = await this.api.update({
        title: input!.value,
        checked: checkbox.checked,
        id: id,
      });
      item.classList.remove("update");
      let text = item.querySelector(".text")!;
      text.textContent = data.title;
      this.alert.viewAlert({
        type: "success",
        message: "Задача успешно обновлена!",
      });
      // if (data.checked && !item.classList.contains("checked")) {
      //   item.classList.add("checked");
      //   item.classList.remove("no-checked");
      // } else {
      //   item.classList.remove("checked");
      //   item.classList.add("no-checked");
      // }
    }
  };
  handlerClickListTodo = (e: Event) => {
    const target = e.target as HTMLElement;
    this.updateClickBtn(target);
    this.deleteTodo(target);
  };
  private updateClickBtn = (target: HTMLElement) => {
    const updateBtn = target.closest("[data-update-id]");
    if (updateBtn) {
      const item = target.closest("[data-todo-id]");
      item?.classList.toggle("update");
    }
  };
  private deleteTodo = async (target: HTMLElement) => {
    const removeBtn: HTMLElement | null = target.closest("[data-remove-id]");
    if (removeBtn) {
      const id = removeBtn.dataset?.removeId;
      if (id) {
        const removedItem = target.closest("[data-todo-id]");
        if (confirm("Удалить задачу?")) {
          await this.api.remove(id);
          removedItem?.remove();
          this.alert.viewAlert({
            type: "success",
            message: "Задача успешно удалена!",
          });
        }
      }
    }
  };
  handlerChangeCheckedTodo = async (e: Event) => {
    const target = e.target as HTMLElement;
    const checkbox: HTMLInputElement = target.closest('[type="checkbox"]')!;
    if (checkbox) {
      const item: HTMLElement = target.closest("[data-todo-id]")!;
      const checkbox: HTMLInputElement =
        item.querySelector('[type="checkbox"]')!;
      const id = item.dataset.todoId!;
      const data = await this.api.update({ checked: checkbox.checked, id: id });
      if (data.checked && !item.classList.contains("checked")) {
        item.classList.add("checked");
        item.classList.remove("no-checked");
      } else {
        item.classList.remove("checked");
        item.classList.add("no-checked");
      }
    }
  };
}
