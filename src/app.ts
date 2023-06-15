import { ToDo } from "./components";
import { TodoApi } from "./api/todo";
import { FormTodo } from "./components/form";
import { AlertMessage } from "./components/alert";
import { Tabs } from "./components/tabs";

type Root = HTMLElement | string;

export class App {
  formTodoComponetnt: FormTodo;
  api: TodoApi;
  todoComponent: ToDo;
  $root: HTMLElement;
  $list: HTMLElement | null | undefined;
  $form: HTMLElement | null | undefined;
  $tabs: HTMLElement | null | undefined;
  $alert: HTMLElement | null | undefined;
  alertComponent: AlertMessage;
  tabsComponent: Tabs;

  constructor(root: Root) {
    this.$root =
      typeof root === "string" ? document.querySelector(root)! : root;
    this.todoComponent = new ToDo();
    this.formTodoComponetnt = new FormTodo();
    this.api = new TodoApi();
    this.alertComponent = new AlertMessage();
    this.tabsComponent = new Tabs();
    if (!this.$root) {
      return;
    }
    this.render();
    this.$list = document.getElementById(this.todoComponent.listTodoId);
    this.$form = document.getElementById(this.formTodoComponetnt.formId);
    this.$tabs = document.getElementById(this.tabsComponent.idTab);
    this.$alert = document.getElementById(this.alertComponent.idAlertMessage);
    this.events();
  }

  render() {
    this.$root?.insertAdjacentHTML("beforeend", this.template());
    this.renderListToDo();
  }

  async renderListToDo() {
    const data = await this.api.getAll();
    this.$list?.insertAdjacentHTML(
      "beforeend",
      this.todoComponent.renderItems(data.reverse())
    );
  }

  template = () => `
    <section class=" gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <h1 class="title">Список задач</h1>
          <div class="card">
            <div class="card-body p-5"> 
            ${this.formTodoComponetnt.render()}
            ${this.tabsComponent.render()}
              <div class="tab-content" id="ex1-content">  
                ${this.todoComponent.render()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  ${this.alertComponent.render()}
  `;
  events() {
    this.$form?.addEventListener("submit", async (evt) => {
      this.$list &&
        this.formTodoComponetnt.provider.handlerSubmit(evt, this.$list);
    });
    this.$list?.addEventListener(
      "submit",
      this.todoComponent.provider.handlerSubmitUpdateTodo
    );
    this.$list?.addEventListener(
      "click",
      this.todoComponent.provider.handlerClickListTodo
    );
    this.$list?.addEventListener(
      "change",
      this.todoComponent.provider.handlerChangeCheckedTodo
    );
    this.$tabs?.addEventListener(
      "click",
      this.tabsComponent.provider.handlerChoiseTab
    );
    this.tabsComponent.provider.loadHashState();
    this.$alert?.addEventListener("click", this.alertComponent.close);
    window.addEventListener(
      "popstate",
      this.tabsComponent.provider.loadHashState
    );
  }
}
