import { TabProvider } from "./provider";
interface Tab {
  label: string;
  href: string;
  filter: string;
}

const dataTab: Tab[] = [
  {
    label: "Все задачи",
    href: "#all",
    filter: "all",
  },
  {
    label: "Активные задачи",
    href: "#active",
    filter: "active",
  },
  {
    label: "Завершенные задачи",
    href: "#completed",
    filter: "completed",
  },
];

export class Tabs {
  tabs: Tab[];
  idTab: string;
  provider: TabProvider;
  constructor() {
    this.tabs = dataTab;
    this.idTab = "tab";
    this.provider = new TabProvider();
  }
  render() {
    return `
      <ul class="nav nav-tabs mb-4 pb-2" id="${
        this.idTab
      }" data-tab role="tablist">
      ${
        this.tabs &&
        this.tabs
          .map((tab) => {
            return `
          <li class="nav-item" role="presentation">
            <a
              class="nav-link"
              id="ex1-tab-1"
              data-mdb-toggle="tab"
              href="${tab.href}"
              role="tab"
              data-filter="${tab.filter}"
              aria-controls="ex1-tabs-1"
              aria-selected="true"
              
              >${tab.label}</a
            >
          </li>
        `;
          })
          .join("")
      }
      </ul> 
    
    `;
  }
}
