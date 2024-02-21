// api.ts

// const BASE_URL = "http://127.0.0.1:8080/api/v1";
const BASE_URL = "https://tdl-ass.onrender.com/api/v1";

const createEndpoint = (path: string): string => `${BASE_URL}/${path}`;

const AuthEndpoints = {
  register: createEndpoint("auth/register"),
  login: createEndpoint("auth/login"),
  refreshToken: createEndpoint("auth/token/refresh"),
  loginWithMetaMask: createEndpoint("auth/loginWithMetaMask")
};

const UserEndpoints = {
  getUsers: createEndpoint("users"),
  getUserByToken: createEndpoint("users/user"),
  getUserByID: (userID: string): string => createEndpoint(`users/${userID}`),
  getUserByUsername: (username: string): string => createEndpoint(`users/user/${username}`),
  updateUser: (userID: string): string => createEndpoint(`users/update/${userID}`),
};

const ProjectEndpoints = {
  createProject: createEndpoint("projects"),
  getProjects: createEndpoint("projects"),
  getProjectById: (projectId: string): string => createEndpoint(`projects/${projectId}`),
  updateProject: (projectId: string): string => createEndpoint(`projects/${projectId}`),
  deleteProject: (projectId: string): string => createEndpoint(`projects/${projectId}`),
  assignUserToPoject: createEndpoint("projects/assignUserToProject")
};

const TaskEndpoints = {
  createTask: createEndpoint("tasks"),
  getTasks: createEndpoint("tasks"),
  getTaskById: (taskId: string): string => createEndpoint(`tasks/${taskId}`),
  updateTask: (taskId: string): string => createEndpoint(`tasks/${taskId}`),
  deleteTask: (taskId: string): string => createEndpoint(`tasks/${taskId}`),
};

const ChatEndpoints = {
  // chat: "http://127.0.0.1:8081/"
  chat: "https://taskmanager-alt4.onrender.com"
}

export {
  AuthEndpoints,
  UserEndpoints,
  ProjectEndpoints,
  TaskEndpoints,
  ChatEndpoints
};
