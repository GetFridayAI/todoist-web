import { PRIORITY, TASK_TYPE, Task, TasksResponse } from '../../src/shared/interfaces/tasks.interface';
import { TaskComponentLabel } from '../../src/webos/interfaces/tasks/task.interface';

export const mockAssignee = {
  userId: 1,
  userName: 'John Doe',
};

export const mockReporter = {
  userId: 2,
  userName: 'Jane Smith',
};

export const mockProject = {
  projectId: 1,
  projectname: 'Test Project',
  projectIconColor: '#a970ff',
  createdAt: '2026/01/01',
  parentProjectId: null as null,
  isFavorite: false,
  openTasksCount: 3,
  hasSubProjects: false,
};

export const mockDates = {
  created: '2026/01/01',
  updated: '2026/04/01',
  start: '2026/04/10',
  due: '2026/05/01',
};

export const mockTaskLabels: TaskComponentLabel[] = [
  { labelId: 0, labelName: 'frontend' },
  { labelId: 1, labelName: 'auth' },
];

export const mockTask: Task = {
  taskId: 1,
  taskName: 'Fix Login Bug',
  taskDesc: 'Login fails on timeout',
  priority: PRIORITY.P1,
  assignee: mockAssignee,
  reporter: mockReporter,
  dates: mockDates,
  project: mockProject,
  labels: ['frontend', 'auth'],
  comments: [],
  taskType: TASK_TYPE.TASK,
  reminders: [],
};

export const mockTasks: TasksResponse = [
  { ...mockTask, taskId: 1, taskName: 'Fix Login Bug', priority: PRIORITY.P0 },
  { ...mockTask, taskId: 2, taskName: 'Update Docs', priority: PRIORITY.P1 },
  { ...mockTask, taskId: 3, taskName: 'Refactor API', priority: PRIORITY.P2 },
  { ...mockTask, taskId: 4, taskName: 'Write Tests', priority: PRIORITY.P3 },
];
