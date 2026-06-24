import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Inbox from '../../../../../src/webos/components/dashboard/sections/Inbox';
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

const buildTask = (overrides: Partial<Task> & { taskId: number; taskName: string; projectId: number }): Task => ({
  taskId: overrides.taskId,
  taskName: overrides.taskName,
  taskDesc: '',
  priority: PRIORITY.P2,
  taskType: TASK_TYPE.TASK,
  assignee: mockAssignee,
  reporter: mockReporter,
  dates: mockDates,
  project: { ...mockProject, projectId: overrides.projectId, projectname: overrides.projectId === 0 ? 'Inbox' : 'General' },
  labels: [],
  comments: [],
  reminders: [],
});

describe('Inbox', () => {
  it('renders only inbox tasks and summary count', () => {
    const inboxTask = buildTask({ taskId: 1, taskName: 'Inbox Task', projectId: 0 });
    const nonInboxTask = buildTask({ taskId: 2, taskName: 'Project Task', projectId: 7 });

    const { getByText, queryByText } = render(<Inbox tasks={[inboxTask, nonInboxTask]} />);

    expect(getByText('Inbox')).toBeTruthy();
    expect(getByText('1 Tasks')).toBeTruthy();
    expect(getByText('Inbox Task')).toBeTruthy();
    expect(queryByText('Project Task')).toBeNull();
  });

  it('opens ViewTask when an inbox task is clicked', () => {
    const inboxTask = buildTask({ taskId: 1, taskName: 'Openable Inbox Task', projectId: 0 });
    const { getByText } = render(<Inbox tasks={[inboxTask]} />);

    fireEvent.press(getByText('Openable Inbox Task'));

    expect(getByText('ViewTask:Openable Inbox Task')).toBeTruthy();
  });
});
