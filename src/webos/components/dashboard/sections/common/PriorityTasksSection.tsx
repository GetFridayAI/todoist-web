import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { PRIORITY, Task as TaskType, TasksResponse } from '../../../../../shared/interfaces/tasks.interface';
import { useTheme } from '../../../../../shared/context/ThemeContext';
import { COLORS } from '../../../../../shared/styles/colors.styles';
import { FONT_SIZES } from '../../../../../shared/styles/spacing.styles';
import dashboardStyles from '../../../../styles/dashboard.styles';
import todayStyles from '../../../../styles/today.styles';
import Task from '../../tasks/Task';
import ViewTask from '../../../tasks/ViewTask';

const PRIORITY_COLUMNS: PRIORITY[] = [PRIORITY.P0, PRIORITY.P1, PRIORITY.P2, PRIORITY.P3];

interface PriorityTasksSectionProps {
  title: string;
  tasks: TasksResponse;
  showProjectMeta?: boolean;
}

const PriorityTasksSection: React.FC<PriorityTasksSectionProps> = ({
  title,
  tasks,
  showProjectMeta = true,
}) => {
  const { styles: themeStyles } = useTheme();
  const [selectedTask, setSelectedTask] = React.useState<TaskType | null>(null);
  const visiblePriorities = PRIORITY_COLUMNS.filter((priority) =>
    tasks.some((task) => task.priority === priority),
  );

  const getStyles = (currentStyles: object[]) => {
    return [themeStyles, ...currentStyles];
  };

  return (
    <View style={getStyles([todayStyles.sectionContainer])}>
      <Text style={getStyles([dashboardStyles.title])}>{title}</Text>
      <View style={todayStyles.todaySummaryRow}>
        <Ionicons name="checkmark-circle-outline" size={FONT_SIZES.MEDIUM} color={COLORS.OFF_WHITE} />
        <Text style={getStyles([todayStyles.todaySummaryText])}>{tasks.length} Tasks</Text>
      </View>

      <ScrollView
        horizontal
        style={todayStyles.priorityBoardScroll}
        contentContainerStyle={todayStyles.priorityBoardContent}
        showsHorizontalScrollIndicator={false}
      >
        {visiblePriorities.map((priority) => {
          const filteredTasks = tasks.filter((task) => task.priority === priority);

          return (
            <View key={priority} style={todayStyles.priorityColumn}>
              <View style={todayStyles.priorityColumnHeader} id="priority-column-header">
                <Text style={getStyles([todayStyles.priorityColumnTitle])}>Priority {priority}</Text>
                <Text style={getStyles([todayStyles.priorityColumnCount])}>{filteredTasks.length}</Text>
              </View>

              <ScrollView style={todayStyles.priorityColumnList} contentContainerStyle={todayStyles.priorityColumnListContent}>
                {filteredTasks.map((task: TaskType) => (
                  <View key={task.taskId} style={todayStyles.taskCard}>
                    <Task
                      taskId={task.taskId}
                      taskName={task.taskName}
                      taskDesc={task.taskDesc}
                      parentTaskName={task.parentTaskName ?? null}
                      parentTaskSubtaskCount={task.parentTaskSubtaskCount ?? null}
                      dates={task.dates}
                      priority={task.priority}
                      project={task.project}
                      taskType={task.taskType}
                      assignee={task.assignee}
                      reporter={task.reporter}
                      labels={task.labels.map((label, index) => ({ labelId: index, labelName: label.labelName }))}
                      isCompleted={false}
                      highlightHovers={true}
                      showProjectMeta={showProjectMeta}
                      onPress={() => setSelectedTask(task)}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          );
        })}
      </ScrollView>

      {selectedTask && (
        <ViewTask
          visible={true}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </View>
  );
};

export default PriorityTasksSection;
