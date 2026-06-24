import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  AddTaskAttributesSectionHandle,
  AddTaskAttributesSectionProps,
} from '../../../interfaces/tasks/add/attributes/add-task-attributes.interface';
import { AddTaskPriorityFieldHandle } from '../../../interfaces/tasks/add/attributes/add-task-priority-field.interface';
import { AddTaskStatusFieldHandle } from '../../../interfaces/tasks/add/attributes/add-task-status-field.interface';
import { AddTaskTypeFieldHandle } from '../../../interfaces/tasks/add/attributes/add-task-type-field.interface';
import { AddTaskLabelsFieldHandle } from '../../../interfaces/tasks/add/attributes/add-task-labels-field.interface';
import { AddTaskUserFieldHandle, AddTaskUserFieldKind } from '../../../interfaces/tasks/add/attributes/add-task-user-field.interface';
import { AddTaskDateFieldHandle, AddTaskDateFieldKind } from '../../../interfaces/tasks/add/attributes/add-task-date-field.interface';
import attributeStyles from '../../../styles/tasks/add/attributes/add-task-attributes.styles';
import AddTaskDateField from './attributes/AddTaskDateField';
import AddTaskLabelsField from './attributes/AddTaskLabelsField';
import AddTaskPriorityField from './attributes/AddTaskPriorityField';
import AddTaskStatusField from './attributes/AddTaskStatusField';
import AddTaskTypeField from './attributes/AddTaskTypeField';
import AddTaskUserField from './attributes/AddTaskUserField';
import { TaskView } from '../../../interfaces/tasks/viewtask.interface';
import { TASK_STATUS } from '../../../../shared/interfaces/tasks.interface';

const AddTaskAttributesSection = React.forwardRef<AddTaskAttributesSectionHandle, AddTaskAttributesSectionProps>(
  ({ collaborators, labels, dispatchAddLabel, defaultPriority, viewType = TaskView.CREATE, defaultValues, onPanelOpen, onPanelClose, onDateChange }, ref) => {
    const labelsRef = React.useRef<AddTaskLabelsFieldHandle>(null);
    const priorityRef = React.useRef<AddTaskPriorityFieldHandle>(null);
    const statusRef = React.useRef<AddTaskStatusFieldHandle>(null);
    const startDateRef = React.useRef<AddTaskDateFieldHandle>(null);
    const assigneeRef = React.useRef<AddTaskUserFieldHandle>(null);
    const dueDateRef = React.useRef<AddTaskDateFieldHandle>(null);
    const taskTypeRef = React.useRef<AddTaskTypeFieldHandle>(null);
    const reporterRef = React.useRef<AddTaskUserFieldHandle>(null);

    const reset = React.useCallback(() => {
      labelsRef.current?.reset();
      priorityRef.current?.reset();
      statusRef.current?.reset();
      startDateRef.current?.reset();
      assigneeRef.current?.reset();
      dueDateRef.current?.reset();
      taskTypeRef.current?.reset();
      reporterRef.current?.reset();
    }, []);

    const closeAllPanels = React.useCallback(() => {
      onPanelClose?.();
    }, [onPanelClose]);

    React.useImperativeHandle(
      ref,
      () => ({
        getValues: () => ({
          priority: priorityRef.current?.getValue() ?? null,
          status: statusRef.current?.getValue() ?? TASK_STATUS.TODO,
          taskType: taskTypeRef.current?.getValue() ?? null,
          assignee: assigneeRef.current?.getValue() ?? null,
          reporter: reporterRef.current?.getValue() ?? null,
          labels: labelsRef.current?.getValue() ?? [],
          dates: {
            start: startDateRef.current?.getValue() ?? '',
            due: dueDateRef.current?.getValue() ?? '',
          },
        }),
        reset,
        closeAllPanels,
      }),
      [reset, closeAllPanels],
    );

    const content = (
      <>
          {viewType === TaskView.CREATE && (
            <AddTaskLabelsField
              ref={labelsRef}
              labels={labels}
              onCreateLabel={dispatchAddLabel}
              defaultValues={defaultValues?.labels ?? []}
              viewType={viewType}
            />
          )}

          {viewType === TaskView.CREATE && (
            <AddTaskPriorityField
              ref={priorityRef}
              defaultPriority={defaultPriority}
              viewType={viewType}
            />
          )}

          <AddTaskStatusField
            ref={statusRef}
            defaultValue={defaultValues?.status ?? TASK_STATUS.TODO}
            viewType={viewType}
          />

          <AddTaskDateField
            ref={startDateRef}
            kind={AddTaskDateFieldKind.StartDate}
            defaultValue={defaultValues?.dates?.start ?? ''}
            viewType={viewType}
            onChange={(newDate) => onDateChange?.('startDate', newDate)}
          />

          <AddTaskUserField
            ref={assigneeRef}
            kind={AddTaskUserFieldKind.Assignee}
            users={collaborators}
            defaultValue={defaultValues?.assignee ?? null}
            viewType={viewType}
          />

          <AddTaskDateField
            ref={dueDateRef}
            kind={AddTaskDateFieldKind.DueDate}
            defaultValue={defaultValues?.dates?.due ?? ''}
            viewType={viewType}
            onChange={(newDate) => onDateChange?.('dueDate', newDate)}
          />

          {viewType === TaskView.CREATE && (
            <AddTaskTypeField
              ref={taskTypeRef}
              defaultValue={defaultValues?.taskType ?? null}
              viewType={viewType}
            />
          )}

          {viewType === TaskView.CREATE && (
            <AddTaskUserField
              ref={reporterRef}
              kind={AddTaskUserFieldKind.Reporter}
              users={collaborators}
              defaultValue={defaultValues?.reporter ?? null}
              viewType={viewType}
            />
          )}

          {viewType === TaskView.EDIT && (
            <AddTaskPriorityField
              ref={priorityRef}
              defaultPriority={defaultPriority}
              viewType={viewType}
            />
          )}

          {viewType === TaskView.EDIT && (
            <AddTaskLabelsField
              ref={labelsRef}
              labels={labels}
              onCreateLabel={dispatchAddLabel}
              defaultValues={defaultValues?.labels ?? []}
              viewType={viewType}
            />
          )}

      </>
    );

    return (
      <View style={attributeStyles.chipsAnchor}>
        {viewType === TaskView.CREATE ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
            style={attributeStyles.createScroll}
            contentContainerStyle={attributeStyles.createScrollContent}
          >
            {content}
          </ScrollView>
        ) : (
          <View style={[attributeStyles.chipsRow, attributeStyles.chipsColumn]}>
            {content}
          </View>
        )}
      </View>
    );
  },
);

AddTaskAttributesSection.displayName = 'AddTaskAttributesSection';

export default AddTaskAttributesSection;
