import { TasksResponse } from '../../shared/interfaces/tasks.interface';

export interface DashboardSectionComponentProps {
  routeParams?: Record<string, string>;
  tasks?: TasksResponse;
}