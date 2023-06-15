interface IAlertMessage {
  type: "success" | "error";
  message: string;
}

declare var timeIdAlerMessage: number;
var timeIdAlerMessage = 0;
export class AlertMessage {
  idAlertMessage: string;
  time: number;
  constructor() {
    this.idAlertMessage = "alert-message";
    this.time = 5000;
  }
  viewAlert = (message: IAlertMessage) => {
    const alert = document.getElementById(this.idAlertMessage);
    const text: HTMLElement = alert?.querySelector(".aler-message__text")!;
    if (timeIdAlerMessage !== 0) {
      clearTimeout(timeIdAlerMessage);
    }
    alert?.classList.add("open");
    if (message.type === "error") {
      alert?.classList.remove("success");
      alert?.classList.add("error");
      text.textContent = message.message;
    }
    if (message.type === "success") {
      alert?.classList.remove("error");
      alert?.classList.add("success");
      text.textContent = message.message;
    }
    timeIdAlerMessage = setTimeout(
      () => alert?.classList.remove("open"),
      this.time
    );
  };

  close(e: Event) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const btnClose = target.closest(".aler-message__close");
    if (btnClose) {
      btnClose.parentElement?.classList.remove("open");
      clearTimeout(timeIdAlerMessage);
    }
  }

  render() {
    return `
    <div class="aler-message success" id="${this.idAlertMessage}">
      <button class="aler-message__close btn"><i class="bi bi-x-circle"></i></button>
      <div class="aler-message__text"> Message</div>
      <i class="bi bi-check-circle"></i>
      <i class="bi bi-dash-circle"></i>
    </div>
    `;
  }
}
