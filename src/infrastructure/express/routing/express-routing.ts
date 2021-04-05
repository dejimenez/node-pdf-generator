import { Request, Response, Router } from 'express';

import {
  ControllerHandler,
  controllers,
  get,
  LoggerService,
  ParamMetadata,
  RouteMetadata,
  ParamPosition,
  HttpError,
  LOGGER_SERVICE,
  METADATA_DESIGN_PARAM_TYPES,
  METADATA_WEB_CONTROLLER,
  METADATA_WEB_PARAMS,
  METADATA_WEB_ROUTES,
} from '../../../core';

const getControllerHandlers = (): ControllerHandler[] => {
  return controllers.reduce((handlers: any[], controller: string) => {
    const controllerObj: any = get(controller);
    const routes = Reflect.getMetadata(METADATA_WEB_ROUTES, controllerObj);
    if (!routes) return handlers;

    const controllerPath = Reflect.getMetadata(
      METADATA_WEB_CONTROLLER,
      controllerObj
    );

    return [...handlers, ...mapRoutes(routes, controllerPath, controllerObj)];
  }, []);
};

const routePathCheck = (path: string) =>
  path.startsWith('/') ? path : `/${path}`;

const mapRoutes = (
  routes: RouteMetadata[],
  controllerPath: string,
  controller: any
): ControllerHandler[] =>
  routes.map((route: RouteMetadata) => ({
    ...route,
    path: `${routePathCheck(controllerPath)}${routePathCheck(route.path)}`,
    handler: route.handler,
    paramTypes: Reflect.getMetadata(
      METADATA_DESIGN_PARAM_TYPES,
      controller,
      route.handler
    ),
    controller,
  }));

const getParamsValues = (
  controllerHandler: ControllerHandler,
  req: Request
) => {
  const { controller, handler } = controllerHandler;
  const paramMetadata: ParamMetadata[] =
    Reflect.getMetadata(METADATA_WEB_PARAMS, controller, handler) || [];
  return paramMetadata.reduce((p: any[], param: ParamMetadata) => {
    return [...p, extractParamFromRequest(param, req)];
  }, []);
};

const extractParamFromRequest = (param: ParamMetadata, req: Request) => {
  let params: Record<string, any> = {};
  if (param.position === ParamPosition.BODY) params = req.body;
  else if (param.position === ParamPosition.QUERYSTRING) params = req.query;
  else if (param.position === ParamPosition.PARAM) params = req.params;

  const value = param.key ? params[param.key] : params;
  return value;
};

const executeHandler = (controllerHandler: ControllerHandler) => {
  return async (req: Request, res: Response) => {
    try {
      const { controller, handler, statusCode } = controllerHandler;
      const params = getParamsValues(controllerHandler, req);

      const handlerResult = controller[handler].call(controller, ...params);
      const result =
        handlerResult instanceof Promise ? await handlerResult : handlerResult;
      return res.status(statusCode).send(result);
    } catch (error) {
      const logger: LoggerService = get(LOGGER_SERVICE);
      logger.error(error);

      let status = 500;
      let message = 'Internal Server Error';
      if (error instanceof HttpError) {
        status = error.statusCode;
        message = error.message;
      }

      return res.status(status).send({ message, success: false });
    }
  };
};

export default (): Router => {
  const router = Router();
  const controllersHandlers = getControllerHandlers();
  controllersHandlers.forEach((handler: ControllerHandler) => {
    router[handler.method](handler.path, executeHandler(handler));
  });

  return router;
};
