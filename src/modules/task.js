export default class Task {
  constructor(name, dueDate, priority, description) {
    this.name = name;
    this.dueDate = dueDate;
    this.priority = priority;
    this.description = description;
    this.completed = false;
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

  getFormatedDate() {
    const day = this.dueDate.split("/")[0];
    const month = this.dueDate.split("/")[1];
    const year = this.dueDate.split("/")[2];
    return `${day}/${month}/${year}`;
  }
}
