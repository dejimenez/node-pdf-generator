import { Router, Request } from 'express';
import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Post,
  registerController,
  get,
} from '../../../../src/core';
import { default as routing } from '../../../../src/infrastructure/express/routing/express-routing';

@Controller('controller-path')
class ControllerClass {
  @Get('route-get-path')
  get() {}

  @Post('route-post-path/:param')
  post(
    @Body() bodyParam: any,
    @Param() pathParam: any,
    @Query() queryParam: any
  ) {}
}

describe('', () => {
  let expressRouter: Router;
  let controller: ControllerClass;

  beforeAll(() => {
    registerController(ControllerClass);
    controller = get(ControllerClass.name);

    expressRouter = routing();
  });

  it('should create decorated routes', () => {
    expect(expressRouter.stack[0].route.path).toBe(
      '/controller-path/route-get-path'
    );
    expect(expressRouter.stack[0].route.methods.get).toBe(true);
    expect(expressRouter.stack[1].route.path).toBe(
      '/controller-path/route-post-path/:param'
    );
    expect(expressRouter.stack[1].route.methods.post).toBe(true);
  });

//   it('should extract params', () => {
//     const spy = jest.spyOn(controller, 'post');
//     const req = {
//       url: '',
//       body: { a: 'a' },
//       query: { b: 'b' },
//       params: { c: 'c' },
//     };
//     const res = {
//       status: jest.fn().mockImplementation(() => ({ send: jest.fn() })),
//     };
//     console.log('expressRouter', expressRouter.stack[1]);

//     expressRouter.stack[1].handle();

//     expect(spy).toBeCalledWith(req.body, req.params, req.query);
//   });
});
