const DATA = "projectData";

const saveProjects = (project) => {
  localStorage.setItem(DATA, JSON.stringify(project));
};

const getProjects = () => {
  const data = localStorage.getItem(DATA);
  return data ? JSON.parse(data) : [];
};

export { saveProjects, getProjects };
