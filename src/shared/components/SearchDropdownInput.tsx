import React from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { COLORS } from '../styles/colors.styles';
import { DropdownOption } from './dropdowninput.interface';
import { SearchDropdownInputProps } from './searchdropdowninput.interface';
import styles from './searchdropdowninput.styles';
import { Ionicons } from '@expo/vector-icons';
import { SPACING } from '../styles/spacing.styles';

const SearchDropdownInput: React.FC<SearchDropdownInputProps> = ({
  options,
  value,
  onConfirm,
  onRequestClose,
  onRequestCreate,
  placeholderText = 'Search…',
  isMultiSelect = false,
  iconName,
  iconColor = COLORS.WHITE,
}) => {
  const [query, setQuery] = React.useState('');
  const [hoveredOptionValue, setHoveredOptionValue] = React.useState<string | number | null>(null);

  // Derive pending selection list from the value prop.
  const pendingValues = React.useMemo<Array<string | number>>(() => {
    if (isMultiSelect) {
      return Array.isArray(value) ? value : [];
    }
    return value === null || value === undefined ? [] : [value as string | number];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMultiSelect, value]);

  const [localSelected, setLocalSelected] = React.useState<Array<string | number>>(pendingValues);

  // Keep local selection in sync when the value prop changes (e.g. panel re-opened).
  React.useEffect(() => {
    setLocalSelected(pendingValues);
  }, [pendingValues]);

  const filteredOptions = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const normalizedQuery = query.trim().toLowerCase();
  const hasExactMatch = options.some((o) => o.label.toLowerCase() === normalizedQuery);
  const hasSubstringMatch =
    normalizedQuery.length > 0 &&
    options.some((o) => o.label.toLowerCase().includes(normalizedQuery));
  const showCreateLink =
    normalizedQuery.length > 0 &&
    !hasExactMatch &&
    !hasSubstringMatch &&
    onRequestCreate !== undefined;

  const handleOptionPress = (option: DropdownOption) => {
    if (isMultiSelect) {
      setLocalSelected((prev) =>
        prev.includes(option.value)
          ? prev.filter((v) => v !== option.value)
          : [...prev, option.value],
      );
      return;
    }

    // Single-select: confirm immediately.
    onConfirm(option.value);
  };

  const handleOutsidePress = () => {
    if (isMultiSelect) {
      onConfirm(localSelected);
    }
    // For single-select, clicking outside just closes without confirming.
    setQuery('');
    onRequestClose?.();
  };

  const handleCreate = () => {
    if (!onRequestCreate) return;
    onRequestCreate(query.trim());
    setQuery('');
  };

  return (
    <View style={styles.wrapper}>
      {/* Invisible backdrop: clicking it fires outside-press logic */}
      <Pressable style={styles.backdrop} onPress={handleOutsidePress} />

      <View style={styles.panel}>
        <TextInput
          autoFocus
          value={query}
          onChangeText={setQuery}
          placeholder={placeholderText}
          placeholderTextColor={COLORS.OFF_WHITE}
          style={styles.searchInput}
        />

        <ScrollView style={styles.optionList} keyboardShouldPersistTaps="handled">
          {filteredOptions.map((option) => {
            const isSelected = localSelected.includes(option.value);
            const isHovered = hoveredOptionValue === option.value;

            return (
              <Pressable
                key={String(option.value)}
                style={[styles.option, isHovered && styles.optionHovered, isSelected && styles.optionSelected]}
                onHoverIn={() => setHoveredOptionValue(option.value)}
                onHoverOut={() => setHoveredOptionValue(null)}
                onPress={() => handleOptionPress(option)}
              >
                {
                  iconName && (
                    <Ionicons 
                      name={iconName} 
                      size={SPACING.MEDIUM}
                      style={styles.icon} 
                      color={iconColor} />
                  )
                }
                <Text style={styles.optionText}>{option.label}</Text>
                {isMultiSelect && (
                  <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                )}
              </Pressable>
            );
          })}

          {showCreateLink && (
            <Pressable style={styles.createLink} onPress={handleCreate}>
              <Text style={styles.createLinkText}>Create "{query.trim()}"</Text>
            </Pressable>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchDropdownInput;