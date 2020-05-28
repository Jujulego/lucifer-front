import React from 'react';
import copy from 'copy-to-clipboard';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import CopyButton from '../components/CopyButton';

// Mocks
jest.mock('copy-to-clipboard');

// Setup
let mount: ReturnType<typeof createMount>;
let shallow: ReturnType<typeof createShallow>;

beforeAll(() => {
  mount = createMount();
  shallow = createShallow();
});

afterAll(() => {
  mount.cleanUp();
  jest.restoreAllMocks();
});

beforeEach(() => {
  (copy as jest.Mock).mockReset();
});

// Tests
it('should render correctly', () => {
  // Render
  const wrapper = shallow(
    <CopyButton text={'test'} />
  );

  // Check elements
  expect(wrapper).toMatchSnapshot();
});

it('should copy on click', () => {
  const spy = jest.fn();
  (copy as jest.Mock).mockImplementation(() => true);

  // Render
  const wrapper = mount(
    <CopyButton
      text={'test'}
      onCopied={spy}
    />
  );

  // Get button
  const button = wrapper.find('button');
  expect(button).toHaveLength(1);

  // Test event
  button.simulate('click');

  expect(copy).toHaveBeenCalledTimes(1);
  expect(copy).toHaveBeenCalledWith('test', { format: 'text/plain' });

  expect(spy).toHaveBeenCalledTimes(1);
})
