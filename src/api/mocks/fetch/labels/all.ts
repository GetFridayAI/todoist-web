import { TaskLabel } from '../../../../shared/interfaces/tasks.interface';

const labelsMock: TaskLabel[] = [
  { labelId: 0, labelName: 'someday', isDefault: true },
  { labelId: 1, labelName: 'frontend', isDefault: false },
  { labelId: 2, labelName: 'backend', isDefault: false },
  { labelId: 3, labelName: 'auth', isDefault: false },
  { labelId: 4, labelName: 'urgent', isDefault: false },
  { labelId: 5, labelName: 'design', isDefault: false },
];

export default labelsMock;