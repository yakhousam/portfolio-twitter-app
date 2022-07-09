import { render } from '@testing-library/react';

import RateLimit from './rate-limit-section';

import { InfoProps } from '../../components/info/info';

const data: InfoProps[] = [
  { title: 'limit', info: 450 },
  { title: 'remaning', info: 200 },
];

const title = 'my title';

describe('RateLimit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RateLimit />);
    expect(baseElement).toBeTruthy();
  });
});
