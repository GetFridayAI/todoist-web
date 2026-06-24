import { TaskReminder } from '../../../../shared/interfaces/tasks.interface';
import { TaskView } from '../viewtask.interface';

export type ReminderMode = 'dateTime' | 'beforeTask';

export interface AddTaskReminderSectionHandle {
  getReminders: () => TaskReminder[];
  reset: () => void;
}

export interface AddTaskReminderSectionProps {
  defaultReminders?: TaskReminder[];
  viewType?: TaskView;
}
