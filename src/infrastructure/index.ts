import { default as runServer } from './express/server/express.server';
import { dbConnect } from './db/mongodb';
import {
  ConfigService,
  CONFIG_SERVICE,
  get,
  LOGGER_SERVICE,
  registerProvider,
} from '../core';
import { ConsoleLoggerService } from './logger/console-logger.service';

export default async (port: number, cb: () => void) => {
  registerProvider(LOGGER_SERVICE, ConsoleLoggerService);

  const configService: ConfigService = get(CONFIG_SERVICE);
  await dbConnect(configService.get('DB_URL'));
  
  runServer(port, cb);
};
