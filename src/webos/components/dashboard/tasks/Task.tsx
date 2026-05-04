import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { PRIORITY } from '../../../../shared/interfaces/tasks.interface';
import { TaskComponentProps } from '../../../interfaces/tasks/task.interface';
import styles from '../../../styles/tasks/task.styles';
import { COLORS } from '../../../../shared/styles/colors.styles';
import { formatDateToDayMonth } from '../../../utils';

const PRIORITY_LABEL: Record<PRIORITY, string> = {
  [PRIORITY.P0]: 'P0',
  [PRIORITY.P1]: 'P1',
  [PRIORITY.P2]: 'P2',
  [PRIORITY.P3]: 'P3',
};

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

const Task: React.FC<TaskComponentProps> = ({
  taskName,
  priority,
  assignee,
  dates,
  project,
  labels,
  isCompleted = false,
  highlightHovers = false,
}) => {
  const labelsDisplay = labels.length > 0 ? labels.map((l) => l.labelName).join(' | ') : null;
  const isStartDatePast = new Date(dates.start) < new Date();
  const isStartDateToday = new Date(dates.start).toDateString() === new Date().toDateString();
  const isDueDatePast = new Date(dates.due) < new Date();
  const isDueDateToday = new Date(dates.due).toDateString() === new Date().toDateString();
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  const getIconColor = (datePast: boolean, dateToday: boolean) => {
    if (datePast) return COLORS.RED_BLOOD;
    if (dateToday) return COLORS.GREEN;
    return COLORS.PURPLE;
  }

  const checkboxColorStyle = {
    [PRIORITY.P0]: styles.checkboxP0,
    [PRIORITY.P1]: styles.checkboxP1,
    [PRIORITY.P2]: styles.checkboxP2,
    [PRIORITY.P3]: styles.checkboxP3,
  }

  return (
    <Pressable
      style={[styles.container, isHovered && styles.containerHovered]}
      onHoverIn={() => highlightHovers && setIsHovered(true)}
      onHoverOut={() => highlightHovers && setIsHovered(false)}>
        <Pressable style={[styles.checkbox, checkboxColorStyle[priority], isCompleted && styles.checkboxCompleted]}>
            {isCompleted && <Ionicons name="checkmark" size={13} color="#6b7280" />}
        </Pressable>

      <View style={styles.body}>
        <Text style={[styles.taskName, isCompleted && styles.taskNameCompleted]}>{taskName}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <Ionicons name="calendar-outline" size={12} color={getIconColor(isStartDatePast, isStartDateToday)} />
            <Text style={[styles.metaText, isStartDatePast && styles.metaTextPast, isStartDateToday && styles.metaTextToday, !isStartDatePast && !isStartDateToday && styles.metaTextFuture]}>
              {formatDateToDayMonth(dates.start)}
            </Text>
            <Ionicons name="calendar-outline" size={12} color={getIconColor(isDueDatePast, isDueDateToday)} />
            <Text style={[styles.metaText, isDueDatePast && styles.metaTextPast, isDueDateToday && styles.metaTextToday, !isDueDatePast && !isDueDateToday && styles.metaTextFuture]}>
              {formatDateToDayMonth(dates.due)}
            </Text>
          </View>

          {labelsDisplay && (
            <View style={styles.metaChip}>
              <Ionicons name="pricetag-outline" size={12} color={COLORS.RED_BLOOD} />
              <Text style={styles.metaTextSecondary}>
                {project.projectname}
                <Text style={styles.separator}> | </Text>
                {labelsDisplay}
              </Text>
            </View>
          )}

          <View style={styles.metaChip}>
            <Ionicons name="folder-outline" size={12} color={COLORS.RED_BLOOD} />
            <Text style={styles.metaTextSecondary}>
              {project.projectname}/{assignee.userName}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(assignee.userName)}</Text>
      </View>
    </Pressable>
  );
};

export default Task;
