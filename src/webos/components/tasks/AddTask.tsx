import React from 'react';
import { Animated, Easing, Modal, Pressable, Text, View } from 'react-native';
import { postRequest } from '../../../api/request';
import {
  useAppStoreDispatch,
  useLabelsStore,
  useProjectsStore,
  useTasksStore,
  useUsersStore,
} from '../../../shared/context/AppStoreContext';
import { AddTaskProps } from '../../interfaces/tasks/add/add-task.interface';
import modalStyles from '../../styles/tasks/add/add-task-modal.styles';
import { toIsoDate } from '../../utils';
import { AppStoreActionType } from '../../../shared/context/actions/AppStoreActions';
import {
  CreateTaskResponse,
  PRIORITY,
  TASK_STATUS,
  TASK_TYPE,
  TaskLabel,
  Task,
} from '../../../shared/interfaces/tasks.interface';
import { AddTaskAttributesSectionHandle } from '../../interfaces/tasks/add/attributes/add-task-attributes.interface';
import { AddTaskProjectSectionHandle } from '../../interfaces/tasks/add/add-task-project.interface';
import { AddTaskReminderSectionHandle } from '../../interfaces/tasks/add/add-task-reminder.interface';
import { AddTaskTitleSectionHandle } from '../../interfaces/tasks/add/add-task-title.interface';
import AddTaskAttributesSection from './add/AddTaskAttributesSection';
import AddTaskProjectSection from './add/AddTaskProjectSection';
import AddTaskReminderSection from './add/AddTaskReminderSection';
import AddTaskTitleSection from './add/AddTaskTitleSection';

