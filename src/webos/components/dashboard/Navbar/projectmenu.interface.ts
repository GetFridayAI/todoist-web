import { Ionicons } from '@expo/vector-icons';

export interface ProjectMenuOption {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  isDestructive?: boolean;
}

export interface ProjectMenuProps {
  visible: boolean;
  top: number;
  left: number;
  options: ProjectMenuOption[];
  onClose: () => void;
  onSelect: (optionKey: string) => void;
}
