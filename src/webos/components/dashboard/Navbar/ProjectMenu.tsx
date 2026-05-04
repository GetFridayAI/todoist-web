import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../../shared/styles/colors.styles';
import { ProjectMenuOption, ProjectMenuProps } from './projectmenu.interface';
import styles from './projectmenu.styles';

export type { ProjectMenuOption };

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

export default ProjectMenu;
