import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { COLORS } from '../../../../../shared/styles/colors.styles';
import attributeChipStyles from '../../../../styles/tasks/add/attributes/add-task-attribute-chip.styles';
import { AddTaskAttributeChipProps } from '../../../../interfaces/tasks/add/attributes/add-task-attribute-chip.interface';
import { TaskView } from '../../../../interfaces/tasks/viewtask.interface';
import { FONT_SIZES } from '../../../../../shared/styles/spacing.styles';
import { AddTaskAttributePanel } from '../../../../interfaces/tasks/add/attributes/add-task-attributes.interface';

const AddTaskAttributeChip: React.FC<AddTaskAttributeChipProps> = ({
  panel,
  iconName,
  iconSize = FONT_SIZES.SMALL,
  iconColor,
  text,
  label,
  isPlaceholder = false,
  textColor,
  viewType = TaskView.CREATE,
  showAddCtaWhenEmpty = false,
  hideValueWhenPlaceholder = false,
  onPress,
  onClear,
}) => {
  const isEditView = viewType === TaskView.EDIT;
  const [isContainerHovered, setIsContainerHovered] = React.useState(false);

  const getChipActionIcon = () => {
    if (panel === AddTaskAttributePanel.DueDate || panel === AddTaskAttributePanel.StartDate) {
      return <MaterialIcons name="close" size={FONT_SIZES.LARGE} color={COLORS.OFF_WHITE} />;
    }
    return <MaterialIcons name="keyboard-arrow-down" size={FONT_SIZES.LARGE} color={COLORS.OFF_WHITE} />;
  }

  if (isEditView) {
    return (
      <View style={attributeChipStyles.chipEdit}>
        <View style={attributeChipStyles.chipEditTopRow}>
          {!!label && <Text style={attributeChipStyles.chipEditLabel}>{label}</Text>}

          {showAddCtaWhenEmpty && isPlaceholder && (
            <Ionicons name="add" size={FONT_SIZES.LARGE} color={COLORS.OFF_WHITE} />
          )}
        </View>

        {(!hideValueWhenPlaceholder || !isPlaceholder) && (
          <Pressable
            style={[
              attributeChipStyles.chipEditValueRow,
              (isContainerHovered) && attributeChipStyles.chipEditValueRowHovered,
            ]}
            onPress={onPress}
            onHoverIn={() => setIsContainerHovered(true)}
            onHoverOut={() => setIsContainerHovered(false)}
          >
            <Ionicons name={iconName as never} size={iconSize} color={iconColor} />
            <Text
              style={[
                attributeChipStyles.chipTextEdit,
                isPlaceholder && attributeChipStyles.chipTextPlaceholder,
                textColor ? { color: textColor } : null,
              ]}>
              {text}
            </Text>
            {
              isContainerHovered && getChipActionIcon()
            }
          </Pressable>
        )}

        {onClear && !isPlaceholder && (
          <Pressable
            style={attributeChipStyles.chipEditClearButton}
            onPress={(event) => {
              event.stopPropagation();
              onClear();
            }}
          >
            <Ionicons name="close-outline" size={14} color={COLORS.OFF_WHITE} />
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <Pressable style={attributeChipStyles.chip} onPress={onPress}>
      <Ionicons name={iconName as never} size={iconSize} color={iconColor} />
      <Text
        style={[
          attributeChipStyles.chipText,
          isPlaceholder && attributeChipStyles.chipTextPlaceholder,
          textColor ? { color: textColor } : null,
        ]}
      >
        {text}
      </Text>
      {onClear && (
        <Pressable
          onPress={(event) => {
            event.stopPropagation();
            onClear();
          }}
        >
          <Ionicons name="close-outline" size={14} color={COLORS.OFF_WHITE} />
        </Pressable>
      )}
    </Pressable>
  );
};

export default AddTaskAttributeChip;
