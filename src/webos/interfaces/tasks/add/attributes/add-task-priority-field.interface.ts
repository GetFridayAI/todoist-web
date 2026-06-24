import { PRIORITY } from '../../../../../shared/interfaces/tasks.interface';
import { TaskView } from '../../viewtask.interface';

export interface AddTaskPriorityFieldHandle {
  getValue: () => PRIORITY | null;
  reset: () => void;
}

export interface AddTaskPriorityFieldProps {
  defaultPriority: PRIORITY | null;
  viewType?: TaskView;
}
