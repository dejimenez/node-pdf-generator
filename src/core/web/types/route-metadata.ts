import { HttpMethod } from '../enums/http-method';
import { HttpStatusCode } from '../enums/http-status-code';

export interface RouteMetadata {
  method: HttpMethod;
  handler: string;
  path: string;
  statusCode: HttpStatusCode;
}
