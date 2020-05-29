// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'configs';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Configure enzyme
configure({ adapter: new Adapter() });

// Polyfills
// @ts-ignore
document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: document.body,
});

