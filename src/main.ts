import { LOGGER_SERVICE, get, LoggerService } from './core';
import { default as startInfrastructure } from './infrastructure';
import { default as bootstrapApp } from './app';

const bootstrap = async () => {
  bootstrapApp();

  const port = Number(process.env.PORT);
  await startInfrastructure(port, () => {
    const logger: LoggerService = get(LOGGER_SERVICE);
    logger.info(`listening on port: ${port}`);
  });
};

bootstrap();
