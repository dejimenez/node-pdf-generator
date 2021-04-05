const to = jest.fn();
const bind = jest.fn();
const g = jest.fn();

const rebind = jest.fn().mockImplementation(() => {
  return { to };
});


jest.mock('inversify', () => {
  return {
    Container: class {
      bind = bind;
      rebind = rebind;
      get = g;
    },
  };
});
import {
  registerProvider,
  registerController,
  overrideProvider,
  get,
} from '../../../src/core';

const PROVIDER = 'PROVIDER';

class Provider {}

describe('DI Container', () => {
  beforeEach(() => {
    bind.mockReset().mockImplementation(() => {
      return { to };
    });

    to.mockReset().mockImplementation(() => {
      return { inSingletonScope: jest.fn() };
    });
  });

  describe('registerProvider', () => {
    it('should', () => {
      registerProvider(PROVIDER, Provider);

      expect(bind).toBeCalledWith(PROVIDER);
      expect(to).toBeCalledWith(Provider);
    });
  });

  describe('registerController', () => {
    it('should', () => {
      registerController(Provider);

      expect(bind).toBeCalledWith(Provider.name);
      expect(to).toBeCalledWith(Provider);
    });
  });

  describe('overrideProvider', () => {
    it('should', () => {
      overrideProvider(PROVIDER, Provider);

      expect(rebind).toBeCalledWith(PROVIDER);
      expect(to).toBeCalledWith(Provider);
    });
  });

  describe('get', () => {
    it('should', () => {
      get(PROVIDER);

      expect(g).toBeCalledWith(PROVIDER);
    });
  });
});
