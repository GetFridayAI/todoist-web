export interface DropdownOption {
  label: string;
  value: string | number;
}

export interface DropdownInputProps {
  value: string | number | null;
  options: DropdownOption[];
  onChange: (value: string | number) => void;
  onRequestClose?: () => void;
}
