import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputDate from './input-date';

describe('InputDate', () => {
  it('should render successfully', () => {
    const label = 'my label';
    const date = '2022-08-03';
    const handleChange = jest.fn();
    render(<InputDate label={label} value={date} onChange={handleChange} />);
    const datePicker = screen.getByLabelText(label);
    expect(datePicker).toHaveAttribute('value', date);
  });
  it('should change input value when onChange is called', async () => {
    const user = userEvent.setup();
    const label = 'my label';
    const date = '2022-08-03';
    const handleChange = jest.fn();
    render(<InputDate label={label} value={date} onChange={handleChange} />);
    const datePicker = screen.getByLabelText(label);
    const newDate = '2022-09-01';
    await user.clear(datePicker);
    await user.type(datePicker, newDate);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
