import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';
import { useAppStoreDispatch, useLabelsStore, useProjectsStore, useUsersStore } from '../../../shared/context/AppStoreContext';
import { TaskLabel } from '../../../shared/interfaces/tasks.interface';
import { COLORS } from '../../../shared/styles/colors.styles';
import { AppStoreActionType } from '../../../shared/context/actions/AppStoreActions';
import { AddTaskAttributesSectionHandle } from '../../interfaces/tasks/add/attributes/add-task-attributes.interface';
import { AddTaskProjectSectionHandle } from '../../interfaces/tasks/add/add-task-project.interface';
import { AddTaskReminderSectionHandle } from '../../interfaces/tasks/add/add-task-reminder.interface';
import { AddTaskTitleSectionHandle } from '../../interfaces/tasks/add/add-task-title.interface';
import { TaskView, ViewTaskProps } from '../../interfaces/tasks/viewtask.interface';
import styles from '../../styles/tasks/viewtask.style';
import AddTaskAttributesSection from './add/AddTaskAttributesSection';
import AddTaskProjectSection from './add/AddTaskProjectSection';
import AddTaskReminderSection from './add/AddTaskReminderSection';
import AddTaskTitleSection from './add/AddTaskTitleSection';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { FONT_SIZES } from '../../../shared/styles/spacing.styles';

