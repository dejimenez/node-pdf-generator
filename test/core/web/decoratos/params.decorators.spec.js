"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../../../src/core");
describe('Params decorator', () => {
    describe('Body decorator', () => {
        it('should generate body param metadata', () => {
            const key = 'body-param';
            const target = {};
            const method = 'method';
            const parameterIndex = 0;
            core_1.Body(key)(target, method, parameterIndex);
            expect(Reflect.getMetadata(core_1.METADATA_WEB_PARAMS, target, method)).toEqual([
                {
                    position: core_1.ParamPosition.BODY,
                    parameterIndex,
                    key,
                },
            ]);
        });
    });
    describe('Param decorator', () => {
        it('should generate body param metadata', () => {
            const key = 'param-param';
            const target = {};
            const method = 'method';
            const parameterIndex = 0;
            core_1.Param(key)(target, method, parameterIndex);
            expect(Reflect.getMetadata(core_1.METADATA_WEB_PARAMS, target, method)).toEqual([
                {
                    position: core_1.ParamPosition.PARAM,
                    parameterIndex,
                    key,
                },
            ]);
        });
    });
    describe('Query decorator', () => {
        it('should generate body param metadata', () => {
            const key = 'query-param';
            const target = {};
            const method = 'method';
            const parameterIndex = 0;
            core_1.Query(key)(target, method, parameterIndex);
            expect(Reflect.getMetadata(core_1.METADATA_WEB_PARAMS, target, method)).toEqual([
                {
                    position: core_1.ParamPosition.QUERYSTRING,
                    parameterIndex,
                    key,
                },
            ]);
        });
    });
});
