import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { DashboardRoutes } from '../../../shared/interfaces/routes.interface';
import { getRequest, postRequest } from '../../../api/request';
import { TaskLabel, TaskProject, Task, TaskUser } from '../../../shared/interfaces/tasks.interface';
import { useTheme } from '../../../shared/context/ThemeContext';
import { useAppStoreDispatch, useTasksStore } from '../../../shared/context/AppStoreContext';
import { AppStoreActionType } from '../../../shared/context/actions/AppStoreActions';
import styles from '../../styles/dashboard.styles';
import NavigationBar from './Navbar/NavigationBar';
import Search from './sections/Search';
import Inbox from './sections/Inbox';
import Today from './sections/Today';
import Upcoming from './sections/Upcoming';
import Completed from './sections/Completed';
import Settings from './sections/Settings';
import Projects from './sections/Projects';
import { DashboardSectionComponentProps } from '../../interfaces/dashboard.interface';
import Backlog from './sections/Backlog';

interface DashboardProps {
  activeRoute?: DashboardRoutes;
  routeParams?: Record<string, string>;
}

const SECTION_COMPONENT_MAP: Record<DashboardRoutes, React.ComponentType<DashboardSectionComponentProps>> = {
  [DashboardRoutes.SEARCH]: Search,
  [DashboardRoutes.INBOX]: Inbox,
  [DashboardRoutes.TODAY]: Today,
  [DashboardRoutes.UPCOMING]: Upcoming,
  [DashboardRoutes.COMPLETED]: Completed,
  [DashboardRoutes.BACKLOG]: Backlog,
  [DashboardRoutes.SETTINGS]: Settings,
  [DashboardRoutes.PROJECTS]: Projects,
};

const Dashboard: React.FC<DashboardProps> = ({ activeRoute, routeParams }) => {
  const { styles: themeStyles } = useTheme();
  const tasks = useTasksStore();
  const dispatch = useAppStoreDispatch();
  const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true);
  const [tasksError, setTasksError] = useState<string | null>(null);
  const [isProjectsLoading, setIsProjectsLoading] = useState<boolean>(true);

  const resolvedRoute = activeRoute ?? DashboardRoutes.TODAY;
  const ActiveSectionComponent = SECTION_COMPONENT_MAP[resolvedRoute] ?? Today;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoadingTasks(true);
        setIsProjectsLoading(true);
        setTasksError(null);

        const [taskResponse, projectsResponse, collaboratorsResponse, labelsResponse] = await Promise.allSettled([
            postRequest<Task[]>('/tasks/fetch/all'),
            getRequest<TaskProject[]>('/fetch/projects/all'),
            postRequest<TaskUser[]>('/fetch/collaborators/all'),
            postRequest<TaskLabel[]>('/fetch/labels/all'),
        ]);

        const nextTasks: Task[] = taskResponse.status === 'fulfilled' ? taskResponse.value : [];
        if (taskResponse.status !== 'fulfilled') {
          const errorMessage = taskResponse.reason instanceof Error ? taskResponse.reason.message : 'Unable to fetch tasks.';
          setTasksError(errorMessage);
        }

        dispatch({
          type: AppStoreActionType.SET_DASHBOARD_DATA,
          payload: {
            tasks: nextTasks,
            projects: projectsResponse.status === 'fulfilled' ? projectsResponse.value : [],
            users: collaboratorsResponse.status === 'fulfilled' ? collaboratorsResponse.value : [],
            labels: labelsResponse.status === 'fulfilled' ? labelsResponse.value : [],
          },
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unable to fetch tasks.';
        setTasksError(errorMessage);
      } finally {
        setIsLoadingTasks(false);
        setIsProjectsLoading(false);
      }
    };

    void fetchDashboardData();
  }, [dispatch]);

  const getStyles = (currentStyles: object[]) => {
    return [themeStyles, ...currentStyles];
  };

  return (
    <View style={getStyles([styles.container])}>
      <NavigationBar
        isProjectsLoading={isProjectsLoading}
      />
      <View style={getStyles([styles.contentContainer])}>
        {isLoadingTasks && (
            <View style={getStyles([styles.loaderContainer])}>
                <ActivityIndicator size="large" />
            </View>
        )}
        {!isLoadingTasks && tasksError && <Text style={getStyles([styles.errorText])}>{tasksError}</Text>}
        {!isLoadingTasks && !tasksError && (
            <ActiveSectionComponent routeParams={routeParams} tasks={tasks} />
        )}
      </View>
    </View>
  );
};

export default Dashboard;
