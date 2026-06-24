import React from 'react';
import { View } from 'react-native';
import DropdownInput from '../../../../../shared/components/DropdownInput';
import { COLORS } from '../../../../../shared/styles/colors.styles';
import { AddTaskPriorityFieldHandle, AddTaskPriorityFieldProps } from '../../../../interfaces/tasks/add/attributes/add-task-priority-field.interface';
import { PRIORITY_OPTIONS } from '../../../../interfaces/tasks/add/attributes/add-task-options.interface';
import AddTaskAttributeChip from './AddTaskAttributeChip';
import { FONT_SIZES } from '../../../../../shared/styles/spacing.styles';
import attributeStyles from '../../../../styles/tasks/add/attributes/add-task-attributes.styles';
import { PRIORITY } from '../../../../../shared/interfaces/tasks.interface';
import { TaskView } from '../../../../interfaces/tasks/viewtask.interface';
import { AddTaskAttributePanel } from '../../../../interfaces/tasks/add/attributes/add-task-attributes.interface';

const AddTaskPriorityField = React.forwardRef<AddTaskPriorityFieldHandle, AddTaskPriorityFieldProps>(({
  defaultPriority,
  viewType = TaskView.CREATE,
}, ref) => {
  const [value, setValue] = React.useState<PRIORITY | null>(defaultPriority ?? null);
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);
  const fieldAnchorRef = React.useRef<View>(null);
  const [panelOffset, setPanelOffset] = React.useState({ left: 0, offset: 0 });
  const [panelPlacement, setPanelPlacement] = React.useState<'above' | 'below'>('below');

  React.useEffect(() => {
    setValue(defaultPriority ?? null);
  }, [defaultPriority]);

  React.useImperativeHandle(ref, () => ({
    getValue: () => value,
    reset: () => {
      setValue(defaultPriority ?? null);
      setIsPanelOpen(false);
    },
  }), [defaultPriority, value]);

  const selectedText = value !== null
    ? PRIORITY_OPTIONS.find((option) => option.value === value)?.shortfallName ?? null
    : null;

  const selectedColor = selectedText
    ? PRIORITY_OPTIONS.find((option) => option.value === value)?.iconColor ?? COLORS.OFF_WHITE
    : COLORS.OFF_WHITE;

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
        panel={AddTaskAttributePanel.Priority}
        label="Priority"
        iconName="flag-outline"
        iconColor={selectedColor}
        iconSize={FONT_SIZES.SMALL}
        text={selectedText ?? 'Priority'}
        isPlaceholder={!selectedText}
        viewType={viewType}
        onPress={togglePanel}
        onClear={viewType === TaskView.CREATE && selectedText ? () => setValue(null) : undefined}
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
            options={PRIORITY_OPTIONS}
            value={(value ?? '') as string | number}
            onChange={(nextValue) => {
              setValue(nextValue as PRIORITY);
              setIsPanelOpen(false);
            }}
            onRequestClose={() => setIsPanelOpen(false)}
          />
        </View>
      )}
    </View>
  );
});

AddTaskPriorityField.displayName = 'AddTaskPriorityField';

export default AddTaskPriorityField;
