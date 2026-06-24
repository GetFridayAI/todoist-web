import { TaskView } from '../../viewtask.interface';

export enum AddTaskDateFieldKind {
  StartDate = 'startDate',
  DueDate = 'dueDate',
}

export interface AddTaskDateFieldHandle {
  getValue: () => string;
  reset: () => void;
}

export interface AddTaskDateFieldProps {
  kind: AddTaskDateFieldKind;
  defaultValue?: string;
  viewType?: TaskView;
  onChange?: (newDate: string) => void;
}
