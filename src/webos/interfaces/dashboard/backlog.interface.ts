import { Task, TaskProject } from '../../../shared/interfaces/tasks.interface';

export type BacklogTasksResponse = Task[];

export interface BacklogProjectSection {
  rootProjectId: number;
  projectHierarchy: string;
  project: TaskProject;
  tasks: Task[];
}
