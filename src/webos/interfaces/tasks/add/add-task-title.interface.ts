import { TaskView } from '../viewtask.interface';

export interface AddTaskTitleSectionHandle {
  getTaskName: () => string;
  getTaskDescription: () => string;
  reset: () => void;
}

export interface AddTaskTitleSectionProps {
  onTaskNameReadyChange?: (ready: boolean) => void;
  defaultTaskName?: string;
  defaultTaskDescription?: string;
  viewType?: TaskView;
}
