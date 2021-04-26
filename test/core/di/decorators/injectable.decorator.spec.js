"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock('inversify');
const core_1 = require("../../../../src/core");
const inversify_1 = require("inversify");
describe('Injectable', () => {
    it('should call injectable', () => {
        core_1.Injectable();
        expect(inversify_1.injectable).toBeCalled();
    });
});
