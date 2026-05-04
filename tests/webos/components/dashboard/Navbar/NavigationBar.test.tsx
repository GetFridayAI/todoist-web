import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import NavigationBar from '../../../../../src/webos/components/dashboard/Navbar/NavigationBar';
import { MENU_ITEMS } from '../../../../../src/webos/interfaces/navigation.interface';
import { mockProjects } from '../../../../fixtures/projects.fixtures';
import { mockAssignee } from '../../../../fixtures/tasks.fixtures';

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

  return ({ visible, onClose, onCancel, onAdd }: { visible: boolean; onClose: () => void; onCancel: () => void; onAdd: () => void }) =>
    visible
      ? React.createElement(
          View,
          { testID: 'add-task-modal' },
          React.createElement(Text, null, 'AddTaskModal'),
          React.createElement(Pressable, { onPress: onClose }, React.createElement(Text, null, 'Close AddTask')),
          React.createElement(Pressable, { onPress: onCancel }, React.createElement(Text, null, 'Cancel AddTask')),
          React.createElement(Pressable, { onPress: onAdd }, React.createElement(Text, null, 'Submit AddTask')),
        )
      : null;
});

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('NavigationBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderBar = () => render(
    <NavigationBar
      projects={mockProjects}
      collaborators={[mockAssignee, { userId: 2, userName: 'Jane Smith' }]}
      labels={[
        { labelId: 1, labelName: 'frontend' },
        { labelId: 2, labelName: 'urgent' },
      ]}
    />,
  );

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

  it('renders the "Add" button', () => {
    const { getByText } = renderBar();
    expect(getByText('Add')).toBeTruthy();
  });

  it('opens the add menu when Add is pressed', () => {
    const { getByText } = renderBar();
    fireEvent.press(getByText('Add'));
    expect(getByText('Add Task')).toBeTruthy();
    expect(getByText('Add Project')).toBeTruthy();
  });

  it('closes the add menu when Add is pressed again while it is open', () => {
    const { getByText, queryByText } = renderBar();
    fireEvent.press(getByText('Add'));
    expect(getByText('Add Task')).toBeTruthy();
    fireEvent.press(getByText('Add'));
    expect(queryByText('Add Task')).toBeNull();
    expect(queryByText('Add Project')).toBeNull();
  });

  it('closes the add menu when Add Task is pressed', () => {
    const { getByText, queryByText } = renderBar();
    fireEvent.press(getByText('Add'));
    fireEvent.press(getByText('Add Task'));
    expect(queryByText('Add Task')).toBeNull();
    expect(queryByText('Add Project')).toBeNull();
    expect(getByText('AddTaskModal')).toBeTruthy();
  });

  it('closes the add menu when Add Project is pressed', () => {
    const { getByText, queryByText } = renderBar();
    fireEvent.press(getByText('Add'));
    fireEvent.press(getByText('Add Project'));
    expect(queryByText('Add Task')).toBeNull();
    expect(queryByText('Add Project')).toBeNull();
  });

  it('closes the add task modal when its close action is triggered', () => {
    const { getByText, queryByText } = renderBar();
    fireEvent.press(getByText('Add'));
    fireEvent.press(getByText('Add Task'));
    fireEvent.press(getByText('Close AddTask'));
    expect(queryByText('AddTaskModal')).toBeNull();
  });

  it('closes the add task modal when its cancel action is triggered', () => {
    const { getByText, queryByText } = renderBar();
    fireEvent.press(getByText('Add'));
    fireEvent.press(getByText('Add Task'));
    fireEvent.press(getByText('Cancel AddTask'));
    expect(queryByText('AddTaskModal')).toBeNull();
  });

  it('closes the add task modal when its add action is triggered', () => {
    const { getByText, queryByText } = renderBar();
    fireEvent.press(getByText('Add'));
    fireEvent.press(getByText('Add Task'));
    fireEvent.press(getByText('Submit AddTask'));
    expect(queryByText('AddTaskModal')).toBeNull();
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
