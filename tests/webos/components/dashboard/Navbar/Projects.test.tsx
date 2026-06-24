import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ActivityIndicator } from 'react-native';
import NavbarProjects from '../../../../../src/webos/components/dashboard/Navbar/Projects';
import { mockProjects } from '../../../../fixtures/projects.fixtures';

describe('NavbarProjects', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows a loading indicator while projects are loading', async () => {
    const { getByText, UNSAFE_getByType, queryByText } = render(<NavbarProjects projects={[]} isLoading />);
    expect(getByText('My Projects')).toBeTruthy();
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    expect(queryByText('chevron-up-outline')).toBeNull();
    expect(queryByText('chevron-down-outline')).toBeNull();
  });

  it('renders each project name from props', async () => {
    const { getByText } = render(<NavbarProjects projects={mockProjects} />);
    expect(getByText('Work')).toBeTruthy();
    expect(getByText('Personal')).toBeTruthy();
  });

  it('renders the "My Projects" section header', async () => {
    const { getByText } = render(<NavbarProjects projects={mockProjects} />);
    expect(getByText('My Projects')).toBeTruthy();
  });

  it('shows the header collapse chevron pointing up when the section is expanded by default', async () => {
    const { getByText } = render(<NavbarProjects projects={mockProjects} />);
    await waitFor(() => {
      // Ionicons mock renders the icon name as text
      expect(getByText('chevron-up-outline')).toBeTruthy();
    });
  });

  it('changes the header chevron to point down when the header is pressed to collapse', async () => {
    const { getByText } = render(<NavbarProjects projects={mockProjects} />);
    await waitFor(() => expect(getByText('My Projects')).toBeTruthy());
    fireEvent.press(getByText('My Projects'));
    await waitFor(() => {
      expect(getByText('chevron-down-outline')).toBeTruthy();
    });
  });

  it('displays the aggregated task count for a parent project that has children', async () => {
    const { getByText } = render(<NavbarProjects projects={mockProjects} />);
    // Work has openTasksCount=5, child Todoist has openTasksCount=2 → total 7
    await waitFor(() => {
      expect(getByText('7')).toBeTruthy();
    });
  });

  it('renders child projects under their parent when the parent is expanded', async () => {
    const { getByText } = render(<NavbarProjects projects={mockProjects} />);
    await waitFor(() => expect(getByText('Work')).toBeTruthy());
    // 'Todoist' is a child of 'Work'; hover the parent row to expose the expand toggle
    fireEvent(getByText('Work'), 'hoverIn');
    fireEvent(getByText('chevron-forward-outline'), 'press', {
      stopPropagation: jest.fn(),
    });
    await waitFor(() => {
      expect(getByText('Todoist')).toBeTruthy();
    });
  });

  it('hides the task count and shows the action icons when a project row is hovered', async () => {
    const { getByText, queryByText } = render(<NavbarProjects projects={mockProjects} />);
    await waitFor(() => expect(getByText('Personal')).toBeTruthy());
    // Personal has openTasksCount=3, no children
    expect(getByText('3')).toBeTruthy();
    fireEvent(getByText('Personal'), 'hoverIn');
    await waitFor(() => {
      expect(queryByText('3')).toBeNull();
      // Action menu trigger icon appears
      expect(getByText('ellipsis-horizontal')).toBeTruthy();
    });
  });

  it('shows the task count again after the cursor leaves a hovered project row', async () => {
    const { getByText } = render(<NavbarProjects projects={mockProjects} />);
    await waitFor(() => expect(getByText('Personal')).toBeTruthy());
    fireEvent(getByText('Personal'), 'hoverIn');
    fireEvent(getByText('Personal'), 'hoverOut');
    await waitFor(() => {
      expect(getByText('3')).toBeTruthy();
    });
  });

  it('renders a sub-projects expand toggle for projects that have children', async () => {
    const { getByText } = render(<NavbarProjects projects={mockProjects} />);
    await waitFor(() => expect(getByText('Work')).toBeTruthy());
    // Hover Work (hasSubProjects=true) to expose actions row
    fireEvent(getByText('Work'), 'hoverIn');
    await waitFor(() => {
      // chevron-forward-outline is the collapse icon rendered by Ionicons mock
      expect(getByText('chevron-forward-outline')).toBeTruthy();
    });
  });

  it('does not render a sub-projects expand toggle for leaf projects', async () => {
    const { getByText, queryByText } = render(<NavbarProjects projects={mockProjects} />);
    await waitFor(() => expect(getByText('Personal')).toBeTruthy());
    // Hover Personal (hasSubProjects=false)
    fireEvent(getByText('Personal'), 'hoverIn');
    await waitFor(() => {
      expect(queryByText('chevron-forward-outline')).toBeNull();
    });
  });
});
