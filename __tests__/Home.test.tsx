import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

it('should have Docs text', () => {
  render(<Home />);
  const myEl = screen.getByText('Docs');
  expect(myEl).toBeInTheDocument();
})

it('should contain the text "information"', () => {
  render(<Home />);
  const myEl = screen.getByText(/information/i);
  expect(myEl).toBeInTheDocument();
})

it('should have a heading', () => {
  render(<Home />);
  const myEl = screen.getByRole('heading', {
    name: 'Learn'
  });
  expect(myEl).toBeInTheDocument();
})