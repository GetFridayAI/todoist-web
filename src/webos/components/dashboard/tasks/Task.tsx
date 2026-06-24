import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { PRIORITY, TASK_STATUS, TASK_TYPE } from '../../../../shared/interfaces/tasks.interface';
import { TaskComponentProps } from '../../../interfaces/tasks/task.interface';
import styles from '../../../styles/tasks/task.styles';
import { COLORS } from '../../../../shared/styles/colors.styles';
import { formatDateToDayMonth } from '../../../utils';
import { FONT_SIZES } from '../../../../shared/styles/spacing.styles';

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

const Task: React.FC<TaskComponentProps> = ({
  taskName,
  taskType,
  parentTaskName,
  parentTaskSubtaskCount,
  priority,
  status = TASK_STATUS.TODO,
  assignee,
  dates,
  project,
  labels,
  isCompleted = false,
  highlightHovers = false,
  showProjectMeta = true,
  onPress,
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

  const showParentStrip = taskType === TASK_TYPE.SUB_TASK && !!parentTaskName;

  return (
    <Pressable
      style={[styles.container, isHovered && styles.containerHovered]}
      onHoverIn={() => highlightHovers && setIsHovered(true)}
      onHoverOut={() => highlightHovers && setIsHovered(false)}
      onPress={onPress}
    >
        <Pressable style={[styles.checkbox, checkboxColorStyle[priority], isCompleted && styles.checkboxCompleted]}>
            {isCompleted && <Ionicons name="checkmark" size={13} color="#6b7280" />}
        </Pressable>

      <View style={styles.body}>
        {showParentStrip && (
          <View style={styles.parentTaskStrip}>
            <Text numberOfLines={1} style={styles.parentTaskText}>{parentTaskName}</Text>
            <View style={styles.parentTaskCountGroup}>
              <Ionicons name="git-branch-outline" size={12} color={COLORS.OFF_WHITE} />
              <Text style={styles.parentTaskCountText}>{parentTaskSubtaskCount ?? 0}</Text>
              <Ionicons name="chevron-forward-outline" size={12} color={COLORS.OFF_WHITE} />
            </View>
          </View>
        )}

        <Text style={[styles.taskName, isCompleted && styles.taskNameCompleted]}>{taskName}</Text>

        <View style={styles.metaRow}>
          {
            (dates.start || dates.due) && (
              <View style={styles.metaChip}>
                {
                  dates.start && (<>
                    <Ionicons name="calendar-outline" size={12} color={getIconColor(isStartDatePast, isStartDateToday)} />
                    <Text style={[styles.metaText, isStartDatePast && styles.metaTextPast, isStartDateToday && styles.metaTextToday, !isStartDatePast && !isStartDateToday && styles.metaTextFuture]}>
                      {formatDateToDayMonth(dates.start)}
                    </Text>
                  </>)
                }
                {
                  dates.due && (<>
                    <Ionicons name="calendar-outline" size={12} color={getIconColor(isDueDatePast, isDueDateToday)} />
                    <Text style={[styles.metaText, isDueDatePast && styles.metaTextPast, isDueDateToday && styles.metaTextToday, !isDueDatePast && !isDueDateToday && styles.metaTextFuture]}>
                      {formatDateToDayMonth(dates.due)}
                    </Text>
                  </>)
                }
              </View>
            )
          }

          {labelsDisplay && (
            <View style={styles.metaChip}>
              <Ionicons name="pricetag-outline" size={12} color={COLORS.RED_BLOOD} />
              <Text style={styles.metaTextSecondary}>
                {showProjectMeta && (
                  <>
                    {project.projectname}
                    <Text style={styles.separator}> | </Text>
                  </>
                )}
                {labelsDisplay}
              </Text>
            </View>
          )}

          {showProjectMeta && (
            <View style={styles.metaChip}>
              <Text style={{ color: project.projectIconColor, fontSize: FONT_SIZES.SMALL }}>#</Text>
              <Text style={styles.metaTextSecondary}>
                {project.projectname}
              </Text>
            </View>
          )}

          <View style={styles.metaChip}>
            <Ionicons name="ellipse-outline" size={12} color={COLORS.OFF_WHITE} />
            <Text style={styles.metaTextSecondary}>{status.replace('_', ' ')}</Text>
          </View>
        </View>
      </View>

      {
        assignee && (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(assignee.userName)}</Text>
          </View>
        )
      }
    </Pressable>
  );
};

export default Task;
