export default function taskDisplay(task) {
  const taskList = document.getElementById("task-list");
  const taskContainer = document.createElement("div");
  const taskTitle = document.createElement("p");
  const checkbox = document.createElement("input");
  const checkmark = document.createElement("span");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");
  const dueDate = document.createElement("span");
  const priority = document.createElement("span");

  const checkContainer = document.createElement("div");
  const buttonContainer = document.createElement("div");
  const rightSide = document.createElement("div");
  const leftSide = document.createElement("div");

  taskContainer.classList.add("task");
  taskTitle.classList.add("task-title");
  checkbox.setAttribute("id", "checkbox");
  checkmark.classList.add("checkmark");
  deleteButton.classList.add("delete");
  editButton.classList.add("edit-task");
  dueDate.classList.add("due-date");
  priority.classList.add("priority");
  leftSide.classList.add("left-side");
  rightSide.classList.add("right-side");
  checkContainer.classList.add("check-container");
  buttonContainer.classList.add("button-container");

  taskTitle.textContent = task.name;
  dueDate.textContent = task.dueDate;
  priority.textContent = task.priority;

  leftSide.append(checkContainer, taskTitle);
  rightSide.append(dueDate, priority, buttonContainer);
  checkContainer.append(checkbox, checkmark);
  buttonContainer.append(deleteButton, editButton);
  taskContainer.append(leftSide, rightSide);
  taskList.appendChild(taskContainer);
};
