export default class Model {
  constructor() {
    this.view = null;
    this.todos = JSON.parse(localStorage.getItem("todos"));

    if (!this.todos || this.todos.length < 1) {
      this.todos = [
        {
          id: 0,
          title: "Ejemplo",
          description: "Tarea de ejemplo",
          completed: false,
        },
      ];
      this.currentId = 1;
    } else {
      this.currentId = this.todos[this.todos.length - 1].id + 1;
    }
  }

  save() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
    console.log(this.todos);
  }

  setView(view) {
    this.view = view;
  }

  getTodos() {
    return this.todos;
  }

  findTodoById(id) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  addTodo({ title, description }) {
    const todo = {
      id: this.currentId++,
      title,
      description,
      completed: false,
    };
    this.todos.push(todo);

    this.save();

    return { ...todo };
  }

  removeTodo(id) {
    const index = this.findTodoById(id);
    this.todos.splice(index, 1);
    this.save();
  }

  toggleCompleted(id) {
    const todo = this.todos[this.findTodoById(id)];
    todo.completed = !todo.completed;
    this.save();
  }
}
