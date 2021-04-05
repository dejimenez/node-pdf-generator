import { injectable } from 'inversify';
import 'reflect-metadata';

import { LoggerService } from '../../core';

@injectable()
export class ConsoleLoggerService implements LoggerService {
  info(message: string) {
    console.log(message);
  }

  error(message: string) {
    console.error(message);
  }
}
