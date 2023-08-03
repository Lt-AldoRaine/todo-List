export default class Task {
  constructor(name, dueDate, priority, project, completed = false) {
    this.name = name;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.completed = completed;
  }

  getName() {
    return this.name;
  }

  getDueDate() {
    return this.dueDate;
  }

  getPriority() {
    return this.priority;
  }

  getCompleted() {
    return this.completed;
  }

  getProject() {
    return this.project;
  }

  formatDate() {
    const day = this.dueDate.split("/")[0];
    const month = this.dueDate.split("/")[1];
    const year = this.dueDate.split("/")[2];
    return `${month}/${day}/${year}`;
  }
}
