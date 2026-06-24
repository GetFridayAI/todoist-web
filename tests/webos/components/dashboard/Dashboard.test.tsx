import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Dashboard from '../../../../src/webos/components/dashboard/Dashboard';
import { DashboardRoutes } from '../../../../src/shared/interfaces/routes.interface';
import { getRequest, postRequest } from '../../../../src/api/request';
import { mockTasks } from '../../../fixtures/tasks.fixtures';
import { mockProjects } from '../../../fixtures/projects.fixtures';
import { useTasksStore, useAppStoreDispatch, useProjectsStore, useUsersStore, useLabelsStore } from '../../../../src/shared/context/AppStoreContext';

jest.mock('../../../../src/api/request');

jest.mock('../../../../src/shared/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'dark',
    styles: {
      backgroundColor: '#1f1f1f',
      color: '#ffffff',
    },
  }),
}));

jest.mock('../../../../src/shared/context/AppStoreContext', () => ({
  useTasksStore: jest.fn(),
  useAppStoreDispatch: jest.fn(),
  useProjectsStore: jest.fn(),
  useUsersStore: jest.fn(),
  useLabelsStore: jest.fn(),
}));

jest.mock('../../../../src/webos/components/dashboard/Navbar/NavigationBar', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ isProjectsLoading }: { isProjectsLoading?: boolean }) =>
    React.createElement(Text, null, `NavigationBarMock:${isProjectsLoading ? 'loading' : 'loaded'}`);
});

jest.mock('../../../../src/webos/components/dashboard/sections/Search', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ routeParams }: { routeParams?: Record<string, string> }) => React.createElement(Text, null, `SearchSection:${JSON.stringify(routeParams ?? {})}`);
});

jest.mock('../../../../src/webos/components/dashboard/sections/Inbox', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ routeParams }: { routeParams?: Record<string, string> }) => React.createElement(Text, null, `InboxSection:${JSON.stringify(routeParams ?? {})}`);
});

jest.mock('../../../../src/webos/components/dashboard/sections/Today', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ tasks }: { tasks: unknown[] }) => React.createElement(Text, null, `TodaySection:${tasks.length}`);
});

jest.mock('../../../../src/webos/components/dashboard/sections/Upcoming', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return () => React.createElement(Text, null, 'UpcomingSection');
});

jest.mock('../../../../src/webos/components/dashboard/sections/Completed', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ routeParams }: { routeParams?: Record<string, string> }) => React.createElement(Text, null, `CompletedSection:${JSON.stringify(routeParams ?? {})}`);
});

jest.mock('../../../../src/webos/components/dashboard/sections/Settings', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return () => React.createElement(Text, null, 'SettingsSection');
});

jest.mock('../../../../src/webos/components/dashboard/sections/Projects', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ routeParams }: { routeParams?: Record<string, string> }) => React.createElement(Text, null, `ProjectsSection:${JSON.stringify(routeParams ?? {})}`);
});

const mockedPostRequest = postRequest as jest.Mock;
const mockedGetRequest = getRequest as jest.Mock;
const mockedUseTasksStore = useTasksStore as jest.Mock;
const mockedUseAppStoreDispatch = useAppStoreDispatch as jest.Mock;
const mockedUseProjectsStore = useProjectsStore as jest.Mock;
const mockedUseUsersStore = useUsersStore as jest.Mock;
const mockedUseLabelsStore = useLabelsStore as jest.Mock;

describe('Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseTasksStore.mockReturnValue(mockTasks);
    mockedUseAppStoreDispatch.mockReturnValue(jest.fn());
    mockedUseProjectsStore.mockReturnValue(mockProjects);
    mockedUseUsersStore.mockReturnValue([]);
    mockedUseLabelsStore.mockReturnValue([]);
    mockedPostRequest.mockImplementation((route: string) => {
      if (route === '/tasks/fetch/all') {
        return Promise.resolve(mockTasks);
      }

      if (route === '/fetch/collaborators/all') {
        return Promise.resolve([
          { userId: 1, userName: 'John Doe' },
          { userId: 2, userName: 'Jane Smith' },
        ]);
      }

      if (route === '/fetch/labels/all') {
        return Promise.resolve([
          { labelId: 1, labelName: 'frontend' },
          { labelId: 2, labelName: 'urgent' },
        ]);
      }

      return Promise.resolve([]);
    });
    mockedGetRequest.mockResolvedValue(mockProjects);
  });

  it('renders an error message when the tasks API request fails', async () => {
    mockedPostRequest.mockRejectedValue(new Error('Request failed'));
    const { getByText } = render(<Dashboard activeRoute={DashboardRoutes.TODAY} />);
    await waitFor(() => {
      expect(getByText('Request failed')).toBeTruthy();
    });
  });

  it('renders Today section by default when no activeRoute prop is provided', async () => {
    const { getByText } = render(<Dashboard />);
    await waitFor(() => {
      expect(getByText(`TodaySection:${mockTasks.length}`)).toBeTruthy();
    });
  });

  it('renders Search section when activeRoute is Search', async () => {
    const { getByText } = render(<Dashboard activeRoute={DashboardRoutes.SEARCH} routeParams={{ q: 'abc' }} />);
    await waitFor(() => {
      expect(getByText('SearchSection:{"q":"abc"}')).toBeTruthy();
    });
  });

  it('renders Inbox section when activeRoute is Inbox', async () => {
    const { getByText } = render(<Dashboard activeRoute={DashboardRoutes.INBOX} routeParams={{ id: '1' }} />);
    await waitFor(() => {
      expect(getByText('InboxSection:{"id":"1"}')).toBeTruthy();
    });
  });

  it('renders Completed section when activeRoute is Completed', async () => {
    const { getByText } = render(<Dashboard activeRoute={DashboardRoutes.COMPLETED} routeParams={{ done: 'true' }} />);
    await waitFor(() => {
      expect(getByText('CompletedSection:{"done":"true"}')).toBeTruthy();
    });
  });

  it('renders Projects section when activeRoute is Projects', async () => {
    const { getByText } = render(<Dashboard activeRoute={DashboardRoutes.PROJECTS} routeParams={{ projectId: '7' }} />);
    await waitFor(() => {
      expect(getByText('ProjectsSection:{"projectId":"7"}')).toBeTruthy();
    });
  });

  it('passes fetched tasks to the active section component', async () => {
    const { getByText } = render(<Dashboard activeRoute={DashboardRoutes.TODAY} />);
    await waitFor(() => {
      expect(getByText(`TodaySection:${mockTasks.length}`)).toBeTruthy();
    });
  });

  it('renders the navigation bar directly', async () => {
    const { getByText } = render(<Dashboard activeRoute={DashboardRoutes.TODAY} />);
    await waitFor(() => {
      expect(getByText(`TodaySection:${mockTasks.length}`)).toBeTruthy();
    });

    expect(getByText('NavigationBarMock:loaded')).toBeTruthy();
  });

  it('retrieves projects only once and passes them to the navigation bar', async () => {
    const { getByText } = render(<Dashboard activeRoute={DashboardRoutes.TODAY} />);

    await waitFor(() => {
      expect(getByText('NavigationBarMock:loaded')).toBeTruthy();
    });

    expect(mockedGetRequest).toHaveBeenCalledTimes(1);
    expect(mockedGetRequest).toHaveBeenCalledWith('/fetch/projects/all');
  });
});
