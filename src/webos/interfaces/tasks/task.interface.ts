import { PRIORITY, TASK_STATUS, TASK_TYPE, TaskDates, TaskLabel, TaskProject, TaskUser } from '../../../shared/interfaces/tasks.interface';

export interface TaskComponentLabel {
  labelId: number;
  labelName: string;
}

export interface TaskComponentProps {
  taskId: number;
  taskName: string;
  taskDesc: string | null;
  parentTaskName?: string | null;
  parentTaskSubtaskCount?: number | null;
  priority: PRIORITY;
  taskType: TASK_TYPE;
  status: TASK_STATUS;
  assignee: TaskUser | null;
  reporter: TaskUser;
  dates: TaskDates;
  project: TaskProject;
  labels: TaskLabel[];
  isCompleted?: boolean;
  highlightHovers?: boolean;
  showProjectMeta?: boolean;
  onPress?: () => void;
}
