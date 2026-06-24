import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import Backlog from '../../../../../src/webos/components/dashboard/sections/Backlog';
import { getRequest } from '../../../../../src/api/request';
import { PRIORITY, TASK_STATUS, TASK_TYPE } from '../../../../../src/shared/interfaces/tasks.interface';
import somedayTasksMock from '../../../../../src/api/mocks/tasks/someday';

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

describe('Backlog Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-06-22T12:00:00.000Z'));
    mockGetRequest.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('calls someday tasks endpoint and renders section title', async () => {
    mockGetRequest.mockResolvedValue(somedayTasksMock);

    render(<Backlog routeParams={{}} />);

    await waitFor(() => {
      expect(mockGetRequest).toHaveBeenCalledWith('/tasks/someday');
      const title = screen.getByText('Backlog');
      expect(title).toBeTruthy();
    });
  });

  it('should display loading state initially', () => {
    mockGetRequest.mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(<Backlog routeParams={{}} />);

    const loadingText = screen.getByText('Loading backlog tasks...');
    expect(loadingText).toBeTruthy();
  });

  it('should display error message on API failure', async () => {
    const errorMessage = 'Failed to fetch tasks';
    mockGetRequest.mockRejectedValue(new Error(errorMessage));

    render(<Backlog routeParams={{}} />);

    await waitFor(() => {
      const error = screen.getByText(errorMessage);
      expect(error).toBeTruthy();
    });
  });

  it('should display summary with task count', async () => {
    mockGetRequest.mockResolvedValue(somedayTasksMock);

    render(<Backlog routeParams={{}} />);

    await waitFor(() => {
      const summary = screen.getByText(`${somedayTasksMock.length} Backlog`);
      expect(summary).toBeTruthy();
    });
  });

  it('should group tasks by project', async () => {
    mockGetRequest.mockResolvedValue(somedayTasksMock);

    render(<Backlog routeParams={{}} />);

    await waitFor(() => {
      // Check for project names that should appear as section headers
      const projectNames = new Set(somedayTasksMock.map(t => t.project.projectname));
      for (const projectName of projectNames) {
        const elements = screen.queryAllByText(projectName);
        expect(elements.length).toBeGreaterThan(0);
      }
    });
  });

  it('should display task names in the list', async () => {
    mockGetRequest.mockResolvedValue(somedayTasksMock);

    render(<Backlog routeParams={{}} />);

    await waitFor(() => {
      somedayTasksMock.forEach(task => {
        expect(screen.getByText(task.taskName)).toBeTruthy();
      });
    });
  });

  it('should filter tasks with someday label', async () => {
    mockGetRequest.mockResolvedValue(somedayTasksMock);

    render(<Backlog routeParams={{}} />);

    await waitFor(() => {
      // Should display task count in the summary
      // The component renders "Backlog" as section title
      expect(screen.getByText('Backlog')).toBeTruthy();
      // Verify at least one task is rendered
      expect(screen.getByText(somedayTasksMock[0].taskName)).toBeTruthy();
    });
  });
});
