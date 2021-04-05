jest.mock('inversify');

import { injectable } from 'inversify';
import { Controller, METADATA_WEB_CONTROLLER } from '../../../../src/core';
import 'reflect-metadata';

describe('Controller decorator', () => {
//   beforeAll(() => {
//   });

  it('should save metadata', () => {
    const key = 'controller-path';
    const ConstructorClass = class {};
    (injectable as any).mockImplementation(() => jest.fn);

    Controller(key)(ConstructorClass);

    expect(
      Reflect.getMetadata(METADATA_WEB_CONTROLLER, ConstructorClass.prototype)
    ).toBe(key);
    expect(injectable).toBeCalled();
  });
});
