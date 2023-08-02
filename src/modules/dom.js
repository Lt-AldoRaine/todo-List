import { projectDisplay, displayTasks } from "./projectDisplay";
import { saveProjects, getProjects } from "./storage";
import Task from "./task";
import Project from "./project";

export default function dom() {
  const taskContainer = document.getElementById("task-wrapper");
  const taskFormContainer = document.getElementById("task-form-wrapper");
  const projectForm = document.getElementById("project-form");
  const projectList = document.getElementById("project-list");
  const projectInput = document.getElementById("project-input");
  const projectWrappers = document.querySelectorAll("#project-list .projects");
  const taskForm = document.getElementById("task-form");
  const createTaskBtn = document.getElementById("create-task");
  const addTaskBtn = document.getElementById("task-submit");
  const createProjectBtn = document.getElementById("create-project");
  const addProjectBtn = document.getElementById("add-project");
  const deleteTaskBtn = document.querySelectorAll("delete-task");

  let projects = getProjects();
  let currentProject = projects[0];

  const createProject = () => {
    const name = projectInput.value;
    return new Project(name);
  };

  const createTask = () => {
    const name = document.getElementById("task-input").value;
    const date = document.getElementById("task-date").value;
    const priority = document.getElementById("task-priority").value;

    return new Task(name, date, priority);
  };

  const displayProjectForm = () => {
    projectForm.reset();
    projectForm.setAttribute("style", "display: flex");
  };

  const displayTaskForm = () => {
    taskForm.reset();
    taskContainer.setAttribute("style", "display: none");
    taskFormContainer.setAttribute("style", "display: flex");
  };

  const displayTaskList = () => {
    taskContainer.setAttribute("style", "display: flex");
    taskFormContainer.setAttribute("style", "display: none");
  };

  const validProject = () => {
    const project = document.querySelector("#project-input")

    if (!project.value) {
      project.setCustomValidity("Give project a name");
      project.reportValidity();
      return false
    }

    return true
  };

  const validTask = () => {
    const task = document.querySelector("#task-input")

    if (!task.value) {
      task.setCustomValidity("Give task a name");
      task.reportValidity();
      return false
    }

    return true
  };

  const addProject = (e) => {
    e.preventDefault();
    const newProj = createProject();

    currentProject = newProj;
    projects.push(newProj);

    saveProjects(projects);
    projectDisplay(projects);
  };

  const addTask = (e, task) => {
    e.preventDefault();
    if (currentProject) {
      console.log(currentProject);
      currentProject.addTodo(task);

      displayTasks(currentProject);
      saveProjects(projects);
      displayTaskList();
    }
  };

  createTaskBtn.onclick = displayTaskForm;
  createProjectBtn.onclick = displayProjectForm;
  projectList.addEventListener("click", (e) => {
    if (e.target.classList.contains("project")) {
      const projId = e.target.getAttribute("data-id");
      currentProject = projects[projId];
    }
    displayTasks(currentProject);
    console.log(currentProject);
  });
  addProjectBtn.addEventListener("click", (e) => {
    if (validProject()) {
      addProject(e);
      projectForm.setAttribute("style", "display: none");
    }
  });
  addTaskBtn.addEventListener("click", (e) => {
    const task = createTask();
    if (validTask()) {
      addTask(e, task);
      taskForm.setAttribute("style", "display: none");
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    if (projects === 0) {
      projects = getProjects();
    }
    projectDisplay(projects);
    displayTasks(currentProject);
    console.log(currentProject);
  });
}
