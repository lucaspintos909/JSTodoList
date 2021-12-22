export default class Model {
  constructor() {
    this.view = null;
    this.todos = [];
    this.currentId = 1;
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
    return { ...todo };
  }

  removeTodo(id) {
    const index = this.findTodoById(id);
    this.todos.splice(index, 1);
  }

  toggleCompleted(id) {
    const todo = this.todos[this.findTodoById(id)];
    todo.completed = !todo.completed;
  }
}
