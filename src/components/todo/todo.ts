import { Todo as IToDo } from "../../models/todo";
import { TodoProvider } from "./provider";
export class ToDo {
  listTodoId: string;
  classes: string;
  provider: TodoProvider;
  constructor() {
    this.listTodoId = "list-to-do";
    this.classes = ["mb-0", "list-group"].join(" ");
    this.provider = new TodoProvider();
  }

  render() {
    return this.templateList();
  }

  templateList = (data: IToDo[] = []) => {
    return `
     <ul class="${this.classes}" id="${this.listTodoId}">
        ${this.renderItems(data)}
      </ul>
    `;
  };
  templateItem = (todo: IToDo) => {
    return `
      <li
      data-todo-id="${todo.id}"
      class="list-group-item d-flex align-items-center border-0 mb-2 rounded ${
        todo.checked ? "checked" : "no-checked"
      }"
      style="background-color: #f4f6f7"
      >
        <input
          class="form-check-input me-2"
          type="checkbox"
          value=""
          aria-label="..."
          ${todo.checked ? "checked" : null}
        />
        <span class="text">${todo.title}</span>
        <form
          class="d-flex form-update justify-content-center align-items-center"
        >
          <div class="form-outline flex-fill">
            <input
              type="text"
              id="form2"
              value="${todo.title}"
              class="form-control"
            />
          </div>
          <button type="submit" class="btn btn-info ms-2">
            Обновить
          </button>
        </form>
        <div class="settings">
          <button
          data-update-id="${todo.id}"
            class="btn me-3 btn-pencil border align-self-center"
          >
            <div class="popover">
              <div class="popover-body">Редактировать</div>
            </div>
            <i class="bi bi-pencil-fill"></i>
          </button>
          <button
            data-remove-id="${todo.id}"
            class="btn btn-trash border align-self-center"
          >
            <div class="popover">
              <div class="popover-body">Удалить</div>
            </div>
            <i class="bi bi-trash-fill"></i>
          </button>
        </div>
      </li> 
      `;
  };
  renderItems = (data: IToDo[] = []) => {
    return data && data.map((todo) => this.templateItem(todo)).join(" ");
  };
}
