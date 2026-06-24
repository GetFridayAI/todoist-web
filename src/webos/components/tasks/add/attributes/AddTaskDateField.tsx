import React from 'react';
import { View } from 'react-native';
import DatePicker from '../../../../../shared/components/DatePicker';
import { COLORS } from '../../../../../shared/styles/colors.styles';
import { AddTaskDateFieldHandle, AddTaskDateFieldKind, AddTaskDateFieldProps } from '../../../../interfaces/tasks/add/attributes/add-task-date-field.interface';
import { AddTaskAttributePanel } from '../../../../interfaces/tasks/add/attributes/add-task-attributes.interface';
import { formatDateToDayMonth, toIsoDate } from '../../../../utils';
import AddTaskAttributeChip from './AddTaskAttributeChip';
import attributeStyles from '../../../../styles/tasks/add/attributes/add-task-attributes.styles';
import { TaskView } from '../../../../interfaces/tasks/viewtask.interface';

const resolveDateColor = (isoDate: string): string => {
  const today = toIsoDate(new Date());
  if (isoDate < today) {
    return COLORS.RED_BLOOD;
  }
  if (isoDate === today) {
    return COLORS.GREEN;
  }
  return COLORS.OFF_WHITE;
};

const AddTaskDateField = React.forwardRef<AddTaskDateFieldHandle, AddTaskDateFieldProps>(({
  kind,
  defaultValue = '',
  viewType = TaskView.CREATE,
  onChange,
}, ref) => {
  const [dateValue, setDateValue] = React.useState<string>(defaultValue);
  const [isPanelOpen, setIsPanelOpen] = React.useState<boolean>(false);
  const fieldAnchorRef = React.useRef<View>(null);
  const [panelOffset, setPanelOffset] = React.useState({ left: 0, offset: 0 });
  const [panelPlacement, setPanelPlacement] = React.useState<'above' | 'below'>('below');

  React.useEffect(() => {
    setDateValue(defaultValue);
  }, [defaultValue]);

  React.useImperativeHandle(ref, () => ({
    getValue: () => dateValue,
    reset: () => {
      setDateValue(defaultValue);
      setIsPanelOpen(false);
    },
  }), [dateValue, defaultValue]);

  const isStartDate = kind === AddTaskDateFieldKind.StartDate;
  const placeholder = isStartDate ? 'Date' : 'Deadline';
  const iconName = isStartDate ? 'calendar-outline' : 'alarm-outline';
  const selectedText = dateValue ? formatDateToDayMonth(dateValue) : null;
  const dateColor = dateValue ? resolveDateColor(dateValue) : COLORS.OFF_WHITE;
  const panelType: AddTaskAttributePanel = kind === AddTaskDateFieldKind.StartDate ? AddTaskAttributePanel.StartDate : AddTaskAttributePanel.DueDate;

  const togglePanel = () => {
    if (isPanelOpen) {
      setIsPanelOpen(false);
      return;
    }

    fieldAnchorRef.current?.measureInWindow((x, y, width, height) => {
      const gap = 10;
      const estimatedPanelHeight = 360;
      const estimatedPanelWidth = 340;
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1400;
      const spaceBelow = viewportHeight - (y + height);
      const spaceAbove = y;
      const shouldOpenAbove = viewType === TaskView.EDIT && spaceBelow < estimatedPanelHeight && spaceAbove > estimatedPanelHeight;
      let nextLeftOffset = 0;

      if (viewType === TaskView.EDIT) {
        const margin = 12;
        const panelRight = x + estimatedPanelWidth;
        if (panelRight > viewportWidth - margin) {
          nextLeftOffset -= panelRight - (viewportWidth - margin);
        }

        const panelLeft = x + nextLeftOffset;
        if (panelLeft < margin) {
          nextLeftOffset += margin - panelLeft;
        }

        // Keep the panel visually anchored near the trigger chip.
        nextLeftOffset = Math.max(nextLeftOffset, -Math.max(0, estimatedPanelWidth - width));
      }

      setPanelPlacement(shouldOpenAbove ? 'above' : 'below');
      setPanelOffset({ left: nextLeftOffset, offset: height + gap });
      setIsPanelOpen(true);
    });
  };

  return (
    <View ref={fieldAnchorRef} style={{ position: 'relative', zIndex: isPanelOpen ? 120 : 1 }}>
      <AddTaskAttributeChip
        panel={panelType}
        label={isStartDate ? 'Date' : 'Deadline'}
        iconName={iconName}
        iconColor={dateColor}
        text={selectedText ?? placeholder}
        textColor={selectedText ? dateColor : undefined}
        isPlaceholder={!selectedText}
        viewType={viewType}
        showAddCtaWhenEmpty={!isStartDate}
        hideValueWhenPlaceholder={!isStartDate}
        onPress={togglePanel}
        onClear={viewType === TaskView.CREATE && selectedText ? () => {
          setDateValue('');
          onChange?.('');
        } : undefined}
      />

      {isPanelOpen && (
        <View
          style={[
            attributeStyles.panelContainer,
            {
              left: panelOffset.left,
              padding: 0,
              borderWidth: 0,
              ...(panelPlacement === 'above'
                ? { top: 'auto', bottom: panelOffset.offset }
                : { top: panelOffset.offset, bottom: 'auto' }),
            },
          ]}
        > 
          <DatePicker
            selectedDate={dateValue}
            onChange={(nextDate) => {
              setDateValue(nextDate);
              onChange?.(nextDate);
              setIsPanelOpen(false);
            }}
            onRequestClose={() => setIsPanelOpen(false)}
          />
        </View>
      )}
    </View>
  );
});

AddTaskDateField.displayName = 'AddTaskDateField';

export default AddTaskDateField;
