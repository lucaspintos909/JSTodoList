export default class Model {
  constructor() {
    this.view = null;
    this.todos = JSON.parse(localStorage.getItem("todos"));

    if (!this.todos || this.todos.length < 1) {
      this.todos = [
        {
          id: 0,
          title: "Ejemplo",
          description: "Descripcion de tarea",
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
    return this.todos.map((todo) => ({...todo}));
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

  editTodo({ id, title, description, completed }){
    const index = this.findTodoById(id);
    const todo = this.todos[index];

    todo.title = title;
    todo.description = description;
    todo.completed = completed;

    console.log(this.todos);

    this.save();
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
