jest.mock('inversify');

import { Injectable } from '../../../../src/core';
import { injectable } from 'inversify';

describe('Injectable', () => {
  it('should call injectable', () => {
    Injectable();
    expect(injectable).toBeCalled();
  });
});
