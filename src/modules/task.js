export default class Task {
  constructor(name, dueDate, priority, description) {
    this.name = name;
    this.dueDate = dueDate;
    this.priority = priority;
    this.description = description;
    this.completed = false;
  }
}
