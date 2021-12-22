export default class View {
  constructor() {
    this.model = null;
    this.table = document.getElementById("table");
    this.btn = document.getElementById("add");

    this.btn.onclick = () => this.addTodo({ title: "Prueba", description: "desc" });
  }

  setModel(model) {
    this.model = model;
  }

  addTodo({ title, description }) {
    const todo = this.model.addTodo({title, description});
  }
}
