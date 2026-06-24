import { TASK_TYPE } from '../../../../../shared/interfaces/tasks.interface';
import { TaskView } from '../../viewtask.interface';

export interface AddTaskTypeFieldHandle {
  getValue: () => TASK_TYPE | null;
  reset: () => void;
}

export interface AddTaskTypeFieldProps {
  defaultValue?: TASK_TYPE | null;
  viewType?: TaskView;
}
