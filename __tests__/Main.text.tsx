/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from '@testing-library/react';
import Main from '../src/components/Main/Main';

jest.mock('ai/react', () => ({
  useCompletion: jest.fn(() => ({
    complete: jest.fn(),
    isLoading: false,
    message: 'mock',
    stop: jest.fn(),
  })),
}));

describe('Main component', () => {
  it('renders without crashing', () => {
    render(<Main />);
  });

  it('submits the form correctly', () => {
    const { getByTestId } = render(<Main />);
    const form = getByTestId('main-form');
    fireEvent.submit(form);
  });

});

/*
  Tests to add
  - form is submitted with only 1 input field filled out
  - form is submitted with no input fields filled out
  - on load, message should be empty
  - after submitHandler is invoked, message should no longer be empty
*/

