import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import SearchDropdownInput from '../../../../../shared/components/SearchDropdownInput';
import { DropdownOption } from '../../../../../shared/components/dropdowninput.interface';
import { TaskUser } from '../../../../../shared/interfaces/tasks.interface';
import { COLORS } from '../../../../../shared/styles/colors.styles';
import { AddTaskUserFieldHandle, AddTaskUserFieldKind, AddTaskUserFieldProps } from '../../../../interfaces/tasks/add/attributes/add-task-user-field.interface';
import AddTaskAttributeChip from './AddTaskAttributeChip';
import attributeStyles from '../../../../styles/tasks/add/attributes/add-task-attributes.styles';
import userFieldStyles, { SEARCH_ICON_COLOR } from '../../../../styles/tasks/add/add-task-user.style';
import { TaskView } from '../../../../interfaces/tasks/viewtask.interface';
import { AddTaskAttributePanel } from '../../../../interfaces/tasks/add/attributes/add-task-attributes.interface';
import { FONT_SIZES } from '../../../../../shared/styles/spacing.styles';

const AddTaskUserField = React.forwardRef<AddTaskUserFieldHandle, AddTaskUserFieldProps>(({
  kind,
  users,
  defaultValue = null,
  viewType = TaskView.CREATE,
}, ref) => {
  const [selectedUser, setSelectedUser] = React.useState<TaskUser | null>(defaultValue);
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);
  const fieldAnchorRef = React.useRef<View>(null);
  const [panelOffset, setPanelOffset] = React.useState({ left: 0, offset: 0 });
  const [panelPlacement, setPanelPlacement] = React.useState<'above' | 'below'>('below');
  const [isHovered, setIsHovered] = React.useState(false);

  const userOptions = React.useMemo<DropdownOption[]>(
    () => users.map((user) => ({ label: user.userName, value: user.userId })),
    [users],
  );

  React.useEffect(() => {
    setSelectedUser(defaultValue);
  }, [defaultValue]);

  React.useImperativeHandle(ref, () => ({
    getValue: () => selectedUser,
    reset: () => {
      setSelectedUser(defaultValue);
      setIsPanelOpen(false);
    },
  }), [defaultValue, selectedUser]);

  const label = kind === AddTaskUserFieldKind.Assignee ? 'Assignee' : 'Reporter';
  const iconName = kind === AddTaskUserFieldKind.Assignee ? 'person-outline' : 'people-outline';

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

  const initials = selectedUser
    ? selectedUser.userName
      .split(' ')
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('')
    : '';

  const isEditView = viewType === TaskView.EDIT;

  if (isEditView) {
    return (
      <View ref={fieldAnchorRef} style={[userFieldStyles.fieldAnchor, isPanelOpen && userFieldStyles.fieldAnchorOpen]}>
        <View style={userFieldStyles.editViewPressable}>
          <View style={userFieldStyles.headerRow}>
            <Text style={userFieldStyles.labelText}>{label}</Text>
            {!selectedUser && <Ionicons name="add" size={FONT_SIZES.LARGE} color={COLORS.OFF_WHITE} />}
          </View>

          {selectedUser && (
            <Pressable 
              style={[userFieldStyles.selectedUserRow, isHovered && userFieldStyles.selectedUserRowHovered]} 
              onPress={togglePanel}
              onHoverIn={() => setIsHovered(true)}
              onHoverOut={() => setIsHovered(false)}>
              <View style={userFieldStyles.avatarView}>
                <Text style={userFieldStyles.initialsText}>{initials}</Text>
              </View>
              <Text style={userFieldStyles.usernameText}>{selectedUser.userName}</Text>
            </Pressable>
          )}
        </View>

        {isPanelOpen && (
          <View
            style={[
              attributeStyles.panelContainer,
              userFieldStyles.panelBase,
              {
                left: panelOffset.left,
                ...(panelPlacement === 'above'
                  ? { top: 'auto', bottom: panelOffset.offset }
                  : { top: panelOffset.offset, bottom: 'auto' }),
              },
            ]}
          > 
            <SearchDropdownInput
              options={userOptions}
              value={selectedUser?.userId ?? null}
              onConfirm={(selected) => {
                const userId = Array.isArray(selected) ? selected[0] : selected;
                setSelectedUser(users.find((user) => user.userId === userId) ?? null);
                setIsPanelOpen(false);
              }}
              onRequestClose={() => setIsPanelOpen(false)}
              placeholderText={kind === AddTaskUserFieldKind.Assignee ? 'Search assignee' : 'Search reporter'}
              isMultiSelect={false}
              iconName="person-outline"
              iconColor={SEARCH_ICON_COLOR}
            />
          </View>
        )}
      </View>
    );
  }

  return (
    <View ref={fieldAnchorRef} style={[userFieldStyles.fieldAnchor, isPanelOpen && userFieldStyles.fieldAnchorOpen]}>
      <AddTaskAttributeChip
        panel={kind === AddTaskUserFieldKind.Assignee ? AddTaskAttributePanel.Assignee : AddTaskAttributePanel.Reporter}
        label={kind === AddTaskUserFieldKind.Assignee ? 'Assignee' : 'Reporter'}
        iconName={iconName}
        iconColor={COLORS.OFF_WHITE}
        text={selectedUser?.userName ?? label}
        isPlaceholder={!selectedUser}
        viewType={viewType}
        onPress={togglePanel}
        onClear={selectedUser ? () => setSelectedUser(null) : undefined}
      />

      {isPanelOpen && (
        <View
          style={[
            attributeStyles.panelContainer,
            userFieldStyles.panelBase,
            {
              left: panelOffset.left,
              ...(panelPlacement === 'above'
                ? { top: 'auto', bottom: panelOffset.offset }
                : { top: panelOffset.offset, bottom: 'auto' }),
            },
          ]}
        > 
          <SearchDropdownInput
            options={userOptions}
            value={selectedUser?.userId ?? null}
            onConfirm={(selected) => {
              const userId = Array.isArray(selected) ? selected[0] : selected;
              setSelectedUser(users.find((user) => user.userId === userId) ?? null);
              setIsPanelOpen(false);
            }}
            onRequestClose={() => setIsPanelOpen(false)}
            placeholderText={kind === AddTaskUserFieldKind.Assignee ? 'Search assignee' : 'Search reporter'}
            isMultiSelect={false}
            iconName="person-outline"
            iconColor={SEARCH_ICON_COLOR}
          />
        </View>
      )}
    </View>
  );
});

AddTaskUserField.displayName = 'AddTaskUserField';

export default AddTaskUserField;
