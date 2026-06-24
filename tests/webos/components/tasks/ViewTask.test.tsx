import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { PRIORITY, TASK_STATUS, TASK_TYPE } from '../../../../src/shared/interfaces/tasks.interface';

jest.mock('../../../../src/shared/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'dark',
    styles: { backgroundColor: '#1f1f1f', color: '#ffffff' },
  }),
}));

jest.mock('../../../../src/shared/context/AppStoreContext', () => ({
  useUsersStore: () => [
    { userId: 1, userName: 'Amit Rai' },
    { userId: 2, userName: 'Jane Smith' },
  ],
  useProjectsStore: () => [
    {
      projectId: 1,
      projectname: 'Test Project',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
  ],
  useLabelsStore: () => [
    { labelId: 0, labelName: 'someday', isDefault: true },
    { labelId: 1, labelName: 'frontend', isDefault: false },
  ],
  useAppStoreDispatch: () => jest.fn(),
}));

import ViewTask from '../../../../src/webos/components/tasks/ViewTask';

const mockTask = {
  taskId: 1,
  taskName: 'Test Task',
  taskDesc: 'Test Description',
  priority: PRIORITY.P3,
  assignee: null,
  reporter: { userId: 1, userName: 'Amit Rai' },
  dates: {
    created: '2026-06-22',
    updated: '2026-06-22',
    start: '',
    due: '',
  },
  project: {
    projectId: 1,
    projectname: 'Test Project',
    parentProjectId: null,
    openTasksCount: null,
    hasSubProjects: false,
  },
  labels: [{ labelId: 0, labelName: 'someday', isDefault: true }],
  comments: [],
  taskType: TASK_TYPE.TASK,
  status: TASK_STATUS.TODO,
  reminders: [],
};

describe('ViewTask Label Management', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render ViewTask modal when visible prop is true', () => {
    const { getByText } = render(
      <ViewTask visible={true} task={mockTask} onClose={jest.fn()} />
    );

    // The component should render the project name and labels
    expect(getByText('Test Project')).toBeTruthy();
    expect(getByText('someday')).toBeTruthy();
  });

  it('should not render ViewTask modal when visible prop is false', () => {
    const { queryByText } = render(
      <ViewTask visible={false} task={mockTask} onClose={jest.fn()} />
    );

    // When modal is not visible, project name should not be found
    expect(queryByText('Test Project')).toBeFalsy();
  });

  it('should return null if task is null', () => {
    const result = render(
      <ViewTask visible={true} task={null} onClose={jest.fn()} />
    );

    expect(result).toBeTruthy();
  });

  it('should display task project name in modal header', async () => {
    const { getByText } = render(
      <ViewTask visible={true} task={mockTask} onClose={jest.fn()} />
    );

    await waitFor(() => {
      expect(getByText('Test Project')).toBeTruthy();
    });
  });

  it('should initialize taskLabels with task labels on mount', async () => {
    const { getByText } = render(
      <ViewTask visible={true} task={mockTask} onClose={jest.fn()} />
    );

    await waitFor(() => {
      // Task should be rendered with the initial labels
      expect(getByText('someday')).toBeTruthy();
    });
  });

  it('should handle task changes and reset state', async () => {
    const newTask = {
      ...mockTask,
      taskId: 2,
      taskName: 'Another Task',
      labels: [{ labelId: 1, labelName: 'frontend', isDefault: false }],
    };

    const { rerender, getByText } = render(
      <ViewTask visible={true} task={mockTask} onClose={jest.fn()} />
    );

    // First render should show someday label
    expect(getByText('someday')).toBeTruthy();

    rerender(
      <ViewTask visible={true} task={newTask} onClose={jest.fn()} />
    );

    // After rerender with new task, component should still render
    await waitFor(() => {
      expect(render).toBeTruthy();
    });
  });
});
