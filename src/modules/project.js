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

  removeTask(task) {
    const index = this.tasks.filter((t) => t !== task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  addTask(task) {
    if (!this.tasks.includes(task)) {
      this.tasks.push(task);
    }
  }
}
