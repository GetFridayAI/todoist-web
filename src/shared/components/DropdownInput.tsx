import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { COLORS } from '../styles/colors.styles';
import { DropdownInputProps, DropdownOption } from './dropdowninput.interface';
import styles from './dropdowninput.styles';

export type { DropdownOption };

const DropdownInput: React.FC<DropdownInputProps> = ({
  value,
  options,
  onChange,
  onRequestClose,
}) => {
  const [hoveredValue, setHoveredValue] = React.useState<string | number | null>(null);

  return (
    <View style={styles.wrapper}>
      {/* Full-screen tap target to close without mutating selection. */}
      <Pressable style={styles.backdrop} onPress={onRequestClose} />

      <View style={styles.dropdown}>
        <ScrollView style={styles.optionList} keyboardShouldPersistTaps="handled">
          {options.map((option) => {
            const isSelected = option.value === value;
            const isHovered = hoveredValue === option.value;

            return (
              <Pressable
                key={String(option.value)}
                style={[
                  styles.option,
                  isHovered && styles.optionHovered,
                ]}
                onPress={() => {
                  onChange(option.value);
                  onRequestClose?.();
                }}
                onHoverIn={() => setHoveredValue(option.value)}
                onHoverOut={() => setHoveredValue(null)}
              >
                {
                  option.iconName && <Ionicons name={option.iconName} size={14} color={option.iconColor ? option.iconColor : COLORS.WHITE} style={styles.optionIcon} />
                }

                <Text style={styles.optionText}>{option.label}</Text>
                {isSelected && (
                  <Ionicons name="checkmark" size={14} color={COLORS.RED_BLOOD} />
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default DropdownInput;