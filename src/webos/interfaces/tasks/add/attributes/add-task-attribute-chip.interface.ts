import { AddTaskAttributePanel } from './add-task-attributes.interface';
import { TaskView } from '../../viewtask.interface';

export interface AddTaskAttributeChipProps {
  panel: AddTaskAttributePanel;
  iconName: string;
  iconSize?: number;
  iconColor: string;
  text: string;
  isPlaceholder?: boolean;
  textColor?: string;
  viewType?: TaskView;
  showAddCtaWhenEmpty?: boolean;
  hideValueWhenPlaceholder?: boolean;
  onPress: () => void;
  onClear?: () => void;
  label?: string;
}
