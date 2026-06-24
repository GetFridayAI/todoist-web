import { Task } from '../../../shared/interfaces/tasks.interface';

export type CompletedTasksResponse = Task[];

export interface CompletedDaySection {
  dayKey: string;
  dayLabel: string;
  tasks: Task[];
}
