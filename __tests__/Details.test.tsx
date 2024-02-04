import { render, screen, fireEvent } from '@testing-library/react';
import Details from '@/components/Details/Details';
import InputSection from '@/components/Details/InputSection';

const setStateMock = jest.fn();
const fnMock = jest.fn();

describe('Details component', () => {
  it('renders Details component', () => {
    render(<Details aboutMeInput={""} setAboutMeInput={setStateMock} jdInput={""} setJdInput={setStateMock} clickHandler={fnMock} />);
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate' })).toBeInTheDocument();
  });
});

describe('InputSection component', () => {
  it('renders InputSection component', async () => {
    render(<InputSection input="Input" setInput={setStateMock} title="Title" buttonText="Button" placeholder="Placeholder" />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    // expect(screen.getByRole('input', { name: 'Button' })).toBeInTheDocument();

    const textarea = await screen.findByPlaceholderText('Placeholder')
    expect(textarea).toBeInTheDocument();
  });
});
