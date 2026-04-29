import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Task from '../../../../../src/webos/components/dashboard/tasks/Task';
import { PRIORITY, TASK_TYPE } from '../../../../../src/shared/interfaces/tasks.interface';
import {
  mockAssignee,
  mockDates,
  mockProject,
  mockTaskLabels,
} from '../../../../fixtures/tasks.fixtures';

const baseProps = {
  taskId: 1,
  taskName: 'Fix Login Bug',
  taskDesc: 'Login fails on timeout',
  priority: PRIORITY.P1,
  taskType: TASK_TYPE.TASK,
  assignee: mockAssignee,
  reporter: { userId: 2, userName: 'Jane Smith' },
  dates: mockDates,
  project: mockProject,
  labels: mockTaskLabels,
  isCompleted: false,
  highlightHovers: false,
};

describe('Task', () => {
  it('renders the task name', () => {
    const { getByText } = render(<Task {...baseProps} />);
    expect(getByText('Fix Login Bug')).toBeTruthy();
  });

  it('renders the formatted start date', () => {
    const { getByText } = render(<Task {...baseProps} />);
    expect(getByText('10 Apr')).toBeTruthy();
  });

  it('renders the formatted due date', () => {
    const { getByText } = render(<Task {...baseProps} />);
    expect(getByText('01 May')).toBeTruthy();
  });

  it('renders the project name in the metadata row', () => {
    const { getAllByText } = render(<Task {...baseProps} />);
    expect(getAllByText(/Test Project/).length).toBeGreaterThan(0);
  });

  it('renders label names joined by a separator when labels are present', () => {
    const { getByText } = render(<Task {...baseProps} />);
    expect(getByText(/frontend.*auth|auth.*frontend/)).toBeTruthy();
  });

  it('does not render the labels metadata chip when labels array is empty', () => {
    const { queryByText } = render(<Task {...baseProps} labels={[]} />);
    expect(queryByText('pricetag-outline')).toBeNull();
  });

  it('renders the assignee initials in the avatar', () => {
    const { getByText } = render(<Task {...baseProps} />);
    // 'John Doe' → 'JD'
    expect(getByText('JD')).toBeTruthy();
  });

  it('renders the checkmark icon when isCompleted is true', () => {
    const { getByText } = render(<Task {...baseProps} isCompleted />);
    // Ionicons mock renders icon name as text
    expect(getByText('checkmark')).toBeTruthy();
  });

  it('does not render the checkmark icon when isCompleted is false', () => {
    const { queryByText } = render(<Task {...baseProps} isCompleted={false} />);
    expect(queryByText('checkmark')).toBeNull();
  });

  it('applies strikethrough style to the task name when isCompleted is true', () => {
    const { getByText } = render(<Task {...baseProps} isCompleted />);
    expect(getByText('Fix Login Bug')).toHaveStyle({ textDecorationLine: 'line-through' });
  });

  it('does not apply strikethrough style when the task is not completed', () => {
    const { getByText } = render(<Task {...baseProps} isCompleted={false} />);
    expect(getByText('Fix Login Bug')).not.toHaveStyle({ textDecorationLine: 'line-through' });
  });

  it('handles hover-in without crashing when highlightHovers is true', () => {
    const { getByText } = render(<Task {...baseProps} highlightHovers />);
    fireEvent(getByText('Fix Login Bug'), 'hoverIn');
    expect(getByText('Fix Login Bug')).toBeTruthy();
  });

  it('handles hover-in without crashing when highlightHovers is false', () => {
    const { getByText } = render(<Task {...baseProps} highlightHovers={false} />);
    fireEvent(getByText('Fix Login Bug'), 'hoverIn');
    expect(getByText('Fix Login Bug')).toBeTruthy();
  });

  it('renders the assignee username in the project/assignee metadata chip', () => {
    const { getByText } = render(<Task {...baseProps} />);
    expect(getByText(/Test Project\/John Doe/)).toBeTruthy();
  });
});
