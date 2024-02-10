import { render, fireEvent } from '@testing-library/react';
import InputSection from '@/components/Details/InputSection';

const setStateMock = jest.fn();

const renderComponent = (
  input: string,
  setInputMock: any,
  title: string,
  placeholder: string,
  invalidInput: boolean) => {
  return render(
    <InputSection
      input={input}
      setInput={setInputMock}
      title={title}
      placeholder={placeholder}
      setIsResume={setStateMock}
      invalidInput={invalidInput}
    />
  )
}

describe('Details component', () => {
  it('renders Details component', () => {
    const { getByTestId } = renderComponent('', setStateMock, '', '', false);
    expect(getByTestId('input-section-wrapper')).toBeInTheDocument();
  });

  it('should have correct header', () => {
    const { getByText } = renderComponent('', setStateMock, 'About Me', '', false);
    expect(getByText('About Me')).toBeInTheDocument();
  })

  it('should have correct header', () => {
    const { getByText } = renderComponent('', setStateMock, 'About Me', '', false);
    expect(getByText('About Me')).toBeInTheDocument();
  })
});

describe('Textarea component', () => {
  it('should have correct placeholder', () => {
    const { getByPlaceholderText } = renderComponent('', setStateMock, '', 'Placeholder', false)
    expect(getByPlaceholderText('Placeholder'))
  })

  it('should have correct value', () => {
    const { getByTestId } = renderComponent('value', setStateMock, '', '', false);
    const textarea = getByTestId('textarea') as HTMLTextAreaElement;
    expect(textarea.value).toBe('value');
  })

  it('should update input when user types', () => {
    const setInputMock = jest.fn();
    const { getByTestId } = renderComponent('initial', setInputMock, '', '', false);
    const textarea = getByTestId('textarea');
    const newValue = 'New value';

    fireEvent.change(textarea, { target: { value: newValue } });
    expect(setInputMock).toHaveBeenCalledWith(newValue);
  })
})

