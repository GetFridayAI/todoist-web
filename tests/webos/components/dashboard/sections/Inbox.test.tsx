import React from 'react';
import { render } from '@testing-library/react-native';
import Inbox from '../../../../../src/webos/components/dashboard/sections/Inbox';

describe('Inbox', () => {
  it('renders the section title', () => {
    const { getByText } = render(<Inbox routeParams={{}} tasks={[]} />);
    expect(getByText('Inbox')).toBeTruthy();
  });

  it('renders empty route params as an empty object JSON string', () => {
    const { getByText } = render(<Inbox routeParams={{}} tasks={[]} />);
    expect(getByText('Params: {}')).toBeTruthy();
  });

  it('renders provided route params as a JSON string', () => {
    const { getByText } = render(
      <Inbox routeParams={{ projectId: '12', filter: 'open' }} tasks={[]} />,
    );
    expect(getByText('Params: {"projectId":"12","filter":"open"}')).toBeTruthy();
  });

  it('falls back to empty object when routeParams is undefined', () => {
    const { getByText } = render(<Inbox tasks={[]} />);
    expect(getByText('Params: {}')).toBeTruthy();
  });
});
