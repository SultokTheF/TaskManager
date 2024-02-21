interface Project {
  _id?: string;
  name: string;
  description: string;
  createdBy: string;
  dueDate: string;
  activeTasks?: number;
  location?: string;   
  createdAt?: string;
  assignedUsers?: []
}

export default Project;