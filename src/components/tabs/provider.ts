export class TabProvider {
  classes: string[];
  constructor() {
    this.classes = ["all", "active", "completed"];
  }
  handlerChoiseTab = (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const currentTab = target.closest("[data-filter]") as HTMLAnchorElement;
    const listTabContent = document.querySelector("#list-to-do");
    this.tabs?.forEach((tab) => {
      tab.classList.remove("active");
      tab.removeAttribute("aria-current");
    });
    if (!currentTab || !listTabContent) {
      return;
    }
    currentTab.classList.add("active");
    currentTab.setAttribute("aria-current", "page");
    this.pushHashState(currentTab.href);
    const removeClasses = this.classes.filter(
      (item) => item !== currentTab.dataset?.filter
    );
    listTabContent.classList.remove(...removeClasses);
    listTabContent.classList.add(currentTab.dataset?.filter ?? "");
  };
  private pushHashState(href: string) {
    history.pushState(null, "", href);
  }

  get tabs() {
    return document.querySelectorAll("[data-filter]");
  }

  loadHashState = () => {
    const hash = window.location.hash.replace("#", "");
    let el: HTMLElement | Node | null;
    if (hash) {
      const el = document.querySelector(
        `[data-filter="${hash}"]`
      ) as HTMLElement;
      el?.click();
    } else {
      el = this.tabs[0];
      el instanceof HTMLElement ? el.click() : null;
    }
  };
}
