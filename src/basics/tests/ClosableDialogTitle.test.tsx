import React from 'react';
import { cleanup, render, act, fireEvent } from '@testing-library/react';

import ClosableDialogTitle from '../components/ClosableDialogTitle';

// Setup
afterEach(cleanup);

// Tests
it('should show a title followed by a button', () => {
  // Render
  const { container } = render(
    <ClosableDialogTitle>Title</ClosableDialogTitle>
  );

  // Check elements
  expect(container).toMatchSnapshot();
});

it('should react to button click', () => {
  const spy = jest.fn();

  // Render
  const { container } = render(
    <ClosableDialogTitle onClose={spy}>Title</ClosableDialogTitle>
  );

  // Test event
  const button = container.querySelector('button')!;
  act(() => { fireEvent.click(button); });

  expect(spy).toHaveBeenCalledTimes(1);
});
