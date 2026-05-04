import { DropdownOption } from '../../../shared/components/dropdowninput.interface';
import {
  PRIORITY,
  TASK_TYPE,
  TaskLabel,
  TaskProject,
  TaskReminder,
  TaskUser,
} from '../../../shared/interfaces/tasks.interface';

export interface AddTaskPayload {
  taskName: string;
  taskDesc: string;
  priority: PRIORITY | null;
  assignee: TaskUser | null;
  reporter: TaskUser | null;
  dates: {
    start: string;
    due: string;
  };
  project: TaskProject | null;
  labels: string[];
  taskType: TASK_TYPE | null;
  isRecurring: boolean;
  reminders: TaskReminder[];
}

export interface AddTaskProps {
  visible: boolean;
  collaborators: TaskUser[];
  projects: TaskProject[];
  labels: TaskLabel[];
  onClose: () => void;
  onCancel: () => void;
  onAdd: (payload: AddTaskPayload) => void;
}

export type ActivePanel =
  | null
  | 'labels'
  | 'priority'
  | 'taskType'
  | 'assignee'
  | 'reporter'
  | 'startDate'
  | 'dueDate';

export type ReminderMode = 'dateTime' | 'beforeTask';

export const TIME_OPTIONS: DropdownOption[] = Array.from({ length: 24 }, (_, hour) => ({
  label: `${String(hour).padStart(2, '0')}:00`,
  value: `${String(hour).padStart(2, '0')}:00`,
}));

export const PRIORITY_OPTIONS: DropdownOption[] = Object.values(PRIORITY)
  .filter((priority) => typeof priority === 'number')
  .map((priority) => ({
    label: `Priority ${priority}`,
    value: priority as number,
  }));

export const TASK_TYPE_OPTIONS: DropdownOption[] = [
  { label: 'Task', value: TASK_TYPE.TASK },
  { label: 'Sub task', value: TASK_TYPE.SUB_TASK },
];

export const REPEAT_OPTIONS = [
  'Every day',
  'Every week on Wednesday',
  'Every weekday (Mon - Fri)',
  'Every month on the 29th',
  'Every year on April 29th',
  'Custom...',
];

export const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
