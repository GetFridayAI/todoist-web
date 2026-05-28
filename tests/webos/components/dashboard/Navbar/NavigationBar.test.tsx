import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import NavigationBar from '../../../../../src/webos/components/dashboard/Navbar/NavigationBar';
import { MENU_ITEMS } from '../../../../../src/webos/interfaces/navigation.interface';
import { mockProjects } from '../../../../fixtures/projects.fixtures';
import { useLabelsStore, useProjectsStore, useUsersStore } from '../../../../../src/shared/context/AppStoreContext';

jest.mock('../../../../../src/shared/context/AppStoreContext', () => ({
  useProjectsStore: jest.fn(),
  useUsersStore: jest.fn(),
  useLabelsStore: jest.fn(),
}));

// Mock child components with side-effects so NavigationBar tests stay focused
jest.mock('../../../../../src/webos/components/dashboard/Navbar/Projects', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return ({ projects }: { projects: Array<{ projectname: string }> }) =>
    React.createElement(
      View,
      { testID: 'projects-section' },
      React.createElement(Text, null, `My Projects:${projects.length}`),
    );
});

jest.mock('../../../../../src/webos/components/tasks/AddTask', () => {
  const React = require('react');
  const { Pressable, Text, View } = require('react-native');

  return ({ visible, onClose, onCancel, onAdd }: { visible: boolean; onClose: () => void; onCancel: () => void; onAdd?: () => void }) =>
    visible
      ? React.createElement(
          View,
          { testID: 'add-task-modal' },
          React.createElement(Text, null, 'AddTaskModal'),
          React.createElement(Pressable, { onPress: onClose }, React.createElement(Text, null, 'Close AddTask')),
          React.createElement(Pressable, { onPress: onCancel }, React.createElement(Text, null, 'Cancel AddTask')),
          onAdd ? React.createElement(Pressable, { onPress: onAdd }, React.createElement(Text, null, 'Submit AddTask')) : null,
        )
      : null;
});

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('NavigationBar', () => {
  const mockedUseProjectsStore = useProjectsStore as jest.Mock;
  const mockedUseUsersStore = useUsersStore as jest.Mock;
  const mockedUseLabelsStore = useLabelsStore as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseProjectsStore.mockReturnValue(mockProjects);
    mockedUseUsersStore.mockReturnValue([{ userId: 1, userName: 'Amit Rai' }]);
    mockedUseLabelsStore.mockReturnValue([
      { labelId: 1, labelName: 'frontend' },
      { labelId: 2, labelName: 'urgent' },
    ]);
  });

  const renderBar = () => render(<NavigationBar />);

  it('renders a navigation item for each menu item in MENU_ITEMS', () => {
    const { getByText } = renderBar();
    Object.values(MENU_ITEMS).forEach((label) => {
      expect(getByText(label)).toBeTruthy();
    });
  });

  it('renders the My Projects collapsible section', () => {
    const { getByTestId, getByText } = renderBar();
    expect(getByTestId('projects-section')).toBeTruthy();
    expect(getByText(`My Projects:${mockProjects.length}`)).toBeTruthy();
  });

  it('renders the "Add Task" control', () => {
    const { getByText } = renderBar();
    expect(getByText('Add Task')).toBeTruthy();
  });

  it('opens the add task modal when Add Task is pressed', () => {
    const { getByText } = renderBar();
    fireEvent.press(getByText('Add Task'));
    expect(getByText('AddTaskModal')).toBeTruthy();
  });

  it('does not render an add dropdown flow', () => {
    const { getByText, queryByText } = renderBar();
    fireEvent.press(getByText('Add Task'));
    expect(queryByText('Add Project')).toBeNull();
  });

  it('keeps the add task modal open after pressing Add Task', () => {
    const { getByText, queryByText } = renderBar();
    fireEvent.press(getByText('Add Task'));
    expect(getByText('AddTaskModal')).toBeTruthy();
    expect(queryByText('Add Project')).toBeNull();
  });

  it('closes the add task modal when its close action is triggered', () => {
    const { getByText, queryByText } = renderBar();
    fireEvent.press(getByText('Add Task'));
    fireEvent.press(getByText('Close AddTask'));
    expect(queryByText('AddTaskModal')).toBeNull();
  });

  it('closes the add task modal when its cancel action is triggered', () => {
    const { getByText, queryByText } = renderBar();
    fireEvent.press(getByText('Add Task'));
    fireEvent.press(getByText('Cancel AddTask'));
    expect(queryByText('AddTaskModal')).toBeNull();
  });

  it('does not render an add action button when AddTask onAdd is not provided', () => {
    const { getByText, queryByText } = renderBar();
    fireEvent.press(getByText('Add Task'));
    expect(queryByText('Submit AddTask')).toBeNull();
  });

  it('renders the user avatar initials', () => {
    const { getByText } = renderBar();
    expect(getByText('A')).toBeTruthy();
  });

  it('renders the profile name', () => {
    const { getByText } = renderBar();
    expect(getByText('Amit Rai')).toBeTruthy();
  });
});
