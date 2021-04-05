import { default as runServer } from './express/server/express.server';
import { dbConnect } from './db/mongodb';
import { LOGGER_SERVICE, registerProvider } from '../core';
import { ConsoleLoggerService } from './logger/console-logger.service';

export default async (port: number, cb: () => void) => {
  registerProvider(LOGGER_SERVICE, ConsoleLoggerService);
  await dbConnect(process.env.DB_URL!);
  runServer(port, cb);
};
