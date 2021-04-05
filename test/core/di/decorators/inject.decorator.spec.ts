jest.mock('inversify');

import { Inject } from '../../../../src/core';
import { inject } from 'inversify';

describe('Inject', () => {
  it('should call inject', () => {
    const key = 'key';

    Inject(key);

    expect(inject).toBeCalledWith(key);
  });
});
