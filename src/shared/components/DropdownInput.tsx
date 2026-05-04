import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { DropdownInputProps, DropdownOption } from './dropdowninput.interface';
import styles from './dropdowninput.styles';

export type { DropdownOption };

const DropdownInput: React.FC<DropdownInputProps> = ({
  value,
  options,
  onChange,
  onRequestClose,
}) => {
  return (
    <View style={styles.wrapper}>
      {/* Full-screen tap target to close without mutating selection. */}
      <Pressable style={styles.backdrop} onPress={onRequestClose} />

      <View style={styles.dropdown}>
        <ScrollView style={styles.optionList} keyboardShouldPersistTaps="handled">
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <Pressable
                key={String(option.value)}
                style={({ hovered }) => [
                  styles.option,
                  hovered && styles.optionHovered,
                  isSelected && styles.optionSelected,
                ]}
                onPress={() => {
                  onChange(option.value);
                  onRequestClose?.();
                }}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default DropdownInput;