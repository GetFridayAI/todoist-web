import { Task, TaskLabel, TaskProject, TaskUser } from '../../interfaces/tasks.interface';
import { AppStoreAction, AppStoreActionType } from '../actions/AppStoreActions';

export interface AppStoreState {
  tasks: Task[];
  projects: TaskProject[];
  users: TaskUser[];
  labels: TaskLabel[];
}

export const initialAppStoreState: AppStoreState = {
  tasks: [],
  projects: [],
  users: [],
  labels: [],
};

export const appStoreReducer = (state: AppStoreState, action: AppStoreAction): AppStoreState => {
  switch (action.type) {
    case AppStoreActionType.SET_DASHBOARD_DATA: {
      const { tasks, projects, users, labels } = action.payload;
      return {
        ...state,
        tasks,
        projects,
        users,
        labels,
      };
    }
    case AppStoreActionType.SET_TASKS:
      return { ...state, tasks: action.payload };
    case AppStoreActionType.SET_PROJECTS:
      return { ...state, projects: action.payload };
    case AppStoreActionType.SET_USERS:
      return { ...state, users: action.payload };
    case AppStoreActionType.SET_LABELS:
      return { ...state, labels: action.payload };
    case AppStoreActionType.ADD_TASK:
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case AppStoreActionType.ADD_LABEL:
      return {
        ...state,
        labels: state.labels.some((label) => label.labelId === action.payload.labelId)
          ? state.labels
          : [...state.labels, action.payload],
      };
    default:
      return state;
  }
};
