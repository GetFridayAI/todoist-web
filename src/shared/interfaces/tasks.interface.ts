export enum PRIORITY {
  P0 = 0,
  P1 = 1,
  P2 = 2,
  P3 = 3,
}

export type TaskPriority = PRIORITY;

export enum TASK_TYPE {
  TASK = 1,
  SUB_TASK = 2,
}

export enum TASK_STATUS {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  REVIEW = 'REVIEW',
  TEST = 'TEST',
  DESIGN = 'DESIGN',
  BLOCKED = 'BLOCKED',
}
// Used for task assignee or reporter
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

export interface TaskLabel {
  labelId: number;
  labelName: string;
  isDefault?: boolean;
}

export interface Task {
  taskId: number;
  taskName: string;
  taskDesc: string | null;
  parentTaskName?: string | null;
  parentTaskSubtaskCount?: number | null;
  priority: PRIORITY;
  assignee: TaskUser | null;
  reporter: TaskUser;
  dates: TaskDates;
  project: TaskProject;
  labels: TaskLabel[];
  comments: string[];
  taskType: TASK_TYPE;
  status: TASK_STATUS;
  isRecurring?: boolean;
  reminders: TaskReminder[];
  isCompleted?: boolean;
  completedAt?: string;
  completedBy?: TaskUser;
}

export type TasksResponse = Task[];

export interface CreateTaskResponse {
  success: boolean;
}
