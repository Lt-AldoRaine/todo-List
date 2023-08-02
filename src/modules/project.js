export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  getName() {
    return this.name;
  }

  getTasks() {
    return this.tasks;
  }

  addTodo(task) {
    this.tasks.push(task);
  }

  static removeTask(task) {
    const index = this.tasks.filter((t) => t !== task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}
