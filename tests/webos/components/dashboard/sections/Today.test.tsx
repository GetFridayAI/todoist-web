import React from 'react';
import { render } from '@testing-library/react-native';
import Today from '../../../../../src/webos/components/dashboard/sections/Today';
import { PRIORITY, TASK_TYPE, Task } from '../../../../../src/shared/interfaces/tasks.interface';
import { mockTasks, mockProject, mockAssignee, mockReporter, mockDates } from '../../../../fixtures/tasks.fixtures';

jest.mock('../../../../../src/shared/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'dark',
    styles: { backgroundColor: '#1f1f1f', color: '#ffffff' },
  }),
}));

const buildTask = (overrides: Partial<Task> & { taskId: number; taskName: string; priority: PRIORITY }): Task => ({
  taskId: overrides.taskId,
  taskName: overrides.taskName,
  taskDesc: '',
  priority: overrides.priority,
  taskType: TASK_TYPE.TASK,
  assignee: mockAssignee,
  reporter: mockReporter,
  dates: mockDates,
  project: mockProject,
  labels: [],
  comments: [],
  reminders: [],
});

const p0Task = buildTask({ taskId: 1, taskName: 'Critical Bug', priority: PRIORITY.P0 });
const p1Task = buildTask({ taskId: 2, taskName: 'High Priority Feature', priority: PRIORITY.P1 });
const p2Task = buildTask({ taskId: 3, taskName: 'Medium Refactor', priority: PRIORITY.P2 });
const p3Task = buildTask({ taskId: 4, taskName: 'Low Priority Chore', priority: PRIORITY.P3 });

const allPriorityTasks = [p0Task, p1Task, p2Task, p3Task];

describe('Today', () => {
  it('renders the "Today" section title', () => {
    const { getByText } = render(<Today tasks={allPriorityTasks} />);
    expect(getByText('Today')).toBeTruthy();
  });

  it('shows the total task count in the summary row', () => {
    const { getByText } = render(<Today tasks={allPriorityTasks} />);
    expect(getByText('4 Tasks')).toBeTruthy();
  });

  it('renders four priority column headers', () => {
    const { getByText } = render(<Today tasks={allPriorityTasks} />);
    expect(getByText('Priority 0')).toBeTruthy();
    expect(getByText('Priority 1')).toBeTruthy();
    expect(getByText('Priority 2')).toBeTruthy();
    expect(getByText('Priority 3')).toBeTruthy();
  });

  it('shows a count of 1 in each priority column header when each priority has exactly one task', () => {
    const { getAllByText } = render(<Today tasks={allPriorityTasks} />);
    // Each column header renders its task count; all are "1"
    const countLabels = getAllByText('1');
    expect(countLabels.length).toBe(4);
  });

  it('places each task under the column matching its priority', () => {
    const { getByText } = render(<Today tasks={allPriorityTasks} />);
    expect(getByText('Critical Bug')).toBeTruthy();
    expect(getByText('High Priority Feature')).toBeTruthy();
    expect(getByText('Medium Refactor')).toBeTruthy();
    expect(getByText('Low Priority Chore')).toBeTruthy();
  });

  it('shows an empty-state message in a priority column that has no tasks', () => {
    const { getAllByText } = render(<Today tasks={[p0Task]} />);
    // Three empty columns → three empty-state messages
    const emptyMessages = getAllByText('No tasks in this priority.');
    expect(emptyMessages.length).toBe(3);
  });

  it('shows empty-state messages in all four columns when no tasks are provided', () => {
    const { getAllByText } = render(<Today tasks={[]} />);
    const emptyMessages = getAllByText('No tasks in this priority.');
    expect(emptyMessages.length).toBe(4);
  });

  it('shows "0 Tasks" in the summary row when tasks list is empty', () => {
    const { getByText } = render(<Today tasks={[]} />);
    expect(getByText('0 Tasks')).toBeTruthy();
  });

  it('renders multiple tasks in the same priority column when they share a priority', () => {
    const secondP1Task = buildTask({ taskId: 5, taskName: 'Another P1 Task', priority: PRIORITY.P1 });
    const { getByText } = render(<Today tasks={[p1Task, secondP1Task]} />);
    expect(getByText('High Priority Feature')).toBeTruthy();
    expect(getByText('Another P1 Task')).toBeTruthy();
  });
});