const AddTask: React.FC<AddTaskProps> = ({
  visible,
  onClose,
  onCancel,
  defaultPriority,
}) => {
  const collaborators = useUsersStore();
  const projects = useProjectsStore();
  const labels = useLabelsStore();
  const tasks = useTasksStore();
  const dispatch = useAppStoreDispatch();
  const [isTaskNameReady, setIsTaskNameReady] = React.useState(false);

  const scaleAnimation = React.useRef(new Animated.Value(0.94)).current;
  const opacityAnimation = React.useRef(new Animated.Value(0)).current;
  const titleSectionRef = React.useRef<AddTaskTitleSectionHandle>(null);
  const attributesSectionRef = React.useRef<AddTaskAttributesSectionHandle>(null);
  const projectSectionRef = React.useRef<AddTaskProjectSectionHandle>(null);
  const reminderSectionRef = React.useRef<AddTaskReminderSectionHandle>(null);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnimation, {
        toValue: visible ? 1 : 0.94,
        duration: 180,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnimation, {
        toValue: visible ? 1 : 0,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacityAnimation, scaleAnimation, visible]);

  const resetLocalState = React.useCallback(() => {
    titleSectionRef.current?.reset();
    attributesSectionRef.current?.reset();
    projectSectionRef.current?.reset();
    reminderSectionRef.current?.reset();
    setIsTaskNameReady(false);
  }, []);

  const handleCancel = React.useCallback(() => {
    resetLocalState();
    onCancel();
  }, [onCancel, resetLocalState]);

  const handleClose = React.useCallback(() => {
    handleCancel();
    onClose();
  }, [handleCancel, onClose]);

  const handleAdd = async () => {
    const titleSection = titleSectionRef.current;
    const attributesSection = attributesSectionRef.current;
    const projectSection = projectSectionRef.current;
    const reminderSection = reminderSectionRef.current;

    if (!titleSection || !attributesSection || !projectSection || !reminderSection) {
      return;
    }

    const taskName = titleSection.getTaskName();
    if (!taskName) {
      return;
    }

    const taskDesc = titleSection.getTaskDescription();
    const attributes = attributesSection.getValues();
    const selectedProject = projectSection.getProject();
    const reminders = reminderSection.getReminders();

    const nextTaskId = tasks.length > 0 ? Math.max(...tasks.map((task) => task.taskId)) + 1 : 1;
    const nowIsoDate = toIsoDate(new Date());
    const fallbackUser = collaborators[0] ?? { userId: -1, userName: 'Unknown' };
    const fallbackProject = projects[0] ?? {
      projectId: -1,
      projectname: 'Inbox',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    };

    const newTask: Task = {
      taskId: nextTaskId,
      taskName,
      taskDesc,
      priority: attributes.priority ?? PRIORITY.P3,
      assignee: attributes.assignee ?? null,
      reporter: attributes.reporter ?? fallbackUser,
      dates: {
        created: nowIsoDate,
        updated: nowIsoDate,
        start: attributes.dates.start,
        due: attributes.dates.due,
      },
      project: selectedProject ?? fallbackProject,
      labels: attributes.labels,
      comments: [],
      taskType: attributes.taskType ?? TASK_TYPE.TASK,
      status: attributes.status ?? TASK_STATUS.TODO,
      isRecurring: false,
      reminders,
    };

    // Ensure 'someday' label is added if neither start nor due dates are set
    ensureSomedayLabelForNewTask(newTask);

    await saveTask(newTask);
    resetLocalState();
    onClose();
  };

  const saveTask = async (newTask: Task) => {
    try {
      const createTaskResponse = await postRequest<CreateTaskResponse>('/tasks/create', newTask);
      if (createTaskResponse.success) {
        dispatch({ type: AppStoreActionType.ADD_TASK, payload: newTask });
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  /**
   * Ensures 'someday' label is added to new tasks without both start and due dates
   * Called during task creation if neither start date nor due date is provided
   */
  const ensureSomedayLabelForNewTask = React.useCallback((task: Task) => {
    const hasStartDate = !!task.dates.start;
    const hasDueDate = !!task.dates.due;

    // If both dates are empty, add 'someday' label
    if (!hasStartDate && !hasDueDate) {
      const somedayLabel: TaskLabel = labels.filter((label) => label.labelId === 0)[0];
      // Check if 'someday' label is not already in the labels array
      if (!task.labels.some((label) => label.labelId === 0)) {
        task.labels.push(somedayLabel);
      }
    }
  }, []);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <View style={modalStyles.modalOverlay}>
        <Pressable style={modalStyles.modalBackdrop} onPress={handleClose} />
        <Animated.View
          style={[
            modalStyles.modalCard,
            {
              opacity: opacityAnimation,
              transform: [{ scale: scaleAnimation }],
            },
          ]}
        >
          <AddTaskTitleSection
            ref={titleSectionRef}
            onTaskNameReadyChange={setIsTaskNameReady}
          />

          <AddTaskAttributesSection
            ref={attributesSectionRef}
            collaborators={collaborators}
            labels={labels}
            dispatchAddLabel={(label: TaskLabel) => dispatch({ type: AppStoreActionType.ADD_LABEL, payload: label })}
            defaultPriority={defaultPriority}
          />

          <AddTaskReminderSection ref={reminderSectionRef} />

          <View style={modalStyles.bottomRow}>
            <AddTaskProjectSection
              ref={projectSectionRef}
              projects={projects}
            />

            <View style={modalStyles.bottomActions}>
              <Pressable style={[modalStyles.actionButton, modalStyles.actionButtonMuted]} onPress={handleCancel}>
                <Text style={modalStyles.actionButtonMutedText}>Cancel</Text>
              </Pressable>
              <Pressable disabled={!isTaskNameReady} style={[modalStyles.actionButton, modalStyles.actionButtonPrimary, !isTaskNameReady && modalStyles.actionButtonPrimaryDisabled]} onPress={handleAdd}>
                <Text style={[modalStyles.actionButtonPrimaryText,  !isTaskNameReady && modalStyles.actionButtonPrimaryDisabledText]}>Add task</Text>
              </Pressable>
            </View>
          </View>

        </Animated.View>
      </View>
    </Modal>
  );
};

export default AddTask;
