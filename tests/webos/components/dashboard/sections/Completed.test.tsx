import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import Completed from '../../../../../src/webos/components/dashboard/sections/Completed';
import { getRequest } from '../../../../../src/api/request';
import { CompletedTasksResponse } from '../../../../../src/webos/interfaces/dashboard/completed.interface';
import { PRIORITY, TASK_TYPE } from '../../../../../src/shared/interfaces/tasks.interface';

jest.mock('../../../../../src/api/request', () => ({
  getRequest: jest.fn(),
}));

jest.mock('../../../../../src/shared/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'dark',
    styles: { backgroundColor: '#1f1f1f', color: '#ffffff' },
  }),
}));

jest.mock('../../../../../src/shared/context/AppStoreContext', () => ({
  useUsersStore: () => [
    { userId: 1, userName: 'Amit Rai' },
    { userId: 2, userName: 'Jane Smith' },
  ],
  useLocaleStore: () => 'en-US',
}));

jest.mock('../../../../../src/webos/components/tasks/ViewTask', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return ({ task }: { task: { taskName: string } | null }) =>
    React.createElement(Text, null, `ViewTask:${task?.taskName ?? 'none'}`);
});

const mockGetRequest = getRequest as jest.MockedFunction<typeof getRequest>;

const buildResponse = (overrides: Partial<CompletedTasksResponse[number]> = {}): CompletedTasksResponse[number] => ({
  taskId: 101,
  taskName: 'Ship dashboard polish',
  taskDesc: 'Refine styles and interactions',
  priority: PRIORITY.P1,
  assignee: { userId: 1, userName: 'Amit Rai' },
  reporter: { userId: 2, userName: 'Jane Smith' },
  dates: {
    created: '2026-06-10',
    updated: '2026-06-14',
    start: '2026-06-13',
    due: '2026-06-14',
  },
  project: {
    projectId: 90,
    projectname: 'Personal Branding / Blogging',
    parentProjectId: null,
    openTasksCount: null,
    hasSubProjects: false,
  },
  labels: [],
  comments: [],
  taskType: TASK_TYPE.TASK,
  reminders: [],
  isCompleted: true,
  completedAt: '2026-06-14T10:00:00.000Z',
  completedBy: { userId: 1, userName: 'Amit Rai' },
  ...overrides,
});

describe('Completed', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-06-14T12:00:00.000Z'));
    mockGetRequest.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('calls completed tasks endpoint and renders section title', async () => {
    mockGetRequest.mockResolvedValue([buildResponse()]);

    const { getByText } = render(<Completed routeParams={{ currentUserId: '1' }} />);

    await waitFor(() => {
      expect(mockGetRequest).toHaveBeenCalledWith('/tasks/completed');
      expect(getByText('Completed')).toBeTruthy();
    });
  });

  it('uses the statement format "X completed <TASK_NAME>" and renders project name', async () => {
    mockGetRequest.mockResolvedValue([
      buildResponse({
        taskId: 102,
        taskName: 'Own completed task',
        completedBy: { userId: 1, userName: 'Amit Rai' },
      }),
      buildResponse({
        taskId: 103,
        taskName: 'Peer completed task',
        completedBy: { userId: 2, userName: 'Jane Smith' },
      }),
    ]);

    const { getByText, getAllByText, queryByText } = render(<Completed routeParams={{ currentUserId: '1' }} />);

    await waitFor(() => {
      expect(getByText('You completed Own completed task')).toBeTruthy();
      expect(getByText('Jane Smith completed Peer completed task')).toBeTruthy();
      expect(getAllByText('Personal Branding / Blogging').length).toBeGreaterThan(0);
      expect(queryByText('You completed this task')).toBeNull();
    });
  });

  it('uses relative time only within 24 hours', async () => {
    const olderDate = new Date('2026-06-13T10:00:00.000Z');
    const expectedOlderLabel = olderDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });

    mockGetRequest.mockResolvedValue([
      buildResponse({ taskId: 104, completedAt: '2026-06-14T10:00:00.000Z' }),
      buildResponse({ taskId: 105, completedAt: olderDate.toISOString() }),
    ]);

    const { getByText } = render(<Completed routeParams={{ currentUserId: '1' }} />);

    await waitFor(() => {
      expect(getByText('2 hours ago')).toBeTruthy();
      expect(getByText(expectedOlderLabel)).toBeTruthy();
    });
  });

  it('opens ViewTask when completed task row is clicked', async () => {
    mockGetRequest.mockResolvedValue([
      buildResponse({ taskId: 106, taskName: 'Open details task' }),
    ]);

    const { getByText } = render(<Completed routeParams={{ currentUserId: '1' }} />);

    await waitFor(() => {
      expect(getByText('You completed Open details task')).toBeTruthy();
    });

    fireEvent.press(getByText('You completed Open details task'));

    expect(getByText('ViewTask:Open details task')).toBeTruthy();
  });

  it('does not render empty day sections', async () => {
    mockGetRequest.mockResolvedValue([
      buildResponse({ taskId: 107, completedAt: '2026-06-14T09:00:00.000Z' }),
      buildResponse({ taskId: 108, completedAt: '2026-06-12T09:00:00.000Z' }),
    ]);

    const { getByText, queryByText } = render(<Completed routeParams={{ currentUserId: '1' }} />);

    await waitFor(() => {
      expect(getByText('Today')).toBeTruthy();
      expect(queryByText('Yesterday')).toBeNull();
    });
  });
});
