import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Today from '../../../../../src/webos/components/dashboard/sections/Today';
import { PRIORITY, TASK_TYPE, Task } from '../../../../../src/shared/interfaces/tasks.interface';
import { mockAssignee, mockDates, mockProject, mockReporter } from '../../../../fixtures/tasks.fixtures';

jest.mock('../../../../../src/shared/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'dark',
    styles: { backgroundColor: '#1f1f1f', color: '#ffffff' },
  }),
}));

jest.mock('../../../../../src/webos/components/tasks/ViewTask', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return ({ task }: { task: { taskName: string } | null }) =>
    React.createElement(Text, null, `ViewTask:${task?.taskName ?? 'none'}`);
});

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

describe('Today', () => {
  it('renders section title and task summary', () => {
    const { getByText } = render(<Today tasks={[p0Task, p1Task, p2Task]} />);
    expect(getByText('Today')).toBeTruthy();
    expect(getByText('3 Tasks')).toBeTruthy();
  });

  it('renders only the priority columns that have tasks', () => {
    const { getByText, queryByText } = render(<Today tasks={[p0Task, p1Task]} />);
    expect(getByText('Priority 0')).toBeTruthy();
    expect(getByText('Priority 1')).toBeTruthy();
    expect(queryByText('Priority 2')).toBeNull();
    expect(queryByText('Priority 3')).toBeNull();
  });

  it('opens ViewTask when a task card is clicked', () => {
    const { getByText } = render(<Today tasks={[p0Task]} />);

    fireEvent.press(getByText('Critical Bug'));

    expect(getByText('ViewTask:Critical Bug')).toBeTruthy();
  });
});
