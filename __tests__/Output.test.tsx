import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Output from '@/components/Output/Output';
import { jsPDF } from 'jspdf';

const renderComponent = (
  message: string,
  loading: boolean,
  stop: Function,
  error?: Error,
) => {
  return render(
    <Output
      message={message}
      loading={loading}
      error={error}
      stop={stop}
    />
  )
}

const fnMock = jest.fn();
jest.mock('jspdf', () => ({
  __esModule: true,
  jsPDF: jest.fn(() => ({
    html: jest.fn(),
    save: jest.fn()
  }))
}));

describe('Output component', () => {
  it('renders Output component', () => {
    const { getByTestId } = renderComponent('', false, fnMock);
    expect(getByTestId('output-wrapper')).toBeInTheDocument();
  })

  it('should show export pdf button if there is a message', () => {
    const { getByTestId } = renderComponent('message', false, fnMock);
    expect(getByTestId('export-btn')).toBeInTheDocument();
  })

  it('should not show export pdf button if there is no message', () => {
    const { queryByTestId } = renderComponent('', false, fnMock);
    expect(queryByTestId('export-btn')).not.toBeInTheDocument();
  })
})

describe('Message container', () => {
  it('should not show message container if message does not exists', () => {
    const { queryByTestId } = renderComponent('', false, fnMock);
    expect(queryByTestId('message-container')).not.toBeInTheDocument();
  })

  it('should show loading indicator if message is generating', () => {
    const { queryByTestId } = renderComponent('message', true, fnMock);
    expect(queryByTestId('loading-indicator')).toBeInTheDocument();
  })

  it('should not show loading indicator if message is not generating', () => {
    const { queryByTestId } = renderComponent('message', false, fnMock);
    expect(queryByTestId('loading-indicator')).not.toBeInTheDocument();
  })

  it('should not show loading indicator if there is an error', () => {
    const { queryByTestId } = renderComponent('', false, fnMock, new Error());
    expect(queryByTestId('loading-indicator')).not.toBeInTheDocument();
  })


  it('should display error message if there is an error', () => {
    const { getByText } = renderComponent('', false, fnMock, new Error());
    expect(getByText('Something went wrong. Try again in a few minutes.')).toBeInTheDocument();
  })

  it('should stop generating text if stop button is clicked', () => {
    const { getByTestId } = renderComponent("test", true, fnMock);
    const stopButton = getByTestId('stop-btn');
    expect(stopButton).toBeInTheDocument();
    fireEvent.click(stopButton);
    setTimeout(() => {
      expect(stopButton).not.toBeInTheDocument();
    }, 2000)
  })

  it('calls jsPDF to generate PDF when export button is clicked', () => {
    const { getByTestId } = renderComponent("test", true, fnMock);
    const exportButton = getByTestId('export-btn');
    fireEvent.click(exportButton);
    expect(jsPDF).toHaveBeenCalledWith('p', 'mm', 'a4');
  });
})