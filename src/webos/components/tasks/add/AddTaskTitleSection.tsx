import React from 'react';
import { TextInput } from 'react-native';
import { COLORS } from '../../../../shared/styles/colors.styles';
import { AddTaskTitleSectionHandle, AddTaskTitleSectionProps } from '../../../interfaces/tasks/add/add-task-title.interface';
import { TaskView } from '../../../interfaces/tasks/viewtask.interface';
import styles from '../../../styles/tasks/add/add-task-title.styles';

const MIN_DESCRIPTION_INPUT_HEIGHT = 24;
const MAX_DESCRIPTION_INPUT_HEIGHT = 200;

const AddTaskTitleSection = React.forwardRef<AddTaskTitleSectionHandle, AddTaskTitleSectionProps>(({ onTaskNameReadyChange, defaultTaskName = '', defaultTaskDescription = '', viewType = TaskView.CREATE }, ref) => {
  const [taskName, setTaskName] = React.useState<string>(defaultTaskName);
  const [taskDesc, setTaskDesc] = React.useState<string>(defaultTaskDescription);
  const [descriptionInputHeight, setDescriptionInputHeight] = React.useState<number>(MIN_DESCRIPTION_INPUT_HEIGHT);

  React.useEffect(() => {
    setTaskName(defaultTaskName);
  }, [defaultTaskName]);

  React.useEffect(() => {
    setTaskDesc(defaultTaskDescription);
  }, [defaultTaskDescription]);

  React.useEffect(() => {
    onTaskNameReadyChange?.(taskName.trim().length > 0);
  }, [onTaskNameReadyChange, taskName]);

  React.useImperativeHandle(ref, () => ({
    getTaskName: () => taskName.trim(),
    getTaskDescription: () => taskDesc,
    reset: () => {
      setTaskName(defaultTaskName);
      setTaskDesc(defaultTaskDescription);
      setDescriptionInputHeight(MIN_DESCRIPTION_INPUT_HEIGHT);
    },
  }), [defaultTaskDescription, defaultTaskName, taskDesc, taskName]);

  const isEditView = viewType === TaskView.EDIT;

  return (
    <>
      <TextInput
        style={[styles.titleInput, isEditView ? styles.titleInputEdit : null]}
        value={taskName}
        onChangeText={setTaskName}
        placeholder={isEditView ? 'Task title' : 'Task name'}
        placeholderTextColor={COLORS.OFF_WHITE}
      />

      <TextInput
        multiline
        style={[styles.descriptionInput, isEditView ? styles.descriptionInputEdit : null, { height: descriptionInputHeight }]}
        value={taskDesc}
        onChangeText={(nextTaskDesc) => {
          setTaskDesc(nextTaskDesc);
          if (!nextTaskDesc) {
            setDescriptionInputHeight(MIN_DESCRIPTION_INPUT_HEIGHT);
          }
        }}
        onContentSizeChange={(event) => {
          const nextHeight = Math.max(
            MIN_DESCRIPTION_INPUT_HEIGHT,
            Math.min(event.nativeEvent.contentSize.height, MAX_DESCRIPTION_INPUT_HEIGHT),
          );
          setDescriptionInputHeight(nextHeight);
        }}
        placeholder="Description"
        placeholderTextColor={COLORS.OFF_WHITE}
        scrollEnabled={descriptionInputHeight >= MAX_DESCRIPTION_INPUT_HEIGHT}
        textAlignVertical="top"
      />
    </>
  );
});

AddTaskTitleSection.displayName = 'AddTaskTitleSection';

export default AddTaskTitleSection;
