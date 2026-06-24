import { PRIORITY, TASK_STATUS, TASK_TYPE, TaskLabel, TaskPriority, TaskUser } from '../../../../../shared/interfaces/tasks.interface';
import { TaskView } from '../../viewtask.interface';

export enum AddTaskAttributePanel {
  Labels = 'labels',
  Priority = 'priority',
  Status = 'status',
  TaskType = 'taskType',
  Assignee = 'assignee',
  Reporter = 'reporter',
  StartDate = 'startDate',
  DueDate = 'dueDate',
}

export type ActivePanel = AddTaskAttributePanel | null;

export interface AddTaskDatesValue {
  start: string;
  due: string;
}

export interface AddTaskAttributesValue {
  priority: PRIORITY | null;
  status: TASK_STATUS;
  taskType: TASK_TYPE | null;
  assignee: TaskUser | null;
  reporter: TaskUser | null;
  labels: TaskLabel[];
  dates: AddTaskDatesValue;
}

export interface AddTaskAttributesSectionHandle {
  getValues: () => AddTaskAttributesValue;
  reset: () => void;
  closeAllPanels: () => void;
}

export interface AddTaskAttributesSectionProps {
  collaborators: TaskUser[];
  labels: TaskLabel[];
  dispatchAddLabel: (label: TaskLabel) => void;
  defaultPriority: TaskPriority | null;
  viewType?: TaskView;
  defaultValues?: Partial<AddTaskAttributesValue>;
  onPanelOpen?: () => void;
  onPanelClose?: () => void;
  onDateChange?: (fieldKind: 'startDate' | 'dueDate', newDate: string) => void;
}
