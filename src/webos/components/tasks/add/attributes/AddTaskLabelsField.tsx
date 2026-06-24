import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { postRequest } from '../../../../../api/request';
import SearchDropdownInput from '../../../../../shared/components/SearchDropdownInput';
import { DropdownOption } from '../../../../../shared/components/dropdowninput.interface';
import { TaskLabel } from '../../../../../shared/interfaces/tasks.interface';
import { COLORS } from '../../../../../shared/styles/colors.styles';
import { FONT_SIZES, FONT_WEIGHT, SPACING } from '../../../../../shared/styles/spacing.styles';
import { AddTaskLabelsFieldHandle, AddTaskLabelsFieldProps } from '../../../../interfaces/tasks/add/attributes/add-task-labels-field.interface';
import AddTaskAttributeChip from './AddTaskAttributeChip';
import attributeStyles from '../../../../styles/tasks/add/attributes/add-task-attributes.styles';
import { TaskView } from '../../../../interfaces/tasks/viewtask.interface';
import { AddTaskAttributePanel } from '../../../../interfaces/tasks/add/attributes/add-task-attributes.interface';

const AddTaskLabelsField = React.forwardRef<AddTaskLabelsFieldHandle, AddTaskLabelsFieldProps>(({ labels, onCreateLabel, defaultValues = [], viewType = TaskView.CREATE }, ref) => {
  const [selectedLabels, setSelectedLabels] = React.useState<TaskLabel[]>(defaultValues);
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);
  const [isLabelsHovered, setIsLabelsHovered] = React.useState(false);
  const fieldAnchorRef = React.useRef<View>(null);
  const [panelOffset, setPanelOffset] = React.useState({ left: 0, offset: 0 });
  const [panelPlacement, setPanelPlacement] = React.useState<'above' | 'below'>('below');

  const labelOptions = React.useMemo<DropdownOption[]>(
    () => labels.map((label) => ({ label: label.labelName, value: label.labelName })),
    [labels],
  );

  React.useEffect(() => {
    setSelectedLabels(defaultValues);
  }, [defaultValues]);

  React.useImperativeHandle(ref, () => ({
    getValue: () => selectedLabels,
    reset: () => {
      setSelectedLabels(defaultValues);
      setIsPanelOpen(false);
    },
  }), [defaultValues, selectedLabels]);

  const selectedText = selectedLabels.length > 0 ? selectedLabels[0].labelName : null;
  const selectedValues = selectedLabels.map((label) => label.labelName);

  const togglePanel = () => {
    if (isPanelOpen) {
      setIsPanelOpen(false);
      return;
    }

    fieldAnchorRef.current?.measureInWindow((_x, y, _width, height) => {
      const gap = 10;
      const estimatedPanelHeight = 300;
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
      const spaceBelow = viewportHeight - (y + height);
      const spaceAbove = y;
      const shouldOpenAbove = viewType === TaskView.EDIT && spaceBelow < estimatedPanelHeight && spaceAbove > estimatedPanelHeight;

      setPanelPlacement(shouldOpenAbove ? 'above' : 'below');
      setPanelOffset({ left: 0, offset: height + gap });
      setIsPanelOpen(true);
    });
  };

  if (viewType === TaskView.EDIT) {
    return (
      <View ref={fieldAnchorRef} style={{ position: 'relative', zIndex: isPanelOpen ? 120 : 1 }}>
        <Pressable
          onPress={togglePanel}
          onHoverIn={() => setIsLabelsHovered(true)}
          onHoverOut={() => setIsLabelsHovered(false)}
          style={{
            paddingVertical: SPACING.MEDIUM,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.GREY_DARK,
            backgroundColor: (isLabelsHovered || isPanelOpen) ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: COLORS.GREY_LIGHT, fontSize: FONT_SIZES.EXTRA_SMALL, fontWeight: FONT_WEIGHT.MEDIUM }}>Labels</Text>
            {selectedLabels.length === 0 && <Ionicons name="add" size={24} color={COLORS.OFF_WHITE} />}
          </View>

          {selectedLabels.length > 0 && (
            <View style={{ marginTop: SPACING.SMALL, flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.SMALL }}>
              {selectedLabels.map((label) => (
                <Pressable
                  key={label.labelId}
                  onPress={(event) => {
                    event.stopPropagation();
                    setSelectedLabels((prev) => prev.filter((current) => current.labelId !== label.labelId));
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: SPACING.EXTRA_SMALL,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: SPACING.SMALL,
                    paddingHorizontal: SPACING.SMALL,
                    paddingVertical: SPACING.EXTRA_SMALL,
                  }}
                >
                  <Text style={{ color: COLORS.WHITE, fontSize: FONT_SIZES.SMALL }}>{label.labelName}</Text>
                  <Ionicons name="close-outline" size={14} color={COLORS.OFF_WHITE} />
                </Pressable>
              ))}
            </View>
          )}
        </Pressable>

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
            <SearchDropdownInput
              options={labelOptions}
              value={selectedValues as string | string[] | null}
              onConfirm={(selected) => {
                const selectedNames = Array.isArray(selected) ? selected.map(String) : [String(selected)];
                const nextLabels = selectedNames
                  .map((labelName) => labels.find((label) => label.labelName === labelName) ?? null)
                  .filter((label): label is TaskLabel => label !== null);
                setSelectedLabels(nextLabels);
                setIsPanelOpen(false);
              }}
              onRequestClose={() => setIsPanelOpen(false)}
              onRequestCreate={async (text: string) => {
                const created = await postRequest<TaskLabel>('/create/label', { labelName: text });
                onCreateLabel(created);
                setSelectedLabels((prev) => [...prev, created]);
              }}
              placeholderText="Search labels"
              isMultiSelect={true}
              iconName="pricetag-outline"
              iconColor="#e4e4e7"
            />
          </View>
        )}
      </View>
    );
  }

  return (
    <View ref={fieldAnchorRef} style={{ position: 'relative', zIndex: isPanelOpen ? 120 : 1 }}>
      <AddTaskAttributeChip
        panel={AddTaskAttributePanel.Labels}
        label="Labels"
        iconName="pricetag-outline"
        iconColor={COLORS.OFF_WHITE}
        text={selectedText ?? 'Labels'}
        isPlaceholder={!selectedText}
        viewType={viewType}
        onPress={togglePanel}
        onClear={selectedText ? () => setSelectedLabels([]) : undefined}
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
          <SearchDropdownInput
            options={labelOptions}
            value={selectedValues as string | string[] | null}
            onConfirm={(selected) => {
              const selectedNames = Array.isArray(selected) ? selected.map(String) : [String(selected)];
              const nextLabels = selectedNames
                .map((labelName) => labels.find((label) => label.labelName === labelName) ?? null)
                .filter((label): label is TaskLabel => label !== null);
              setSelectedLabels(nextLabels);
              setIsPanelOpen(false);
            }}
            onRequestClose={() => setIsPanelOpen(false)}
            onRequestCreate={async (text: string) => {
              const created = await postRequest<TaskLabel>('/create/label', { labelName: text });
              onCreateLabel(created);
              setSelectedLabels((prev) => [...prev, created]);
            }}
            placeholderText="Search labels"
            isMultiSelect={true}
            iconName="pricetag-outline"
            iconColor="#e4e4e7"
          />
        </View>
      )}
    </View>
  );
});

AddTaskLabelsField.displayName = 'AddTaskLabelsField';

export default AddTaskLabelsField;
