import { TaskUser } from '../../../../../shared/interfaces/tasks.interface';
import { TaskView } from '../../viewtask.interface';

export enum AddTaskUserFieldKind {
  Assignee = 'assignee',
  Reporter = 'reporter',
}

export interface AddTaskUserFieldHandle {
  getValue: () => TaskUser | null;
  reset: () => void;
}

export interface AddTaskUserFieldProps {
  kind: AddTaskUserFieldKind;
  users: TaskUser[];
  defaultValue?: TaskUser | null;
  viewType?: TaskView;
}
