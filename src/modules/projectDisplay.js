export default function projectDisplay(project) {
  const projectList = document.getElementById("project-list");
  const projectDiv = document.createElement("div");

  projectDiv.classList.add("project");

  projectDiv.innerText = project.name;

  projectList.appendChild(projectDiv);
}
