import { HttpMethod } from '../enums/http-method';
import { HttpStatusCode } from '../enums/http-status-code';

export interface ControllerHandler {
  path: string;
  method: HttpMethod;
  handler: string;
  paramTypes: string;
  statusCode: HttpStatusCode;
  controller: any;
}
