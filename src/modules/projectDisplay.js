import taskDisplay from "./taskDisplay";

const projectWrapper = document.getElementById("project-list");
const taskList = document.getElementById("task-list");

export function projectDisplay(projects) {
  projectWrapper.innerText = "";

  projects.forEach((project) => {
    const projectDiv = document.createElement("div");

    projectDiv.classList.add("project");
    projectDiv.setAttribute("data-id", projects.indexOf(project));
    projectDiv.innerText = project.name;
    projectWrapper.appendChild(projectDiv);
  });
}

export const displayTasks = (project) => {
  taskList.innerHTML = "";

  if (project) {
    project.tasks.forEach((task) => {
      taskDisplay(task);
    });
  }
};
