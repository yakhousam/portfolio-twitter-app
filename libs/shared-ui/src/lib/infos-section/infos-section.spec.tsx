import { render } from '@testing-library/react';

import InfoSection from './infos-section';

import { InfoProps } from '../info/info';

const data: InfoProps[] = [
  { title: 'limit', text: '450' },
  { title: 'remaning', text: '200' },
  { title: 'reset', text: '00:02:00' },
];

const title = 'my title';

describe('InfoSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InfoSection title={title} infos={data} />);
    expect(baseElement).toBeTruthy();
  });
});
