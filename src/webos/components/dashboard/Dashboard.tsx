import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { DashboardRoutes } from '../../../shared/interfaces/routes.interface';
import { postRequest } from '../../../api/request';
import { TasksResponse } from '../../../shared/interfaces/tasks.interface';
import { useTheme } from '../../../shared/context/ThemeContext';
import styles from '../../styles/dashboard.styles';
import NavigationBar from './Navbar/NavigationBar';
import navigationStyles from '../../styles/navigation.styles';
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
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  const resolvedRoute = activeRoute ?? DashboardRoutes.TODAY;
  const ActiveSectionComponent = SECTION_COMPONENT_MAP[resolvedRoute] ?? Today;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoadingTasks(true);
        setTasksError(null);
        const taskResponse = await postRequest<TasksResponse>('/fetch/tasks/all');
        setTasks(taskResponse);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unable to fetch tasks.';
        setTasksError(errorMessage);
      } finally {
        setIsLoadingTasks(false);
      }
    };

    void fetchTasks();
  }, []);

  const getStyles = (currentStyles: object[]) => {
    return [themeStyles, ...currentStyles];
  };

  return (
    <View style={getStyles([styles.container])}>
      <NavigationBar isAddMenuOpen={isAddMenuOpen} setIsAddMenuOpen={setIsAddMenuOpen} />
      {isAddMenuOpen && (
        <Pressable 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onPress={() => setIsAddMenuOpen(false)}
        />
      )}
      {isAddMenuOpen && (
        <View style={navigationStyles.addMenuDropdown}>
          <Pressable style={navigationStyles.addMenuItem} onPress={() => setIsAddMenuOpen(false)}>
            <Text style={navigationStyles.addMenuItemText}>Add Task</Text>
          </Pressable>
          <Pressable style={[navigationStyles.addMenuItem, navigationStyles.addMenuItemLast]} onPress={() => setIsAddMenuOpen(false)}>
            <Text style={navigationStyles.addMenuItemText}>Add Project</Text>
          </Pressable>
        </View>
      )}
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
