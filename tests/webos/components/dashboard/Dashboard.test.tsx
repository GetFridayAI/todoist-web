import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import Dashboard from '../../../../src/webos/components/dashboard/Dashboard';
import { DashboardRoutes } from '../../../../src/shared/interfaces/routes.interface';
import { postRequest } from '../../../../src/api/request';
import { mockTasks } from '../../../fixtures/tasks.fixtures';

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

jest.mock('../../../../src/webos/components/dashboard/Navbar/NavigationBar', () => {
  const React = require('react');
  const { Pressable, Text } = require('react-native');
  return ({ isAddMenuOpen, setIsAddMenuOpen }: { isAddMenuOpen: boolean; setIsAddMenuOpen: (open: boolean) => void }) =>
    React.createElement(
      Pressable,
      {
        onPress: () => setIsAddMenuOpen(!isAddMenuOpen),
      },
      React.createElement(Text, null, 'NavigationBarMock'),
    );
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

describe('Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedPostRequest.mockResolvedValue(mockTasks);
  });

  it('shows a loading state message while tasks are being fetched', async () => {
    mockedPostRequest.mockReturnValue(new Promise(() => {}));
    const { getByText } = render(<Dashboard activeRoute={DashboardRoutes.TODAY} />);
    await waitFor(() => {
      expect(getByText('Loading tasks...')).toBeTruthy();
    });
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

  it('renders add menu items when mocked navigation bar toggles menu open', async () => {
    const { getByText } = render(<Dashboard activeRoute={DashboardRoutes.TODAY} />);
    await waitFor(() => {
      expect(getByText(`TodaySection:${mockTasks.length}`)).toBeTruthy();
    });

    fireEvent.press(getByText('NavigationBarMock'));

    expect(getByText('Add Task')).toBeTruthy();
    expect(getByText('Add Project')).toBeTruthy();
  });

  it('closes add menu when Add Task is pressed', async () => {
    const { getByText, queryByText } = render(<Dashboard activeRoute={DashboardRoutes.TODAY} />);

    await waitFor(() => {
      expect(getByText(`TodaySection:${mockTasks.length}`)).toBeTruthy();
    });

    fireEvent.press(getByText('NavigationBarMock'));
    expect(getByText('Add Task')).toBeTruthy();

    fireEvent.press(getByText('Add Task'));

    expect(queryByText('Add Task')).toBeNull();
    expect(queryByText('Add Project')).toBeNull();
  });
});
