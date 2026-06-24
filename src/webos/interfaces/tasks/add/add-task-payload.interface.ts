import {
  PRIORITY,
  TASK_STATUS,
  TASK_TYPE,
  TaskLabel,
  TaskProject,
  TaskReminder,
  TaskUser,
} from '../../../../shared/interfaces/tasks.interface';

export interface AddTaskPayload {
  taskName: string;
  taskDesc: string | null;
  priority: PRIORITY | null;
  assignee: TaskUser | null;
  reporter: TaskUser;
  dates: {
    start: string;
    due: string;
  };
  project: TaskProject | null;
  labels: TaskLabel[];
  taskType: TASK_TYPE | null;
  status: TASK_STATUS;
  isRecurring: boolean;
  reminders: TaskReminder[];
}
