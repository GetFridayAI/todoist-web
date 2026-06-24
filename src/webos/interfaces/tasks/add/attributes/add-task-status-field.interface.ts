import { TASK_STATUS } from '../../../../../shared/interfaces/tasks.interface';
import { TaskView } from '../../viewtask.interface';

export interface AddTaskStatusFieldHandle {
  getValue: () => TASK_STATUS;
  reset: () => void;
}

export interface AddTaskStatusFieldProps {
  defaultValue?: TASK_STATUS;
  viewType?: TaskView;
}
