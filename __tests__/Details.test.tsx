import { render, screen, fireEvent } from '@testing-library/react';
import Details from '@/components/Details/Details';

describe('Details component', () => {
  it('renders Details component', () => {
    render(<Details />);
    expect(screen.getByText('Details')).toBeInTheDocument();
  });
  \


  it('updates textarea value on user input', () => {
    render(<Details />);
    const textarea = screen.getByPlaceholderText('Paste in job description here or import PDF above') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'New job description' } });
    expect(textarea.value).toBe('New job description');
  });
});