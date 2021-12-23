import AddTodo from "./components/addTodo.js";
import Modal from "./components/modal.js";
import Filters from "./components/filters.js";

export default class View {
  constructor() {
    this.model = null;
    this.table = document.getElementById("table");
    this.addTodoForm = new AddTodo();
    this.modal = new Modal();
    this.filters = new Filters();

    this.addTodoForm.onClick(({ title, description }) =>
      this.addTodo({ title, description })
    );

    this.modal.onClick(({ id, title, description, completed }) =>
      this.editTodo({ id, title, description, completed })
    );

    this.filters.onClick((filters) => this.filter(filters));
  }

  render() {
    const todos = this.model.getTodos();
    todos.forEach((todo) => this.createRow(todo));
  }

  setModel(model) {
    this.model = model;
  }

  filter({ type, words }) {
    const [, ...rows] = this.table.getElementsByTagName("tr");
    for (const row of rows) {
      const [title, description, completed] = row.children;
      let shouldHide = false;

      if (words) {
        shouldHide =
          !title.innerText.includes(words) &&
          !description.innerText.includes(words);
      }

      const shouldBeCompleted = type === "completed";
      const isCompleted = completed.children[0].checked;

      if (type !== "all" && shouldBeCompleted !== isCompleted) {
        shouldHide = true;
      }

      if(shouldHide){
        row.classList.add('d-none');
      }else{
        row.classList.remove('d-none');
      }
    }
  }

  addTodo({ title, description }) {
    const todo = this.model.addTodo({ title, description });
    this.createRow(todo);
  }

  editTodo({ id, title, description, completed }) {
    this.model.editTodo({ id, title, description, completed });

    const row = document.getElementById(id);
    row.children[0].innerText = title;
    row.children[1].innerText = description;
    row.children[2].children[0].checked = completed;
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
    editBtn.setAttribute("data-toggle", "modal");
    editBtn.setAttribute("data-target", "#modal");
    editBtn.onclick = () => {
      return this.modal.setValues({
        id,
        title: row.children[0].innerText,
        description: row.children[1].innerText,
        completed: row.children[2].children[0].checked,
      });
    };
    row.children[3].appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn", "btn-danger", "mb-1", "ml-1");
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    removeBtn.onclick = () => this.removeTodo(id);
    row.children[3].appendChild(removeBtn);
  }
}
