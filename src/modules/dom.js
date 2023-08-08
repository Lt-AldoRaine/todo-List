import { format } from "date-fns";
import { projectDisplay, displayTasks } from "./projectDisplay";
import { saveProjects, getProjects } from "./storage";
import Task from "./task";
import Project from "./project";

export default function dom() {
  const taskContainer = document.getElementById("task-wrapper");
  const taskFormContainer = document.getElementById("task-form-wrapper");
  const taskForm = document.getElementById("task-form");
  const editForm = document.getElementById("edit-form");
  const taskList = document.getElementById("task-list");
  const projectForm = document.getElementById("project-form");
  const projectList = document.getElementById("project-list");
  const projectInput = document.getElementById("project-input");
  const createTaskBtn = document.getElementById("create-task");
  const addTaskBtn = document.getElementById("task-submit");
  const editTaskBtn = document.getElementById("edit-submit");
  const createProjectBtn = document.getElementById("create-project");
  const addProjectBtn = document.getElementById("add-project");

  let projects = getProjects();
  let currentProject = projects[0];
  let currentTask;

  const createProject = () => {
    const name = projectInput.value;
    return new Project(name);
  };

  const createTask = () => {
    const name = document.getElementById("task-input").value;
    const date = format(
      new Date(document.getElementById("task-date").value),
      "MM-dd-yyyy"
    );
    const priority = document.getElementById("task-priority").value;
    const description = document.getElementById("task-desc").value;

    return new Task(name, date, priority, description);
  };

  const displayProjectForm = () => {
    projectForm.reset();
    projectForm.setAttribute("style", "display: flex");
  };

  const displayTaskForm = () => {
    taskForm.reset();
    taskContainer.setAttribute("style", "display: none");
    taskFormContainer.setAttribute("style", "display: flex");
    taskForm.setAttribute("style", "display: flex");
  };

  const displayEditForm = (e) => {
    editForm.reset();
    const selected = e.target.closest(".task");

    currentTask = currentProject.tasks[selected.dataset.id];

    document.getElementById("edit-task-input").value = currentTask.name;
    document.getElementById("edit-task-desc").value = currentTask.description;
    document.getElementById("edit-task-date").value = currentTask.dueDate;
    document.getElementById("edit-task-priority").value = currentTask.priority;

    taskContainer.setAttribute("style", "display: none");
    taskFormContainer.setAttribute("style", "display: flex");
    editForm.setAttribute("style", "display: flex");
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

    saveProjects(projects);
    projectDisplay(projects);
  };

  const createDefaultProject = () => {
    const defaultProj = new Project("Inbox");
    const defaultTask = new Task("Clean", "1/1/1970", "Medium", false);

    currentProject = defaultProj;
    projects[0] = defaultProj;

    defaultProj.tasks.push(defaultTask);

    saveProjects(projects);
    displayTasks(currentProject);
    projectDisplay(projects);
  };

  const deleteProject = (selected) => {
    projects.splice(projects.indexOf(selected), 1);
    saveProjects(projects);
    projectDisplay(projects);
  };

  const addTask = (e, task) => {
    e.preventDefault();
    currentProject.addTodo(task);
    currentTask = task;

    displayTasks(currentProject);
    saveProjects(projects);
    displayTaskList();
  };

  const deleteTask = (project, task) => {
    if (project) {
      project.tasks.splice(task.dataset.id, 1);
      saveProjects(projects);
      displayTasks(currentProject);
    }
  };

  const editTask = () => {
    currentTask.name = document.getElementById("edit-task-input").value;
    currentTask.desc = document.getElementById("edit-task-desc").value;
    currentTask.dueDate = format(
      new Date(document.getElementById("edit-task-date").value),
      "MM-dd-yyyy"
    );
    currentTask.priority = document.getElementById("edit-task-priority").value;

    saveProjects(projects);
    displayTasks(currentProject);
    displayTaskList();
  };

  const toggleComplete = (check, task) => {
    currentTask = currentProject.tasks[task.dataset.id];
    currentTask.completed = !currentTask.completed;
    if (currentTask.completed) {
      check.classList.add("checked");
      saveProjects(projects);
    } else {
      check.classList.remove("checked");
      saveProjects(projects);
    }
  };

  const clickProject = (e) => {
    const selected = e.target.closest(".project");
    const projectItems = document.querySelectorAll(".project");
    const deleteBtn = e.target.closest(".delete");

    if (selected && !deleteBtn) {
      currentProject = projects[selected.dataset.id];
      selected.style.backgroundColor = "#1c1b22";
    }

    projectItems.forEach((item) => {
      if (item !== selected) {
        item.style.backgroundColor = "";
      }
    });
    displayTasks(currentProject);
  };

  const clickTask = (e) => {
    const selected = e.target.closest(".task");
    const taskItems = document.querySelectorAll(".task");
    const deleteBtn = e.target.closest(".delete");
    const editBtn = e.target.closest(".edit-task");
    const checkmark = e.target.closest(".checkmark");

    if (selected && !checkmark) {
      currentTask = currentProject.tasks[selected.dataset.id];
      selected.style.backgroundColor = "#1c1b22";
    }

    if (deleteBtn) deleteTask(currentProject, selected);
    if (editBtn) displayEditForm(e);

    taskItems.forEach((item) => {
      if (item !== selected) {
        item.style.backgroundColor = "";
      }
    });
  };

  createTaskBtn.onclick = displayTaskForm;
  createProjectBtn.onclick = displayProjectForm;

  taskList.addEventListener("click", (e) => {
    const checkmark = e.target.closest(".checkmark");

    if (checkmark) {
      // prettier-ignore
      toggleComplete(checkmark, checkmark.closest(".task"));
      saveProjects(projects);
      displayTasks(currentProject);
    } else {
      clickTask(e);
    }
  });

  projectList.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete");

    if (deleteBtn) {
      deleteProject(e.target.closest(".project"));
    } else {
      clickProject(e);
    }
  });
  addProjectBtn.addEventListener("click", (e) => {
    if (validProject()) {
      addProject(e);
      projectForm.setAttribute("style", "display: none");
    }
  });
  addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const task = createTask();
    if (validTask()) {
      addTask(e, task);
      taskFormContainer.setAttribute("style", "display: none");
      taskForm.setAttribute("style", "display: none");
    }
  });

  editTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    editTask();
    taskFormContainer.setAttribute("style", "display: none");
    editForm.setAttribute("style", "display: none");
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
