import {
  Body,
  METADATA_WEB_PARAMS,
  Param,
  ParamPosition,
  Query,
} from '../../../../src/core';

describe('Params decorator', () => {
  describe('Body decorator', () => {
    it('should generate body param metadata', () => {
      const key = 'body-param';
      const target = {};
      const method = 'method';
      const parameterIndex = 0;

      Body(key)(target, method, parameterIndex);

      expect(Reflect.getMetadata(METADATA_WEB_PARAMS, target, method)).toEqual([
        {
          position: ParamPosition.BODY,
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

      Param(key)(target, method, parameterIndex);

      expect(Reflect.getMetadata(METADATA_WEB_PARAMS, target, method)).toEqual([
        {
          position: ParamPosition.PARAM,
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

      Query(key)(target, method, parameterIndex);

      expect(Reflect.getMetadata(METADATA_WEB_PARAMS, target, method)).toEqual([
        {
          position: ParamPosition.QUERYSTRING,
          parameterIndex,
          key,
        },
      ]);
    });
  });
});
