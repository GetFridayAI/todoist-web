import { Task, TaskLabel, TaskProject, TaskUser } from '../../interfaces/tasks.interface';

export enum AppStoreActionType {
  SET_DASHBOARD_DATA = 'SET_DASHBOARD_DATA',
  SET_TASKS = 'SET_TASKS',
  SET_PROJECTS = 'SET_PROJECTS',
  SET_USERS = 'SET_USERS',
  SET_LABELS = 'SET_LABELS',
  ADD_TASK = 'ADD_TASK',
  ADD_LABEL = 'ADD_LABEL',
}

export type AppStoreAction =
  | {
      type: AppStoreActionType.SET_DASHBOARD_DATA;
      payload: {
        tasks: Task[];
        projects: TaskProject[];
        users: TaskUser[];
        labels: TaskLabel[];
      };
    }
  | { type: AppStoreActionType.SET_TASKS; payload: Task[] }
  | { type: AppStoreActionType.SET_PROJECTS; payload: TaskProject[] }
  | { type: AppStoreActionType.SET_USERS; payload: TaskUser[] }
  | { type: AppStoreActionType.SET_LABELS; payload: TaskLabel[] }
  | { type: AppStoreActionType.ADD_TASK; payload: Task }
  | { type: AppStoreActionType.ADD_LABEL; payload: TaskLabel };
