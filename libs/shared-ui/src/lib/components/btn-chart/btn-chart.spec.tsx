import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BtnChart from './btn-chart';

describe('BtnChart', () => {
  it('should render successfully', async () => {
    const caption = 'my button';
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(<BtnChart caption={caption} handleClick={handleClick} active />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(caption);
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
