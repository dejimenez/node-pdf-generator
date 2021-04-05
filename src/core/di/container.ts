import { Container } from 'inversify';

const container = new Container();

export const registerProvider = <T>(
  key: string,
  target: new (...args: any[]) => T
) => {
  container.bind<T>(key).to(target).inSingletonScope();
};

export const registerController = <T>(target: new (...args: any[]) => T) => {
  container.bind<T>(target.name).to(target).inSingletonScope();
};

export const overrideProvider = <T>(
  key: string,
  target: new (...args: any[]) => T
) => {
  container.rebind<T>(key).to(target).inSingletonScope();
};

export const get = <T>(key: string) => container.get<T>(key);
