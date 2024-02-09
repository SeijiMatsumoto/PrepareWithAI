/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen, fireEvent } from '@testing-library/react';
import Details from '@/components/Details/Details';
import InputSection from '@/components/Details/InputSection';

const setStateMock = jest.fn();
const fnMock = jest.fn();

describe('Details component', () => {
  it('renders Details component', () => {
    render(<Details aboutMeInput={"test"} setAboutMeInput={setStateMock} jdInput={"test"} setJdInput={setStateMock} submitHandler={fnMock} loading={false} message="test" />);
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

});

describe('InputSection component', () => {
  it('renders InputSection component', async () => {
    render(<InputSection input="Input" setInput={setStateMock} title="Title" placeholder="Placeholder" />);
    expect(screen.getByText('Title')).toBeInTheDocument();

    const textarea = await screen.findByPlaceholderText('Placeholder')
    expect(textarea).toBeInTheDocument();
  });
});
