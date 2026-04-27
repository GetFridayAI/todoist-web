import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PRIORITY, Task as TaskType } from '../../../../shared/interfaces/tasks.interface';
import Task from '../tasks/Task';
import styles from '../../../styles/dashboard.styles';
import todayStyles from '../../../styles/today.styles';
import { DashboardSectionComponentProps } from '../../../interfaces/dashboard.interface';
import { useTheme } from '../../../../shared/context/ThemeContext';
import { COLORS } from '../../../../shared/styles/colors.styles';
import { FONT_SIZES } from '../../../../shared/styles/spacing.styles';
import { TaskComponentLabel } from '../../../interfaces/tasks/task.interface';

const PRIORITY_COLUMNS: PRIORITY[] = [PRIORITY.P0, PRIORITY.P1, PRIORITY.P2, PRIORITY.P3];

const Today: React.FC<DashboardSectionComponentProps> = ({ tasks = [] }) => {
  const { styles: themeStyles } = useTheme();
  const numberOfTasks = tasks.length;

  const getStyles = (currentStyles: object[]) => {
    return [themeStyles, ...currentStyles];
  };

  return (
    <View style={getStyles([todayStyles.sectionContainer])}>
      <Text style={getStyles([styles.title])}>Today</Text>
      <View style={todayStyles.todaySummaryRow}>
        <Ionicons name="checkmark-circle-outline" size={FONT_SIZES.MEDIUM} color={COLORS.OFF_WHITE} />
        <Text style={getStyles([todayStyles.todaySummaryText])}>{numberOfTasks} Tasks</Text>
      </View>

      <ScrollView
        horizontal
        style={todayStyles.priorityBoardScroll}
        contentContainerStyle={todayStyles.priorityBoardContent}
        showsHorizontalScrollIndicator={false}
      >
        {PRIORITY_COLUMNS.map((priority) => {
          const filteredTasks = tasks.filter((task) => task.priority === priority);

          return (
            <View key={priority} style={todayStyles.priorityColumn}>
              <View style={todayStyles.priorityColumnHeader}>
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
                      dates={task.dates}
                      priority={task.priority}
                      project={task.project}
                      taskType={task.taskType}
                      assignee={task.assignee}
                      reporter={task.reporter}
                      labels={task.labels.map((label, index) => ({ labelId: index, labelName: label }))}
                      isCompleted={false}
                      highlightHovers={true} />
                  </View>
                ))}

                {filteredTasks.length === 0 && (
                  <Text style={getStyles([todayStyles.emptyColumnText])}>No tasks in this priority.</Text>
                )}
              </ScrollView>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Today;
