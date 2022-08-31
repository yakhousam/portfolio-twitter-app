import { serverDb } from './server-db';

describe('serverDb', () => {
  it('should work', () => {
    expect(serverDb()).toEqual('server-db');
  });
});
