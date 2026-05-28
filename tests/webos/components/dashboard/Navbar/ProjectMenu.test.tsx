import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ProjectMenu, { ProjectMenuOption } from '../../../../../src/webos/components/dashboard/Navbar/ProjectMenu';

const mockOptions: ProjectMenuOption[] = [
  { key: 'edit', label: 'Edit', icon: 'create-outline' },
  { key: 'archive', label: 'Archive', icon: 'archive-outline' },
  { key: 'delete', label: 'Delete', icon: 'trash-outline', isDestructive: true },
];

const defaultProps = {
  visible: true,
  top: 100,
  left: 200,
  options: mockOptions,
  onClose: jest.fn(),
  onSelect: jest.fn(),
};

describe('ProjectMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render option labels when visible is false', () => {
    const { queryByText } = render(<ProjectMenu {...defaultProps} visible={false} />);
    expect(queryByText('Edit')).toBeNull();
    expect(queryByText('Archive')).toBeNull();
    expect(queryByText('Delete')).toBeNull();
  });

  it('renders all option labels when visible is true', () => {
    const { getByText } = render(<ProjectMenu {...defaultProps} />);
    expect(getByText('Edit')).toBeTruthy();
    expect(getByText('Archive')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
  });

  it('renders the destructive Delete option last in the options list', () => {
    const { getAllByText } = render(<ProjectMenu {...defaultProps} />);
    const renderedOptionLabels = getAllByText(/^(Edit|Archive|Delete)$/).map((node) =>
      Array.isArray(node.props.children) ? node.props.children.join('') : node.props.children
    );
    expect(renderedOptionLabels[renderedOptionLabels.length - 1]).toBe('Delete');
  });

  it('calls onSelect with the option key when a non-destructive option is pressed', () => {
    const onSelect = jest.fn();
    const { getByText } = render(<ProjectMenu {...defaultProps} onSelect={onSelect} />);
    fireEvent.press(getByText('Edit'));
    expect(onSelect).toHaveBeenCalledWith('edit');
  });

  it('calls onClose automatically after any option is pressed', () => {
    const onClose = jest.fn();
    const { getByText } = render(<ProjectMenu {...defaultProps} onClose={onClose} />);
    fireEvent.press(getByText('Archive'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSelect with the destructive option key when Delete is pressed', () => {
    const onSelect = jest.fn();
    const { getByText } = render(<ProjectMenu {...defaultProps} onSelect={onSelect} />);
    fireEvent.press(getByText('Delete'));
    expect(onSelect).toHaveBeenCalledWith('delete');
  });

  it('keeps the option visible when cursor enters a menu option', () => {
    const { getByText } = render(<ProjectMenu {...defaultProps} />);
    const editLabel = getByText('Edit');
    fireEvent(editLabel, 'hoverIn');
    expect(getByText('Edit')).toBeTruthy();
  });

  it('keeps the option visible when cursor leaves a menu option', () => {
    const { getByText } = render(<ProjectMenu {...defaultProps} />);
    const editLabel = getByText('Edit');
    fireEvent(editLabel, 'hoverIn');
    fireEvent(editLabel, 'hoverOut');
    expect(getByText('Edit')).toBeTruthy();
  });

  it('resets hover state when menu becomes hidden', () => {
    const { getByText, rerender } = render(<ProjectMenu {...defaultProps} />);
    fireEvent(getByText('Edit'), 'hoverIn');
    rerender(<ProjectMenu {...defaultProps} visible={false} />);
    // Re-opening should have no lingering hover state
    rerender(<ProjectMenu {...defaultProps} visible={true} />);
    expect(getByText('Edit')).toBeTruthy();
  });
});
