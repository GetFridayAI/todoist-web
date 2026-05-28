import React from 'react';
import { render } from '@testing-library/react-native';
import Completed from '../../../../../src/webos/components/dashboard/sections/Completed';

describe('Completed', () => {
  it('renders the section title', () => {
    const { getByText } = render(<Completed routeParams={{}} tasks={[]} />);
    expect(getByText('Completed')).toBeTruthy();
  });

  it('renders empty route params as an empty object JSON string', () => {
    const { getByText } = render(<Completed routeParams={{}} tasks={[]} />);
    expect(getByText('Params: {}')).toBeTruthy();
  });

  it('renders provided route params as a JSON string', () => {
    const { getByText } = render(
      <Completed routeParams={{ sprint: '42', assignee: 'john' }} tasks={[]} />,
    );
    expect(getByText('Params: {"sprint":"42","assignee":"john"}')).toBeTruthy();
  });

  it('falls back to empty object when routeParams is undefined', () => {
    const { getByText } = render(<Completed tasks={[]} />);
    expect(getByText('Params: {}')).toBeTruthy();
  });
});
