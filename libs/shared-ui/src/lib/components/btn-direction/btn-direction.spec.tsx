import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BtnDirection from './btn-direction';

describe('BtnDirection', () => {
  it('should render successfully', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<BtnDirection handleClick={handleClick} direction="left" />);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
