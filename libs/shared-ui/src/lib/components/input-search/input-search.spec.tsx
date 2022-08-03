import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputSearch from './input-search';

describe('InputSearch', () => {
  it('should render successfully', () => {
    const handleChange = jest.fn();
    const value = 'nasa';
    render(<InputSearch value={value} handleChange={handleChange} />);
    const inputSearch = screen.getByRole('searchbox');
    expect(inputSearch).toHaveProperty('value', value);
  });
  it('should change value', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const value = 'nasa';
    render(<InputSearch value={value} handleChange={handleChange} />);
    const inputSearch = screen.getByRole('searchbox');
    await user.clear(inputSearch);
    const newValue = 'JavaScript';
    await user.type(inputSearch, newValue);
    expect(handleChange).toHaveBeenCalledTimes(newValue.length + 1); // +1 because we cleared the input
  });
});