const ViewTask: React.FC<ViewTaskProps> = ({ visible, task, onClose }) => {
  const collaborators = useUsersStore();
  const projects = useProjectsStore();
  const labels = useLabelsStore();
  const dispatch = useAppStoreDispatch();

  const titleSectionRef = React.useRef<AddTaskTitleSectionHandle>(null);
  const attributesSectionRef = React.useRef<AddTaskAttributesSectionHandle>(null);
  const projectSectionRef = React.useRef<AddTaskProjectSectionHandle>(null);
  const reminderSectionRef = React.useRef<AddTaskReminderSectionHandle>(null);

  const [goal, setGoal] = React.useState<string>('');
  const [location, setLocation] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [isGoalEditing, setIsGoalEditing] = React.useState(false);
  const [isLocationEditing, setIsLocationEditing] = React.useState(false);
  const [openFieldPanel, setOpenFieldPanel] = React.useState<string | null>(null);
  const [taskLabels, setTaskLabels] = React.useState<TaskLabel[]>(task?.labels ?? []);

  React.useEffect(() => {
    if (!task) {
      setGoal('');
      setLocation('');
      setComment('');
      setIsGoalEditing(false);
      setIsLocationEditing(false);
      setOpenFieldPanel(null);
      setTaskLabels([]);
      return;
    }

    setGoal('');
    setLocation('');
    setComment('');
    setIsGoalEditing(false);
    setIsLocationEditing(false);
    setOpenFieldPanel(null);
    setTaskLabels(task.labels);
  }, [task]);

  const handleFieldPanelOpen = React.useCallback((fieldName: string) => {
    // Close previously open field and open new one
    setOpenFieldPanel(fieldName);
    // Close the other section's panels
    if (fieldName === 'project') {
      attributesSectionRef.current?.closeAllPanels();
    } else {
      projectSectionRef.current?.closePanel();
    }
  }, []);

  const handleFieldPanelClose = React.useCallback(() => {
    setOpenFieldPanel(null);
  }, []);

  const isFieldOpen = (fieldName: string) => openFieldPanel === fieldName;

  const handleCreateLabel = React.useCallback((label: TaskLabel) => {
    dispatch({ type: AppStoreActionType.ADD_LABEL, payload: label });
  }, [dispatch]);

  /**
   * Gets the 'someday' label (labelId: 0) from the current task labels
   */
  const getSomedayLabelFromTask = React.useCallback((): TaskLabel | undefined => {
    return taskLabels.find((label) => label.labelId === 0);
  }, [taskLabels]);

  /**
   * Removes the 'someday' label from task labels (optimistic update)
   * Called when both start and due dates are set
   */
  const removeSomedayLabel = React.useCallback(() => {
    const updatedLabels = taskLabels.filter((label) => label.labelId !== 0);
    setTaskLabels(updatedLabels);
  }, [taskLabels]);

  /**
   * Adds the 'someday' label to task labels if not already present (optimistic update)
   * Called when either start or due date is cleared
   */
  const addSomedayLabel = React.useCallback(() => {
    if (!getSomedayLabelFromTask()) {
      const somedayLabel: TaskLabel = { labelId: 0, labelName: 'someday', isDefault: true };
      setTaskLabels([...taskLabels, somedayLabel]);
    }
  }, [taskLabels, getSomedayLabelFromTask]);

  /**
   * Handles date field changes
   * When both start and due dates are set, removes 'someday' label
   * When either date is cleared, adds 'someday' label
   */
  const handleDateChange = React.useCallback((fieldKind: 'startDate' | 'dueDate', newDate: string) => {
    // Get the current values from the attributes section
    const currentValues = attributesSectionRef.current?.getValues();
    if (!currentValues) return;

    const startDate = fieldKind === 'startDate' ? newDate : currentValues.dates.start;
    const dueDate = fieldKind === 'dueDate' ? newDate : currentValues.dates.due;

    // If both dates are now set, remove 'someday' label
    if (startDate && dueDate) {
      removeSomedayLabel();
    } else if (!startDate || !dueDate) {
      // If either date is cleared, add 'someday' label
      addSomedayLabel();
    }
  }, [removeSomedayLabel, addSomedayLabel]);

  if (!task) {
    return null;
  }

  const getProjectIconColor = (): string => {
    return projects.filter((project) => project.projectId === task.project.projectId)[0]?.projectIconColor ?? COLORS.OFF_WHITE;
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Pressable style={styles.modalBackdrop} onPress={onClose} />
        <View style={styles.modalCard}>
          <View style={styles.modalCardHeader}>
            <Text style={styles.titleMeta}>
              <Text style={{ color: getProjectIconColor() }}># </Text>
              {task.project.projectname}
            </Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" size={FONT_SIZES.LARGE} color={COLORS.OFF_WHITE} />
            </Pressable>
          </View>
          <View style={styles.modalCardContent}>
            <View style={styles.leftPanel}>
              <AddTaskTitleSection
                ref={titleSectionRef}
                viewType={TaskView.EDIT}
                defaultTaskName={task.taskName}
                defaultTaskDescription={task.taskDesc ?? ''}
              />

              <View style={styles.sectionDivider} />

              <Pressable style={styles.addSubTaskButton}>
                <Ionicons name="add" size={16} color={COLORS.OFF_WHITE} />
                <Text style={styles.addSubTaskText}>Add sub-task</Text>
              </Pressable>

              <View style={styles.commentRow}>
                <View style={styles.commentAvatar}>
                  <Text style={styles.commentAvatarText}>A</Text>
                </View>
                <TextInput
                  style={styles.commentInput}
                  value={comment}
                  onChangeText={setComment}
                  placeholder="Comment"
                  placeholderTextColor="#8f95a3"
                />
              </View>
            </View>

            <View style={styles.sidebar}>
              <Pressable style={[styles.sidebarInputRow, styles.sidebarGoalRow]}>
                <View style={styles.sidebarInputHeader}>
                  <Text style={styles.sidebarInputHeaderText}>Goal</Text>
                  {!goal && (
                    <Pressable
                      onPress={(event) => {
                        event.stopPropagation();
                        setIsGoalEditing(true);
                      }}
                    >
                      <Ionicons name="add" size={24} color={COLORS.OFF_WHITE} />
                    </Pressable>
                  )}
                </View>
                {(!!goal || isGoalEditing) && (
                  <TextInput
                    style={styles.sidebarInputText}
                    value={goal}
                    onChangeText={setGoal}
                    placeholder="Add goal"
                    placeholderTextColor="#8f95a3"
                    onBlur={() => setIsGoalEditing(goal.trim().length > 0)}
                    autoFocus={isGoalEditing}
                  />
                )}
              </Pressable>

              <AddTaskProjectSection
                ref={projectSectionRef}
                projects={projects}
                defaultProject={task.project}
                viewType={TaskView.EDIT}
                onPanelOpen={() => handleFieldPanelOpen('project')}
                onPanelClose={handleFieldPanelClose}
              />

              <AddTaskAttributesSection
                ref={attributesSectionRef}
                collaborators={collaborators}
                labels={labels}
                dispatchAddLabel={handleCreateLabel}
                defaultPriority={task.priority}
                viewType={TaskView.EDIT}
                onPanelOpen={() => handleFieldPanelOpen('attributes')}
                onPanelClose={handleFieldPanelClose}
                onDateChange={handleDateChange}
                defaultValues={{
                  priority: task.priority,
                  status: task.status,
                  assignee: task.assignee,
                  labels: taskLabels,
                  dates: {
                    start: task.dates.start,
                    due: task.dates.due,
                  },
                }}
              />

              {/* <AddTaskReminderSection
                ref={reminderSectionRef}
                defaultReminders={task.reminders}
                viewType={TaskView.EDIT}
              /> */}

              {/* <Pressable style={styles.sidebarInputRow}>
                <View style={styles.sidebarInputHeader}>
                  <Text style={styles.sidebarInputHeaderText}>Location</Text>
                  {!location && (
                    <Pressable
                      onPress={(event) => {
                        event.stopPropagation();
                        setIsLocationEditing(true);
                      }}
                    >
                      <Ionicons name="add" size={24} color={COLORS.OFF_WHITE} />
                    </Pressable>
                  )}
                </View>
                {(!!location || isLocationEditing) && (
                  <TextInput
                    style={styles.sidebarInputText}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Add location"
                    placeholderTextColor="#8f95a3"
                    onBlur={() => setIsLocationEditing(location.trim().length > 0)}
                    autoFocus={isLocationEditing}
                  />
                )}
              </Pressable> */}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ViewTask;
