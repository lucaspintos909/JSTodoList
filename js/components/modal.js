import Alert from "./alert.js";

export default class Modal {
  constructor() {
    this.id = null;
    this.title = document.getElementById("modal-title");
    this.description = document.getElementById("modal-description");
    this.completed = document.getElementById("modal-completed");
    this.btn = document.getElementById("modal-btn");
    this.alert = new Alert("modal-alert");
  }

  setValues({ id, title, description, completed }) {
    this.id = id;
    this.title.value = title;
    this.description.value = description;
    this.completed.checked = completed;
  }

  onClick(callback) {
    this.btn.onclick = () => {
      if (this.title.value === "" || this.description.value === "") {
        this.alert.show("¡El titulo y la descripción son requeridos!");
        return;
      }
      callback({
        id: this.id,
        title: this.title.value,
        description: this.description.value,
        completed: this.completed.checked,
      });
      this.alert.hide();

      $("#modal").modal("toggle");
    };
  }
}
