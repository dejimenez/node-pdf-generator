import { METADATA_WEB_ROUTES } from '../constants';
import { HttpMethod } from '../enums/http-method';
import { HttpStatusCode } from '../enums/http-status-code';
import { RouteMetadata } from '../types/route-metadata';

export const Get = (
  path: string = '',
  statusCode: HttpStatusCode = HttpStatusCode.OK
): MethodDecorator => {
  return route(HttpMethod.GET, path, statusCode);
};

export const Post = (
  path: string = '',
  statusCode: HttpStatusCode = HttpStatusCode.CREATED
): MethodDecorator => {
  return route(HttpMethod.POST, path, statusCode);
};

export const Put = (
  path: string = '',
  statusCode: HttpStatusCode = HttpStatusCode.NO_CONTENT
): MethodDecorator => {
  return route(HttpMethod.PUT, path, statusCode);
};

export const Delete = (
  path: string = '',
  statusCode: HttpStatusCode = HttpStatusCode.NO_CONTENT
): MethodDecorator => {
  return route(HttpMethod.DELETE, path, statusCode);
};

const route = (
  method: HttpMethod,
  path: string = '',
  statusCode: HttpStatusCode
): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const routes = Reflect.getMetadata(METADATA_WEB_ROUTES, target) || [];
    const metadata: RouteMetadata = {
      method,
      handler: propertyKey.toString(),
      path,
      statusCode,
    };
    Reflect.defineMetadata(METADATA_WEB_ROUTES, [...routes, metadata], target);

    return descriptor;
  };
};
