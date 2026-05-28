import React from 'react';
import { Task, TaskLabel, TaskProject, TaskUser } from '../interfaces/tasks.interface';
import { AppStoreAction } from './actions/AppStoreActions';
import { appStoreReducer, initialAppStoreState } from './reducers/AppStoreReducer';

const TasksContext = React.createContext<Task[] | null>(null);
const ProjectsContext = React.createContext<TaskProject[] | null>(null);
const UsersContext = React.createContext<TaskUser[] | null>(null);
const LabelsContext = React.createContext<TaskLabel[] | null>(null);
const DispatchContext = React.createContext<React.Dispatch<AppStoreAction> | null>(null);

interface AppStoreProviderProps {
  children: React.ReactNode;
}

export const AppStoreProvider: React.FC<AppStoreProviderProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(appStoreReducer, initialAppStoreState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TasksContext.Provider value={state.tasks}>
        <ProjectsContext.Provider value={state.projects}>
          <UsersContext.Provider value={state.users}>
            <LabelsContext.Provider value={state.labels}>
              {children}
            </LabelsContext.Provider>
          </UsersContext.Provider>
        </ProjectsContext.Provider>
      </TasksContext.Provider>
    </DispatchContext.Provider>
  );
};

const useContextValue = <T,>(context: React.Context<T | null>, hookName: string): T => {
  const value = React.useContext(context);
  if (value === null) {
    throw new Error(`${hookName} must be used within AppStoreProvider`);
  }
  return value;
};

export const useTasksStore = (): Task[] => useContextValue(TasksContext, 'useTasksStore');
export const useProjectsStore = (): TaskProject[] => useContextValue(ProjectsContext, 'useProjectsStore');
export const useUsersStore = (): TaskUser[] => useContextValue(UsersContext, 'useUsersStore');
export const useLabelsStore = (): TaskLabel[] => useContextValue(LabelsContext, 'useLabelsStore');
export const useAppStoreDispatch = (): React.Dispatch<AppStoreAction> =>
  useContextValue(DispatchContext, 'useAppStoreDispatch');
