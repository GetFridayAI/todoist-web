import { Task, TaskProject, TaskReminder } from '../../../shared/interfaces/tasks.interface';

export enum TaskView {
  CREATE = 1,
  EDIT = 2,
}

export interface ViewTaskProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
}

export interface ViewTaskFormValues {
  goal: string;
  location: string;
  project: TaskProject | null;
  reminders: TaskReminder[];
}