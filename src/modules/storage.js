import Project from "./project";

const DATA = "data"

const saveProjects = (project) => {
  localStorage.setItem(DATA, JSON.stringify(project));
};

const getProjects = () => {
  const data = localStorage.getItem(DATA);
  if (!data) {
    return [];
  } 
  const parsed = JSON.parse(data);

  return parsed.map((projectData) => Object.assign(new Project(), projectData));
};

export { saveProjects, getProjects };
