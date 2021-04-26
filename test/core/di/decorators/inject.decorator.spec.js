"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock('inversify');
const core_1 = require("../../../../src/core");
const inversify_1 = require("inversify");
describe('Inject', () => {
    it('should call inject', () => {
        const key = 'key';
        core_1.Inject(key);
        expect(inversify_1.inject).toBeCalledWith(key);
    });
});
