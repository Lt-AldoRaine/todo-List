import Task from "./task";
import Project from "./project";

export const projectList = [];
export const all = new Project("all");

export default function storage() {
  let projectData = {
    projectList,
    tasks: projectList.flatMap((project) => project.getTasks()),
  };

  const saveProject = () => {
    localStorage.setItem("project", JSON.stringify(projectData));
  };

  const getProject = () => {
    const storedProject = localStorage.getItem("project");
    projectData = JSON.parse(storedProject);

    const storedProjects = projectData.projects.map((project) => {
      const storedTasks = project.tasks.map(
        (task) =>
          new Task(
            task.name,
            task.dueDate,
            task.priority,
            task.project,
            task.completed
          )
      );
      return new Project(project.name, storedTasks);
    });

    const allTasks = projectData.all.map(
      (task) =>
        new Task(
          task.name,
          task.dueDate,
          task.priority,
          task.project,
          task.completed
        )
    );

    projectData.projects = storedProjects;
    projectData.tasks = storedProject.flatMap((project) => project.getTasks());
    projectData.all = allTasks;

    projectList.length = 0;
    projectList.push(...storedProjects);
    all.tasks.length = 0;
    all.tasks.push(...allTasks);
  };

  return {
    getProject,
    saveProject,
    get projects() {
      return projectList;
    },
  };
}
