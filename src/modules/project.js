export default class Project {
  constructor(name, tasks) {
    this.name = name;
    this.tasks = [...tasks];
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
}
