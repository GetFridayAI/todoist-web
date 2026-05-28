import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../../shared/styles/colors.styles';
import { FONT_SIZES, FONT_WEIGHT, SPACING } from '../../../../shared/styles/spacing.styles';

export interface ProjectMenuOption {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  isDestructive?: boolean;
}

interface ProjectMenuProps {
  visible: boolean;
  top: number;
  left: number;
  options: ProjectMenuOption[];
  onClose: () => void;
  onSelect: (optionKey: string) => void;
}

const ProjectMenu: React.FC<ProjectMenuProps> = ({
  visible,
  top,
  left,
  options,
  onClose,
  onSelect,
}) => {
  const [hoveredOptionKey, setHoveredOptionKey] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!visible) {
      setHoveredOptionKey(null);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[styles.menuContainer, { top, left }]}
          onPress={(event) => event.stopPropagation()}
        >
          {options.map((option) => {
            const isHovered = hoveredOptionKey === option.key;
            const itemColor = option.isDestructive ? COLORS.RED_BLOOD : COLORS.WHITE;

            return (
              <Pressable
                key={option.key}
                style={[styles.menuItem, isHovered && styles.menuItemHovered]}
                onHoverIn={() => setHoveredOptionKey(option.key)}
                onHoverOut={() => setHoveredOptionKey(null)}
                onPress={() => {
                  onSelect(option.key);
                  onClose();
                }}
              >
                <Ionicons name={option.icon} size={16} color={itemColor} />
                <Text style={[styles.menuItemText, { color: itemColor }]}>{option.label}</Text>
              </Pressable>
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    minWidth: 180,
    backgroundColor: COLORS.GREY_DARK,
    borderRadius: SPACING.SMALL,
    borderWidth: 1,
    borderColor: COLORS.GREY,
    paddingVertical: SPACING.EXTRA_SMALL,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SMALL,
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.SMALL,
  },
  menuItemHovered: {
    backgroundColor: COLORS.GREY,
  },
  menuItemText: {
    fontSize: FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHT.NORMAL,
  },
});

export default ProjectMenu;
