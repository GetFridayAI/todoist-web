export enum PRIORITY {
  P0 = 0,
  P1 = 1,
  P2 = 2,
  P3 = 3,
}

export enum TASK_TYPE {
  TASK = 1,
  SUB_TASK = 2,
}

export interface TaskUser {
  userId: number;
  userName: string;
}

export interface TaskDates {
  created: string;
  updated: string;
  start: string;
  due: string;
}

export interface TaskProject {
  projectId: number;
  projectname: string;
  projectIconColor?: string;
  createdAt?: string;
  parentProjectId: number | null;
  isFavorite?: boolean;
  openTasksCount: number | null;
  hasSubProjects: boolean;
}

export interface TaskReminder {
  date: string;
  time: string;
}

export interface Task {
  taskId: number;
  taskName: string;
  taskDesc: string;
  priority: PRIORITY;
  assignee: TaskUser;
  reporter: TaskUser;
  dates: TaskDates;
  project: TaskProject;
  labels: string[];
  comments: string[];
  taskType: TASK_TYPE;
  reminders: TaskReminder[];
}

export type TasksResponse = Task[];
