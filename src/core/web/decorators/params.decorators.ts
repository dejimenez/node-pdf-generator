import { METADATA_WEB_PARAMS } from '../constants';
import { ParamPosition } from '../enums/param-position';

export const Body = (key: string = ''): ParameterDecorator => {
  return paramDecorator(key, ParamPosition.BODY);
};

export const Param = (key: string = ''): ParameterDecorator => {
  return paramDecorator(key, ParamPosition.PARAM);
};

export const Query = (key: string = ''): ParameterDecorator => {
  return paramDecorator(key, ParamPosition.QUERYSTRING);
};

const paramDecorator = (key: string, position: ParamPosition) => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    setParamMetadata(position, parameterIndex, key, target, propertyKey);
  };
};

const setParamMetadata = (
  position: ParamPosition,
  parameterIndex: number,
  key: string,
  target: Object,
  propertyKey: string | symbol
) => {
  const meta =
    Reflect.getMetadata(METADATA_WEB_PARAMS, target, propertyKey) || [];
  Reflect.defineMetadata(
    METADATA_WEB_PARAMS,
    [{ position, parameterIndex, key }, ...meta],
    target,
    propertyKey
  );
};
