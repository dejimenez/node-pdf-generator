import {
  LOGGER_SERVICE,
  get,
  LoggerService,
  ConfigService,
  CONFIG_SERVICE,
} from './core';
import { default as startInfrastructure } from './infrastructure';
import { default as bootstrapApp } from './app';

const bootstrap = async () => {
  bootstrapApp();

  const config: ConfigService = get(CONFIG_SERVICE);
  const port = Number(config.get('PORT'));

  await startInfrastructure(port, () => {
    const logger: LoggerService = get(LOGGER_SERVICE);
    logger.info(`listening on port: ${port}`);
  });
};

bootstrap();
