import { render } from '@testing-library/react';
import Details from '@/components/Details/Details';

const setStateMock = jest.fn();
const fnMock = jest.fn();

const renderComponent = (loading: boolean, message: string, isMobile: boolean) => {
  return render(
    <Details
      aboutMeInput="test"
      setAboutMeInput={setStateMock}
      jdInput="test"
      setJdInput={setStateMock}
      submitHandler={fnMock}
      loading={loading}
      message={message}
      invalidInput={false}
      setIsResume={fnMock}
      collapse={false}
      setCollapse={fnMock}
      isMobile={isMobile}
    />
  );
};

describe('Details component', () => {
  it('renders Details component', () => {
    const { getByTestId } = renderComponent(true, "Message", false);
    const formWrapper = getByTestId('main-form');
    expect(formWrapper).toBeInTheDocument();
  });
});

describe('Submit button', () => {
  it('should have value "Generate" if there is no message and it is not loading', () => {
    const { getByTestId } = renderComponent(false, "", false);
    const submitButton = getByTestId('submit-btn') as HTMLInputElement;
    expect(submitButton.value).toBe('Generate');
  });

  it('should have value "Generating" if there is a message and it is loading', () => {
    const { getByTestId } = renderComponent(true, "Message", false);
    const submitButton = getByTestId('submit-btn') as HTMLInputElement;
    expect(submitButton.value).toBe('Generating');
  });

  it('should have value "Generate" if there is a message, but it is not loading', () => {
    const { getByTestId } = renderComponent(false, "Message", false);
    const submitButton = getByTestId('submit-btn') as HTMLInputElement;
    expect(submitButton.value).toBe('Generate');
  });

  it('should be disabled if it is loading', () => {
    const { getByTestId } = renderComponent(true, "", false);
    const submitButton = getByTestId('submit-btn') as HTMLInputElement;
    expect(submitButton.disabled).toBeTruthy();
  })

  it('should not be disabled if it is not loading', () => {
    const { getByTestId } = renderComponent(false, "", false);
    const submitButton = getByTestId('submit-btn') as HTMLInputElement;
    expect(submitButton.disabled).toBeFalsy();
  })
});
