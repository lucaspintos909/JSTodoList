import AddTodo from "./components/addTodo.js";
import Modal from "./components/modal.js";

export default class View {
  constructor() {
    this.model = null;
    this.table = document.getElementById("table");
    this.addTodoForm = new AddTodo();

    this.addTodoForm.onClick(({ title, description }) => {
      this.addTodo({ title, description });
    });

    this.modal = new Modal();
  }

  render() {
    const todos = this.model.getTodos();
    todos.forEach((todo) => this.createRow(todo));
  }

  setModel(model) {
    this.model = model;
  }

  addTodo({ title, description }) {
    const todo = this.model.addTodo({ title, description });
    this.createRow(todo);
  }

  toggleCompleted(id) {
    this.model.toggleCompleted(id);
  }

  removeTodo(id) {
    this.model.removeTodo(id);
    document.getElementById(id).remove();
  }

  createRow({ id, title, description, completed }) {
    const row = this.table.insertRow();

    row.setAttribute("id", id);

    row.innerHTML = `
      <td>${title}</td>
      <td>${description}</td>
      <td class="text-center"></td>
      <td class="text-center"></td>
    `;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.onclick = () => this.toggleCompleted(id);
    row.children[2].appendChild(checkbox);

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-primary", "mb-1");
    editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
    editBtn.onclick = () => this.removeTodo(id);
    row.children[3].appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn", "btn-danger", "mb-1", "ml-1");
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    removeBtn.onclick = () => this.removeTodo(id);
    row.children[3].appendChild(removeBtn);
  }
}
