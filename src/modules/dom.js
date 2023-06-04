import taskDisplay from "./taskDisplay";
import projectDisplay from "./projectDisplay";
import Task from "./task";
import Project from "./project";

export default function dom() {
  const taskContainer = document.getElementById("task-wrapper");
  const taskFormContainer = document.getElementById("task-form-wrapper");
  const projectSelect = document.getElementById("project-select");
  const projectForm = document.getElementById("project-form");
  const projects = document.querySelectorAll("project");
  const createTaskBtn = document.getElementById("create-task");
  const addTaskBtn = document.getElementById("task-submit");
  const createProjectBtn = document.getElementById("create-project");
  const addProjectBtn = document.getElementById("add-project");
  const deleteTaskBtn = document.querySelectorAll("delete-task");

  const addProjectSelect = (projectTitle) => {
    const option = document.createElement('option')

    option.value = projectTitle
    option.text = projectTitle
    
    console.log(option)
    projectSelect.appendChild(option)
  };

  const addTask = (e) => {
    e.preventDefault();
    const taskTitle = document.getElementById("task-input").value;
    const dueDate = document.getElementById("task-date").value;
    const priority = document.getElementById("task-priority").value;

    return new Task(taskTitle, dueDate, priority);
  };

  const addProject = (e) => {
    e.preventDefault();
    const projectTitle = document.getElementById("project-input").value;

    addProjectSelect(projectTitle);
    return new Project(projectTitle);
  };

  const displayProjectForm = () => {
    document.querySelector("form").reset();
    projectForm.setAttribute("style", "display: flex");
  };

  const displayTaskForm = () => {
    document.querySelector("form").reset();
    taskContainer.setAttribute("style", "display: none");
    taskFormContainer.setAttribute("style", "display: flex");
  };

  const displayTaskList = () => {
    taskContainer.setAttribute("style", "display: flex");
    taskFormContainer.setAttribute("style", "display: none");
  };

  createProjectBtn.onclick = displayProjectForm;
  addProjectBtn.onclick = (e) => {
    const project = addProject(e);
    projectDisplay(project);
    projectForm.setAttribute("style", "display: none");
  };

  createTaskBtn.onclick = displayTaskForm;
  addTaskBtn.onclick = (e) => {
    const task = addTask(e);
    console.log(task);
    taskDisplay(task);
    displayTaskList();
  };
}
