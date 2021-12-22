import AddTodo from "./components/addTodo.js";

export default class View {
  constructor() {
    this.model = null;
    this.table = document.getElementById("table");
    this.addTodoForm = new AddTodo();

    this.addTodoForm.onClick(({ title, description }) => {
      this.addTodo({ title, description });
    });
  }

  setModel(model) {
    this.model = model;
  }

  addTodo({ title, description }) {
    const todo = this.model.addTodo({title, description});
    this.createRow(todo);
  }

  removeTodo(id){
    this.model.removeTodo(id);
    document.getElementById(id).remove();
  }

  createRow({id, title, description, completed}){
    const row = this.table.insertRow();

    row.setAttribute('id', id);

    row.innerHTML = `
      <td>${title}</td>
      <td>${description}</td>
      <td class="text-center">
        <input type="checkbox">
      </td>
      <td class="text-right">
        <button class="btn btn-primary mb-1">
          <i class="fa fa-pencil"></i>
        </button>
        
      </td>
    `;

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    removeBtn.onclick = () => {
      this.removeTodo(id);
    }

    row.children[3].appendChild(removeBtn);
  }
}
