import { serverPassport } from './server-passport';

describe('serverPassport', () => {
  it('should work', () => {
    expect(serverPassport()).toEqual('server-passport');
  });
});
