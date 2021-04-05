import { connect } from 'mongoose';
import { get, LoggerService, LOGGER_SERVICE } from '../../core';

export const dbConnect = async (connectionString: string) => {
  await connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  const logger: LoggerService = get(LOGGER_SERVICE);
  logger.info('Database connected');
};
