// api.ts

const BASE_URL = "http://127.0.0.1:8080/api/v1";

const createEndpoint = (path: string): string => `${BASE_URL}/${path}`;

const AuthEndpoints = {
  register: createEndpoint("auth/register"),
  login: createEndpoint("auth/login"),
  refreshToken: createEndpoint("auth/token/refresh"),
};

const UserEndpoints = {
  getUsers: createEndpoint("users"),
  getUserByToken: createEndpoint("users/user"),
  getUserByUsername: (username: string): string => createEndpoint(`users/${username}`),
};

const ProjectEndpoints = {
  createProject: createEndpoint("projects"),
  getProjects: createEndpoint("projects"),
  getProjectById: (projectId: string): string => createEndpoint(`projects/${projectId}`),
  updateProject: (projectId: string): string => createEndpoint(`projects/${projectId}`),
  deleteProject: (projectId: string): string => createEndpoint(`projects/${projectId}`),
};

const TaskEndpoints = {
  createTask: createEndpoint("tasks"),
  getTasks: createEndpoint("tasks"),
  getTaskById: (taskId: string): string => createEndpoint(`tasks/${taskId}`),
  updateTask: (taskId: string): string => createEndpoint(`tasks/${taskId}`),
  deleteTask: (taskId: string): string => createEndpoint(`tasks/${taskId}`),
};

export {
  AuthEndpoints,
  UserEndpoints,
  ProjectEndpoints,
  TaskEndpoints,
};
