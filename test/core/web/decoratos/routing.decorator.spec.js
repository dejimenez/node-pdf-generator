"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../../../src/core");
const http_method_1 = require("../../../../src/core/web/enums/http-method");
describe('Routing decorator', () => {
    describe('Get decorator', () => {
        it('should generate get route metadata', () => {
            const path = 'get-route';
            const target = {};
            const propertyKey = 'method';
            const statusCode = 0;
            core_1.Get(path, statusCode)(target, propertyKey, {});
            expect(Reflect.getMetadata(core_1.METADATA_WEB_ROUTES, target)).toEqual([
                {
                    method: http_method_1.HttpMethod.GET,
                    handler: propertyKey,
                    path,
                    statusCode,
                },
            ]);
        });
    });
    describe('Post decorator', () => {
        it('should generate post route metadata', () => {
            const path = 'post-route';
            const target = {};
            const propertyKey = 'method';
            const statusCode = 0;
            core_1.Post(path, statusCode)(target, propertyKey, {});
            expect(Reflect.getMetadata(core_1.METADATA_WEB_ROUTES, target)).toEqual([
                {
                    method: http_method_1.HttpMethod.POST,
                    handler: propertyKey,
                    path,
                    statusCode,
                },
            ]);
        });
    });
    describe('Put decorator', () => {
        it('should generate put route metadata', () => {
            const path = 'put-route';
            const target = {};
            const propertyKey = 'method';
            const statusCode = 0;
            core_1.Put(path, statusCode)(target, propertyKey, {});
            expect(Reflect.getMetadata(core_1.METADATA_WEB_ROUTES, target)).toEqual([
                {
                    method: http_method_1.HttpMethod.PUT,
                    handler: propertyKey,
                    path,
                    statusCode,
                },
            ]);
        });
    });
    describe('Delete decorator', () => {
        it('should generate delete route metadata', () => {
            const path = 'delete-route';
            const target = {};
            const propertyKey = 'method';
            const statusCode = 0;
            core_1.Delete(path, statusCode)(target, propertyKey, {});
            expect(Reflect.getMetadata(core_1.METADATA_WEB_ROUTES, target)).toEqual([
                {
                    method: http_method_1.HttpMethod.DELETE,
                    handler: propertyKey,
                    path,
                    statusCode,
                },
            ]);
        });
    });
});
