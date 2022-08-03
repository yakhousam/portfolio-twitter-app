import { render, screen } from '@testing-library/react';

import BtnSearch from './btn-search';

describe('BtnSearch', () => {
  it('should render successfully', () => {
    const children = 'button text';
    render(<BtnSearch children={children} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(children);
  });
});
