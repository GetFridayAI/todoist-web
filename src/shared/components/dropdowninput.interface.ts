import { Ionicons } from '@expo/vector-icons';
import { COLORS } from "../styles/colors.styles";

export interface DropdownOption {
  label: string;
  shortfallName?: string; // For priority options like P0, P1, etc.
  value: string | number;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: keyof typeof COLORS;
}

export interface DropdownInputProps {
  value: string | number | null;
  options: DropdownOption[];
  onChange: (value: string | number) => void;
  onRequestClose?: () => void;
}
