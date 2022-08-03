import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BtnToggleTheme from './btn-toggle-theme';

describe('BtnToggleTheme', () => {
  it('should render successfully', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<BtnToggleTheme handleClick={handleClick} />);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
