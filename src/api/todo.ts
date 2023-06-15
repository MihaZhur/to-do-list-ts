import type { Todo } from "../models/todo";
interface UpdateTodo {
  title?: string;
  checked?: boolean;
  id?: string;
}
interface ApiModelToDo {
  url: string;
  getAll: () => Promise<Todo[] | null>;
  create: (title: string) => Promise<Todo>;
  update: (todo: UpdateTodo) => Promise<Todo>;
  remove: (id: string) => void;
}

export class TodoApi implements ApiModelToDo {
  url: string;
  constructor() {
    this.url = import.meta.env.VITE_DB_JSON + "todo/";
  }
  async getAll(): Promise<Todo[]> {
    const response = await fetch(this.url);
    const data: Todo[] = await response.json();
    return data;
  }
  async create(title: string): Promise<Todo> {
    const body = {
      title: title,
      checked: false,
    };
    const response = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });
    const record: Todo = await response.json();
    return record;
  }

  async update(todo: UpdateTodo) {
    const body = todo;
    const response = await fetch(this.url + todo.id, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });
    const record: Todo = await response.json();
    return record;
  }

  async remove(id: string) {
    const response = await fetch(this.url + id, {
      method: "DELETE",
    });
    const record: Todo = await response.json();
    return record;
  }
}
