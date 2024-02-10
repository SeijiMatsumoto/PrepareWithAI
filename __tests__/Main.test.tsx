import { render } from '@testing-library/react';
import Main from '../src/components/Main/Main';

describe('Main component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Main />);
    const mainParentComponent = getByTestId('main-parent-component');
    expect(mainParentComponent).toBeInTheDocument();
    expect(mainParentComponent.children.length).toBe(2);
  });
});

