"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const use = jest.fn();
const listen = jest.fn();
const expressDefault = jest
    .fn()
    .mockImplementation(() => ({ use, listen }));
expressDefault['json'] = jest.fn();
jest.mock('express', () => {
    return expressDefault;
});
jest.mock('../../../../src/infrastructure/express/routing/express-routing');
const express_1 = __importDefault(require("express"));
const express_routing_1 = __importDefault(require("../../../../src/infrastructure/express/routing/express-routing"));
const express_server_1 = __importDefault(require("../../../../src/infrastructure/express/server/express.server"));
describe('', () => {
    it('should start the server', () => {
        const port = 3000;
        const cb = jest.fn();
        express_server_1.default(port, cb);
        expect(express_1.default).toBeCalled();
        expect(express_routing_1.default).toBeCalled();
        expect(expressDefault['json']).toBeCalled();
        expect(use).toBeCalledTimes(2);
        expect(listen).toBeCalledWith(port, cb);
    });
});
