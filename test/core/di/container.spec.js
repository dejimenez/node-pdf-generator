"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const to = jest.fn();
const bind = jest.fn();
const g = jest.fn();
const rebind = jest.fn().mockImplementation(() => {
    return { to };
});
jest.mock('inversify', () => {
    return {
        Container: class {
            constructor() {
                this.bind = bind;
                this.rebind = rebind;
                this.get = g;
            }
        },
    };
});
const core_1 = require("../../../src/core");
const PROVIDER = 'PROVIDER';
class Provider {
}
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
            core_1.registerProvider(PROVIDER, Provider);
            expect(bind).toBeCalledWith(PROVIDER);
            expect(to).toBeCalledWith(Provider);
        });
    });
    describe('registerController', () => {
        it('should', () => {
            core_1.registerController(Provider);
            expect(bind).toBeCalledWith(Provider.name);
            expect(to).toBeCalledWith(Provider);
        });
    });
    describe('overrideProvider', () => {
        it('should', () => {
            core_1.overrideProvider(PROVIDER, Provider);
            expect(rebind).toBeCalledWith(PROVIDER);
            expect(to).toBeCalledWith(Provider);
        });
    });
    describe('get', () => {
        it('should', () => {
            core_1.get(PROVIDER);
            expect(g).toBeCalledWith(PROVIDER);
        });
    });
});
