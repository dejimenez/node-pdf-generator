import { injectable } from 'inversify';
import 'reflect-metadata';

import { METADATA_WEB_CONTROLLER } from '../constants';

export const controllers: string[] = [];

export default (key: string) => {
  const injectableDecorator = injectable();
  return <T extends { new (...args: any[]): {} }>(target: T) => {
    controllers.push(target.name);
    Reflect.defineMetadata(METADATA_WEB_CONTROLLER, key, target.prototype);

    return injectableDecorator(target);
  };
};
