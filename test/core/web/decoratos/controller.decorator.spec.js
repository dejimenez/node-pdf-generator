"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock('inversify');
const inversify_1 = require("inversify");
const core_1 = require("../../../../src/core");
require("reflect-metadata");
describe('Controller decorator', () => {
    it('should save metadata', () => {
        const key = 'controller-path';
        const ConstructorClass = class {
        };
        inversify_1.injectable.mockImplementation(() => jest.fn);
        core_1.Controller(key)(ConstructorClass);
        expect(Reflect.getMetadata(core_1.METADATA_WEB_CONTROLLER, ConstructorClass.prototype)).toBe(key);
        expect(inversify_1.injectable).toBeCalled();
    });
});
