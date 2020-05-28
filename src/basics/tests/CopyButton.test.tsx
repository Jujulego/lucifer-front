import React from 'react';
import copy from 'copy-to-clipboard';
import { cleanup, render, act, fireEvent } from '@testing-library/react';

import CopyButton from '../components/CopyButton';

// Mocks
jest.mock('copy-to-clipboard');

document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: document.body,
});

// Setup
beforeEach(() => {
  (copy as jest.Mock).mockReset();
});

afterEach(() => {
  cleanup();
});

afterAll(() => {
  jest.restoreAllMocks();
})

// Tests
it('should show a button', () => {
  // Render
  const { container } = render(
    <CopyButton text={'test'} />
  );

  // Check elements
  expect(container).toMatchSnapshot();
});

it('should copy on click', () => {
  const spy = jest.fn();
  (copy as jest.Mock).mockImplementation(() => true);

  // Render
  const { container } = render(
    <CopyButton
      text={'test'}
      onCopied={spy}
    />
  );

  // Test event
  const button = container.querySelector('button')!;
  act(() => { fireEvent.click(button); });

  expect(copy).toHaveBeenCalledTimes(1);
  expect(copy).toHaveBeenCalledWith('test', { format: 'text/plain' });

  expect(spy).toHaveBeenCalledTimes(1);
})
