import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { DashboardRoutes } from '../../../shared/interfaces/routes.interface';
import { getRequest, postRequest } from '../../../api/request';
import { TaskLabel, TaskProject, TasksResponse, TaskUser } from '../../../shared/interfaces/tasks.interface';
import { useTheme } from '../../../shared/context/ThemeContext';
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
  [DashboardRoutes.SETTINGS]: Settings,
  [DashboardRoutes.PROJECTS]: Projects,
};

const Dashboard: React.FC<DashboardProps> = ({ activeRoute, routeParams }) => {
  const { styles: themeStyles } = useTheme();
  const [tasks, setTasks] = useState<TasksResponse>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true);
  const [tasksError, setTasksError] = useState<string | null>(null);
  const [projects, setProjects] = useState<TaskProject[]>([]);
  const [collaborators, setCollaborators] = useState<TaskUser[]>([]);
  const [labels, setLabels] = useState<TaskLabel[]>([]);
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
          postRequest<TasksResponse>('/fetch/tasks/all'),
          getRequest<TaskProject[]>('/fetch/projects/all'),
          postRequest<TaskUser[]>('/retrieveAllCollaborators'),
          postRequest<TaskLabel[]>('/retrieveAllLabels'),
        ]);

        if (taskResponse.status === 'fulfilled') {
          setTasks(taskResponse.value);
        } else {
          const errorMessage = taskResponse.reason instanceof Error ? taskResponse.reason.message : 'Unable to fetch tasks.';
          setTasksError(errorMessage);
        }

        setProjects(projectsResponse.status === 'fulfilled' ? projectsResponse.value : []);
        setCollaborators(collaboratorsResponse.status === 'fulfilled' ? collaboratorsResponse.value : []);
        setLabels(labelsResponse.status === 'fulfilled' ? labelsResponse.value : []);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unable to fetch tasks.';
        setTasksError(errorMessage);
      } finally {
        setIsLoadingTasks(false);
        setIsProjectsLoading(false);
      }
    };

    void fetchDashboardData();
  }, []);

  const getStyles = (currentStyles: object[]) => {
    return [themeStyles, ...currentStyles];
  };

  return (
    <View style={getStyles([styles.container])}>
      <NavigationBar
        projects={projects}
        collaborators={collaborators}
        labels={labels}
        isProjectsLoading={isProjectsLoading}
      />
      <View style={getStyles([styles.contentContainer])}>
        {isLoadingTasks && (
            <View style={getStyles([styles.loaderContainer])}>
                <ActivityIndicator size="large" />
                <Text style={getStyles([styles.metaText])}>Loading tasks...</Text>
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
