import { DropdownOption } from './dropdowninput.interface';

export interface SearchDropdownInputProps {
  options: DropdownOption[];
  value: string | number | Array<string | number> | null;
  /** Called with all selected values when outside is clicked (multi) or an option is clicked (single). */
  onConfirm: (value: string | number | Array<string | number>) => void;
  /** Called after outside click handling to close the parent panel. */
  onRequestClose?: () => void;
  /** Optional. Called with the raw search text when "Create X" is tapped. */
  onRequestCreate?: (text: string) => void;
  placeholderText?: string;
  isMultiSelect?: boolean;
  iconName?: string;
  iconColor?: string;
}
