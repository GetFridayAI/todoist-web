import { TaskLabel } from '../../../../../shared/interfaces/tasks.interface';
import { TaskView } from '../../viewtask.interface';

export interface AddTaskLabelsFieldHandle {
  getValue: () => TaskLabel[];
  reset: () => void;
}

export interface AddTaskLabelsFieldProps {
  labels: TaskLabel[];
  onCreateLabel: (label: TaskLabel) => void;
  defaultValues?: TaskLabel[];
  viewType?: TaskView;
}
