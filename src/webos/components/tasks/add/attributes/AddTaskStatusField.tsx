import React from 'react';
import { View } from 'react-native';
import DropdownInput from '../../../../../shared/components/DropdownInput';
import { TASK_STATUS } from '../../../../../shared/interfaces/tasks.interface';
import { COLORS } from '../../../../../shared/styles/colors.styles';
import { AddTaskStatusFieldHandle, AddTaskStatusFieldProps } from '../../../../interfaces/tasks/add/attributes/add-task-status-field.interface';
import { TASK_STATUS_OPTIONS } from '../../../../interfaces/tasks/add/attributes/add-task-options.interface';
import AddTaskAttributeChip from './AddTaskAttributeChip';
import attributeStyles from '../../../../styles/tasks/add/attributes/add-task-attributes.styles';
import { TaskView } from '../../../../interfaces/tasks/viewtask.interface';
import { AddTaskAttributePanel } from '../../../../interfaces/tasks/add/attributes/add-task-attributes.interface';

const AddTaskStatusField = React.forwardRef<AddTaskStatusFieldHandle, AddTaskStatusFieldProps>(({ defaultValue = TASK_STATUS.TODO, viewType = TaskView.CREATE }, ref) => {
  const [value, setValue] = React.useState<TASK_STATUS>(defaultValue);
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);
  const fieldAnchorRef = React.useRef<View>(null);
  const [panelOffset, setPanelOffset] = React.useState({ left: 0, offset: 0 });
  const [panelPlacement, setPanelPlacement] = React.useState<'above' | 'below'>('below');

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  React.useImperativeHandle(ref, () => ({
    getValue: () => value,
    reset: () => {
      setValue(defaultValue);
      setIsPanelOpen(false);
    },
  }), [defaultValue, value]);

  const selectedText = TASK_STATUS_OPTIONS.find((option) => option.value === value)?.label ?? null;

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
        panel={AddTaskAttributePanel.Status}
        label="Status"
        iconName="ellipse-outline"
        iconColor={COLORS.OFF_WHITE}
        text={selectedText ?? 'Status'}
        isPlaceholder={!selectedText}
        viewType={viewType}
        onPress={togglePanel}
      />

      {isPanelOpen && (
        <View
          style={[
            attributeStyles.panelContainer,
            {
              left: panelOffset.left,
              minWidth: 220,
              ...(panelPlacement === 'above'
                ? { top: 'auto', bottom: panelOffset.offset }
                : { top: panelOffset.offset, bottom: 'auto' }),
            },
          ]}
        > 
          <DropdownInput
            options={TASK_STATUS_OPTIONS}
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue as TASK_STATUS);
              setIsPanelOpen(false);
            }}
            onRequestClose={() => setIsPanelOpen(false)}
          />
        </View>
      )}
    </View>
  );
});

AddTaskStatusField.displayName = 'AddTaskStatusField';

export default AddTaskStatusField;
