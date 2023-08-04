export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTodo(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    const index = this.tasks.filter((t) => t !== task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}
