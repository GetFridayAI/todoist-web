import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import NavigationBar from '../../../../../src/webos/components/dashboard/Navbar/NavigationBar';
import { MENU_ITEMS } from '../../../../../src/webos/interfaces/navigation.interface';

// Mock child components with side-effects so NavigationBar tests stay focused
jest.mock('../../../../../src/webos/components/dashboard/Navbar/Projects', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return () => React.createElement(View, { testID: 'projects-section' }, React.createElement(Text, null, 'My Projects'));
});

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('NavigationBar', () => {
  const mockSetIsAddMenuOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderBar = (isAddMenuOpen = false) =>
    render(<NavigationBar isAddMenuOpen={isAddMenuOpen} setIsAddMenuOpen={mockSetIsAddMenuOpen} />);

  it('renders a navigation item for each menu item in MENU_ITEMS', () => {
    const { getByText } = renderBar();
    Object.values(MENU_ITEMS).forEach((label) => {
      expect(getByText(label)).toBeTruthy();
    });
  });

  it('renders the My Projects collapsible section', () => {
    const { getByTestId } = renderBar();
    expect(getByTestId('projects-section')).toBeTruthy();
  });

  it('renders the "Add" button', () => {
    const { getByText } = renderBar();
    expect(getByText('Add')).toBeTruthy();
  });

  it('calls setIsAddMenuOpen with true when Add is pressed and the menu is currently closed', () => {
    const { getByText } = renderBar(false);
    fireEvent.press(getByText('Add'));
    expect(mockSetIsAddMenuOpen).toHaveBeenCalledWith(true);
  });

  it('calls setIsAddMenuOpen with false when Add is pressed and the menu is currently open', () => {
    const { getByText } = renderBar(true);
    fireEvent.press(getByText('Add'));
    expect(mockSetIsAddMenuOpen).toHaveBeenCalledWith(false);
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
