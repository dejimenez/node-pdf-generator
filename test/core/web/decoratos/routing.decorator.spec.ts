import {
  Delete,
  Get,
  METADATA_WEB_ROUTES,
  Post,
  Put,
} from '../../../../src/core';
import { HttpMethod } from '../../../../src/core/web/enums/http-method';

describe('Routing decorator', () => {
  describe('Get decorator', () => {
    it('should generate get route metadata', () => {
      const path = 'get-route';
      const target = {};
      const propertyKey = 'method';
      const statusCode = 0;

      Get(path, statusCode)(target, propertyKey, {});

      expect(Reflect.getMetadata(METADATA_WEB_ROUTES, target)).toEqual([
        {
          method: HttpMethod.GET,
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

      Post(path, statusCode)(target, propertyKey, {});

      expect(Reflect.getMetadata(METADATA_WEB_ROUTES, target)).toEqual([
        {
          method: HttpMethod.POST,
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

      Put(path, statusCode)(target, propertyKey, {});

      expect(Reflect.getMetadata(METADATA_WEB_ROUTES, target)).toEqual([
        {
          method: HttpMethod.PUT,
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

      Delete(path, statusCode)(target, propertyKey, {});

      expect(Reflect.getMetadata(METADATA_WEB_ROUTES, target)).toEqual([
        {
          method: HttpMethod.DELETE,
          handler: propertyKey,
          path,
          statusCode,
        },
      ]);
    });
  });
});
