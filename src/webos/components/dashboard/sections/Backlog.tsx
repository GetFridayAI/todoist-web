import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { getRequest } from '../../../../api/request';
import { useTheme } from '../../../../shared/context/ThemeContext';
import { Task } from '../../../../shared/interfaces/tasks.interface';
import { COLORS } from '../../../../shared/styles/colors.styles';
import { FONT_SIZES } from '../../../../shared/styles/spacing.styles';
import { useLocaleStore, useUsersStore } from '../../../../shared/context/AppStoreContext';
import { DashboardSectionComponentProps } from '../../../interfaces/dashboard.interface';
import { BacklogTasksResponse } from '../../../interfaces/dashboard/backlog.interface';
import dashboardStyles from '../../../styles/dashboard.styles';
import backlogStyles from '../../../styles/backlog.styles';
import ViewTask from '../../tasks/ViewTask';
import { filterTasksWithSomedayLabel, groupBacklogTasksByProject } from '../../../utils/backlog.utils';

const Backlog: React.FC<DashboardSectionComponentProps> = ({ routeParams }) => {
  const { styles: themeStyles } = useTheme();
  const collaborators = useUsersStore();
  const locale = useLocaleStore();

  const [backlogTasks, setBacklogTasks] = React.useState<BacklogTasksResponse>([]);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const getStyles = React.useCallback((currentStyles: object[]) => {
    return [themeStyles, ...currentStyles];
  }, [themeStyles]);

  const projectSections = React.useMemo(() => {
    return groupBacklogTasksByProject(backlogTasks);
  }, [backlogTasks]);

  React.useEffect(() => {
    const fetchBacklogTasks = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getRequest<BacklogTasksResponse>('/tasks/someday');
        const filteredTasks = filterTasksWithSomedayLabel(response);
        setBacklogTasks(filteredTasks);
      } catch (requestError) {
        const errorMessage = requestError instanceof Error ? requestError.message : 'Unable to load backlog tasks.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchBacklogTasks();
  }, []);

  return (
    <View style={getStyles([backlogStyles.sectionContainer])}>
      <Text style={getStyles([dashboardStyles.title])}>Backlog</Text>

      {isLoading && <Text style={getStyles([backlogStyles.loadingText])}>Loading backlog tasks...</Text>}
      {!isLoading && error && <Text style={getStyles([dashboardStyles.errorText])}>{error}</Text>}

      {!isLoading && !error && (
        <>
          <View style={backlogStyles.backlogSummaryRow}>
            <Ionicons name="calendar-outline" size={FONT_SIZES.MEDIUM} color={COLORS.OFF_WHITE} />
            <Text style={getStyles([backlogStyles.backlogSummaryText])}>{backlogTasks.length} Backlog</Text>
          </View>

          <ScrollView style={backlogStyles.listScroll} showsVerticalScrollIndicator={false}>
            {projectSections.map((section, sectionIndex) => (
              <View key={`project-${section.rootProjectId}`} style={backlogStyles.projectSection}>
                <Text style={backlogStyles.projectHeading}>{section.projectHierarchy}</Text>

                {section.tasks.map((task) => {
                  const isSelected = selectedTask?.taskId === task.taskId;

                  return (
                    <Pressable
                      key={task.taskId}
                      style={[backlogStyles.taskRow, isSelected ? backlogStyles.taskRowSelected : null]}
                      onPress={() => setSelectedTask(task)}
                    >
                      <View style={backlogStyles.taskRowContent}>
                        <Text style={backlogStyles.taskStatement}>{task.taskName}</Text>
                        <Text style={backlogStyles.taskProject}>{task.project.projectname}</Text>
                      </View>
                    </Pressable>
                  );
                })}

                {sectionIndex < projectSections.length - 1 && <View style={backlogStyles.divider} />}
              </View>
            ))}
          </ScrollView>

          {selectedTask && (
            <ViewTask
              visible={true}
              task={selectedTask}
              onClose={() => setSelectedTask(null)}
            />
          )}
        </>
      )}
    </View>
  );
};

export default Backlog;
