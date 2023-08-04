import { projectDisplay, displayTasks } from "./projectDisplay";
import { saveProjects, getProjects } from "./storage";
import { compareAsc, toDate } from "date-fns";
import Task from "./task";
import Project from "./project";

export default function dom() {
  const taskContainer = document.getElementById("task-wrapper");
  const taskFormContainer = document.getElementById("task-form-wrapper");
  const taskList = document.getElementById("task-list");
  const projectForm = document.getElementById("project-form");
  const projectList = document.getElementById("project-list");
  const projectInput = document.getElementById("project-input");
  const taskForm = document.getElementById("task-form");
  const createTaskBtn = document.getElementById("create-task");
  const addTaskBtn = document.getElementById("task-submit");
  const createProjectBtn = document.getElementById("create-project");
  const addProjectBtn = document.getElementById("add-project");
  const deleteBtns = document.querySelectorAll(".delete");
  const checkmarks = document.querySelectorAll("checkmark");
  const checkboxes = document.querySelectorAll("#checkbox");

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

    const task = new Task(name, date, priority);
    task.formatDate();

    return task;
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
    const project = document.querySelector("#project-input");

    if (!project.value) {
      project.setCustomValidity("Give project a name");
      project.reportValidity();
      return false;
    }

    return true;
  };

  const validTask = () => {
    const task = document.querySelector("#task-input");

    if (!task.value) {
      task.setCustomValidity("Give task a name");
      task.reportValidity();
      return false;
    }

    return true;
  };

  const addProject = (e) => {
    e.preventDefault();
    const newProj = createProject();

    currentProject = newProj;
    projects.push(newProj);
    currentProject.index = projects.indexOf(newProj);

    saveProjects(projects);
    projectDisplay(projects);
  };

  const createDefaultProject = () => {
    const defaultProj = new Project("Inbox");
    const defaultTask = new Task("Clean", "1/1/1970", "Medium", false);

    currentProject = defaultProj;
    projects[0] = defaultProj;
    currentProject.index = projects.indexOf(defaultProj);

    defaultProj.tasks.push(defaultTask);

    saveProjects(projects);
    displayTasks(currentProject);
    projectDisplay(projects);
  };

  const deleteProject = (selected) => {
    currentProject = selected;
    projects.splice(projects.indexOf(selected), 1);
    saveProjects(projects);
    projectDisplay(projects);
    displayTasks(currentProject)
  };

  const addTask = (e, task) => {
    e.preventDefault();
    if (currentProject) {
      currentProject.addTodo(task);

      displayTasks(currentProject);
      saveProjects(projects);
      displayTaskList();
    }
  };

  const clickProject = (e) => {
    const selected = e.target.closest(".project");
    const projectItems = document.querySelectorAll(".project");
    const deleteBtn = e.target.closest(".delete");

    if (selected) {
      currentProject = projects[selected.dataset.id];
      currentProject.index = selected.dataset.id;
      selected.style.backgroundColor = "#0f0f0f";
      if (deleteBtn) {
        deleteProject(selected);
      }
    }

    projectItems.forEach((item) => {
      if (item !== selected) {
        item.style.backgroundColor = "";
      }
    });

    displayTasks(currentProject);
  };

  createTaskBtn.onclick = displayTaskForm;
  createProjectBtn.onclick = displayProjectForm;

  projectList.addEventListener("click", (e) => {
    clickProject(e);
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
    if (projects.length === 0) {
      createDefaultProject();
      projects = getProjects();
    }
    projectDisplay(projects);
    displayTasks(currentProject);
  });
}
