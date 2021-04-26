import { registerProvider } from '../di';
import { ConfigService } from './config-service';
import { CONFIG_SERVICE } from './constants';

export { ConfigService, CONFIG_SERVICE };

registerProvider(CONFIG_SERVICE, ConfigService);
