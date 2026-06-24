import { TaskPriority } from '../../../../shared/interfaces/tasks.interface';

export interface AddTaskProps {
  visible: boolean;
  onClose: () => void;
  onCancel: () => void;
  defaultPriority: TaskPriority | null;
}
