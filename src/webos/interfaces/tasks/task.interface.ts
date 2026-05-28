import { PRIORITY, TASK_TYPE, TaskDates, TaskProject, TaskUser } from '../../../shared/interfaces/tasks.interface';

export interface TaskComponentLabel {
  labelId: number;
  labelName: string;
}

export interface TaskComponentProps {
  taskId: number;
  taskName: string;
  taskDesc: string;
  priority: PRIORITY;
  taskType: TASK_TYPE;
  assignee: TaskUser;
  reporter: TaskUser;
  dates: TaskDates;
  project: TaskProject;
  labels: TaskComponentLabel[];
  isCompleted?: boolean;
  highlightHovers?: boolean;
}
