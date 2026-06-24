import React from 'react';
import { View } from 'react-native';
import DropdownInput from '../../../../../shared/components/DropdownInput';
import { TASK_TYPE } from '../../../../../shared/interfaces/tasks.interface';
import { COLORS } from '../../../../../shared/styles/colors.styles';
import { AddTaskTypeFieldHandle, AddTaskTypeFieldProps } from '../../../../interfaces/tasks/add/attributes/add-task-type-field.interface';
import { TASK_TYPE_OPTIONS } from '../../../../interfaces/tasks/add/attributes/add-task-options.interface';
import AddTaskAttributeChip from './AddTaskAttributeChip';
import attributeStyles from '../../../../styles/tasks/add/attributes/add-task-attributes.styles';
import { TaskView } from '../../../../interfaces/tasks/viewtask.interface';
import { AddTaskAttributePanel } from '../../../../interfaces/tasks/add/attributes/add-task-attributes.interface';

const AddTaskTypeField = React.forwardRef<AddTaskTypeFieldHandle, AddTaskTypeFieldProps>(({ defaultValue = null, viewType = TaskView.CREATE }, ref) => {
  const [value, setValue] = React.useState<TASK_TYPE | null>(defaultValue ?? null);
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);
  const fieldAnchorRef = React.useRef<View>(null);
  const [panelOffset, setPanelOffset] = React.useState({ left: 0, offset: 0 });
  const [panelPlacement, setPanelPlacement] = React.useState<'above' | 'below'>('below');

  React.useEffect(() => {
    setValue(defaultValue ?? null);
  }, [defaultValue]);

  React.useImperativeHandle(ref, () => ({
    getValue: () => value,
    reset: () => {
      setValue(defaultValue ?? null);
      setIsPanelOpen(false);
    },
  }), [defaultValue, value]);

  const selectedText = value !== null
    ? TASK_TYPE_OPTIONS.find((option) => option.value === value)?.label ?? null
    : null;

  const togglePanel = () => {
    if (isPanelOpen) {
      setIsPanelOpen(false);
      return;
    }

    fieldAnchorRef.current?.measureInWindow((_x, y, _width, height) => {
      const gap = 10;
      const estimatedPanelHeight = 240;
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
      const spaceBelow = viewportHeight - (y + height);
      const spaceAbove = y;
      const shouldOpenAbove = viewType === TaskView.EDIT && spaceBelow < estimatedPanelHeight && spaceAbove > estimatedPanelHeight;

      setPanelPlacement(shouldOpenAbove ? 'above' : 'below');
      setPanelOffset({ left: 0, offset: height + gap });
      setIsPanelOpen(true);
    });
  };

  return (
    <View ref={fieldAnchorRef} style={{ position: 'relative', zIndex: isPanelOpen ? 120 : 1 }}>
      <AddTaskAttributeChip
        panel={AddTaskAttributePanel.TaskType}
        label="Task type"
        iconName="layers-outline"
        iconColor={COLORS.OFF_WHITE}
        text={selectedText ?? 'Task type'}
        isPlaceholder={!selectedText}
        viewType={viewType}
        onPress={togglePanel}
        onClear={selectedText ? () => setValue(null) : undefined}
      />

      {isPanelOpen && (
        <View
          style={[
            attributeStyles.panelContainer,
            {
              left: panelOffset.left,
              minWidth: 200,
              ...(panelPlacement === 'above'
                ? { top: 'auto', bottom: panelOffset.offset }
                : { top: panelOffset.offset, bottom: 'auto' }),
            },
          ]}
        > 
          <DropdownInput
            options={TASK_TYPE_OPTIONS}
            value={(value ?? '') as string | number}
            onChange={(nextValue) => {
              setValue(nextValue as TASK_TYPE);
              setIsPanelOpen(false);
            }}
            onRequestClose={() => setIsPanelOpen(false)}
          />
        </View>
      )}
    </View>
  );
});

AddTaskTypeField.displayName = 'AddTaskTypeField';

export default AddTaskTypeField;
