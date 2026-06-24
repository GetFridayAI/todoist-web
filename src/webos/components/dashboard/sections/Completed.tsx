import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { getRequest } from '../../../../api/request';
import { useTheme } from '../../../../shared/context/ThemeContext';
import { Task, TaskUser } from '../../../../shared/interfaces/tasks.interface';
import { COLORS } from '../../../../shared/styles/colors.styles';
import { FONT_SIZES } from '../../../../shared/styles/spacing.styles';
import { useLocaleStore, useUsersStore } from '../../../../shared/context/AppStoreContext';
import { DashboardSectionComponentProps } from '../../../interfaces/dashboard.interface';
import { CompletedTasksResponse } from '../../../interfaces/dashboard/completed.interface';
import dashboardStyles from '../../../styles/dashboard.styles';
import completedStyles from '../../../styles/completed.styles';
import ViewTask from '../../tasks/ViewTask';
import { formatCompletedTimestamp, groupCompletedTasksByDay } from '../../../utils/completed.utils';

const Completed: React.FC<DashboardSectionComponentProps> = ({ routeParams }) => {
  const { styles: themeStyles } = useTheme();
  const collaborators = useUsersStore();
  const locale = useLocaleStore();

  const [completedTasks, setCompletedTasks] = React.useState<CompletedTasksResponse>([]);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const getStyles = React.useCallback((currentStyles: object[]) => {
    return [themeStyles, ...currentStyles];
  }, [themeStyles]);

  const resolveCurrentUser = React.useCallback((): TaskUser | null => {
    const currentUserId = Number(routeParams?.currentUserId ?? '');
    if (!Number.isNaN(currentUserId)) {
      const matchedById = collaborators.find((user) => user.userId === currentUserId);
      if (matchedById) {
        return matchedById;
      }
    }

    const matchedByName = collaborators.find((user) => user.userName === 'Amit Rai');
    if (matchedByName) {
      return matchedByName;
    }

    return collaborators.length > 0 ? collaborators[0] : null;
  }, [collaborators, routeParams?.currentUserId]);

  const currentUser = React.useMemo(() => resolveCurrentUser(), [resolveCurrentUser]);

  const daySections = React.useMemo(() => {
    return groupCompletedTasksByDay(completedTasks, locale);
  }, [completedTasks, locale]);

  React.useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getRequest<CompletedTasksResponse>('/tasks/completed');
        setCompletedTasks(response.filter((task) => task.isCompleted));
      } catch (requestError) {
        const errorMessage = requestError instanceof Error ? requestError.message : 'Unable to load completed tasks.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchCompletedTasks();
  }, []);

  const getCompletedByText = React.useCallback((task: Task): string => {
    const completedBy = task.completedBy;
    const completedByName = completedBy?.userName ?? 'Someone';
    const isCurrentUser = !!(currentUser && completedBy && currentUser.userId === completedBy.userId);
    const actor = isCurrentUser ? 'You' : completedByName;
    return `${actor} completed ${task.taskName}`;
  }, [currentUser]);

  return (
    <View style={getStyles([completedStyles.sectionContainer])}>
      <Text style={getStyles([dashboardStyles.title])}>Completed</Text>

      {isLoading && <Text style={getStyles([completedStyles.loadingText])}>Loading completed tasks...</Text>}
      {!isLoading && error && <Text style={getStyles([dashboardStyles.errorText])}>{error}</Text>}

      {!isLoading && !error && (
        <>
          <View style={completedStyles.completedSummaryRow}>
            <Ionicons name="checkmark-circle-outline" size={FONT_SIZES.MEDIUM} color={COLORS.OFF_WHITE} />
            <Text style={getStyles([completedStyles.completedSummaryText])}>{completedTasks.length} Completed</Text>
          </View>

          <ScrollView style={completedStyles.listScroll} showsVerticalScrollIndicator={false}>
            {daySections.map((section) => (
              <View key={section.dayKey} style={completedStyles.daySection}>
                <Text style={completedStyles.dayHeading}>{section.dayLabel}</Text>

                {section.tasks.map((task) => {
                  const isSelected = selectedTask?.taskId === task.taskId;

                  return (
                    <Pressable
                      key={task.taskId}
                      style={[completedStyles.taskRow, isSelected ? completedStyles.taskRowSelected : null]}
                      onPress={() => setSelectedTask(task)}
                    >
                      <View style={completedStyles.taskRowContent}>
                        <Text style={completedStyles.taskStatement}>{getCompletedByText(task)}</Text>
                        <Text style={completedStyles.taskProject}>{task.project.projectname}</Text>
                      </View>
                      <Text style={completedStyles.taskTime}>{formatCompletedTimestamp(task.completedAt ?? '', locale)}</Text>
                    </Pressable>
                  );
                })}
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

export default Completed;
