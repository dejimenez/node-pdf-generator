const use = jest.fn();
const listen = jest.fn();
const expressDefault: any = jest
  .fn()
  .mockImplementation(() => ({ use, listen }));
expressDefault['json'] = jest.fn();
jest.mock('express', () => {
  return expressDefault;
});
jest.mock('../../../../src/infrastructure/express/routing/express-routing');

import { default as express } from 'express';
import { default as routing } from '../../../../src/infrastructure/express/routing/express-routing';
import { default as runServer } from '../../../../src/infrastructure/express/server/express.server';

describe('', () => {
  it('should start the server', () => {
    const port = 3000;
    const cb = jest.fn();

    runServer(port, cb);

    expect(express).toBeCalled();
    expect(routing).toBeCalled();
    expect(expressDefault['json']).toBeCalled();
    expect(use).toBeCalledTimes(2);
    expect(listen).toBeCalledWith(port, cb);
  });
});
