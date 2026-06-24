import { DropdownOption } from '../../../../../shared/components/dropdowninput.interface';
import { PRIORITY, TASK_STATUS, TASK_TYPE } from '../../../../../shared/interfaces/tasks.interface';
import { COLORS } from '../../../../../shared/styles/colors.styles';

export const PRIORITY_OPTIONS: DropdownOption[] = Object.values(PRIORITY)
  .filter((priority) => typeof priority === 'number')
  .map((priority) => ({
    label: `Priority ${priority}`,
    shortfallName: `P${priority}`,
    value: priority as number,
    iconName: 'flag',
    iconColor:
      priority === PRIORITY.P0 ? COLORS.RED_BLOOD
        : priority === PRIORITY.P1 ? COLORS.ORANGE
        : priority === PRIORITY.P2 ? COLORS.YELLOW
        : COLORS.GREEN,
  }));

export const TASK_TYPE_OPTIONS: DropdownOption[] = [
  { label: 'Task', value: TASK_TYPE.TASK },
  { label: 'Sub task', value: TASK_TYPE.SUB_TASK },
];

export const TASK_STATUS_OPTIONS: DropdownOption[] = [
  { label: 'Todo', value: TASK_STATUS.TODO },
  { label: 'In Progress', value: TASK_STATUS.IN_PROGRESS },
  { label: 'Done', value: TASK_STATUS.DONE },
  { label: 'Review', value: TASK_STATUS.REVIEW },
  { label: 'Test', value: TASK_STATUS.TEST },
  { label: 'Design', value: TASK_STATUS.DESIGN },
  { label: 'Blocked', value: TASK_STATUS.BLOCKED },
];
