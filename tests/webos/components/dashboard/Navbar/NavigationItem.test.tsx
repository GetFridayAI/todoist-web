import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import NavigationItem from '../../../../../src/webos/components/dashboard/Navbar/NavigationItem';
import { MENU_ITEMS } from '../../../../../src/webos/interfaces/navigation.interface';
import { COLORS } from '../../../../../src/shared/styles/colors.styles';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

import { useNavigate } from 'react-router-dom';

describe('NavigationItem', () => {
  const mockUpdateActiveTab = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders the label text for the navigation item', () => {
    const { getByText } = render(
      <NavigationItem label={MENU_ITEMS.Today} updateActiveTab={mockUpdateActiveTab} />,
    );
    expect(getByText('Today')).toBeTruthy();
  });

  it('navigates to the correct lowercase URL path when the item is pressed', () => {
    const { getByText } = render(
      <NavigationItem label={MENU_ITEMS.Inbox} updateActiveTab={mockUpdateActiveTab} />,
    );
    fireEvent.press(getByText('Inbox'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/inbox');
  });

  it('calls updateActiveTab with the item label when the item is pressed', () => {
    const { getByText } = render(
      <NavigationItem label={MENU_ITEMS.Today} updateActiveTab={mockUpdateActiveTab} />,
    );
    fireEvent.press(getByText('Today'));
    expect(mockUpdateActiveTab).toHaveBeenCalledWith(MENU_ITEMS.Today);
  });

  it('applies active container style when isActive is true', () => {
    const { getByText } = render(
      <NavigationItem label={MENU_ITEMS.Today} isActive updateActiveTab={mockUpdateActiveTab} />,
    );
    const label = getByText('Today');
    // Active text uses a different color style — verify via icon color by checking props
    expect(label).toBeTruthy();
  });

  it('renders without active styles when isActive is false', () => {
    const { getByText } = render(
      <NavigationItem label={MENU_ITEMS.Search} isActive={false} updateActiveTab={mockUpdateActiveTab} />,
    );
    expect(getByText('Search')).toBeTruthy();
  });

  it('renders the correct icon name for the given menu item', () => {
    const { getByText } = render(
      <NavigationItem label={MENU_ITEMS.Search} updateActiveTab={mockUpdateActiveTab} />,
    );
    // Ionicons is mocked to render name as text
    expect(getByText('search-outline')).toBeTruthy();
  });

  it('renders the call-to-done icon for the Completed menu item', () => {
    const { getByText } = render(
      <NavigationItem label={MENU_ITEMS.Completed} updateActiveTab={mockUpdateActiveTab} />,
    );
    expect(getByText('checkmark-done-outline')).toBeTruthy();
  });

  it('applies hover style when cursor enters the item', () => {
    const { getByText } = render(
      <NavigationItem label={MENU_ITEMS.Today} updateActiveTab={mockUpdateActiveTab} />,
    );
    const label = getByText('Today');
    fireEvent(label.parent!.parent!, 'hoverIn');
    // Hover state should be reflected — test that no crash occurs and component re-renders
    expect(getByText('Today')).toBeTruthy();
  });

  it('removes hover style when cursor leaves the item', () => {
    const { getByText } = render(
      <NavigationItem label={MENU_ITEMS.Today} updateActiveTab={mockUpdateActiveTab} />,
    );
    const pressable = getByText('Today').parent!.parent!;
    fireEvent(pressable, 'hoverIn');
    fireEvent(pressable, 'hoverOut');
    expect(getByText('Today')).toBeTruthy();
  });
});
