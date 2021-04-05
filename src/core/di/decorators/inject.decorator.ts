import { inject } from 'inversify';
import { ServiceIdentifierOrFunc } from 'inversify/dts/annotation/inject';

export default (key: string) => {
  return inject(key as ServiceIdentifierOrFunc);
};
