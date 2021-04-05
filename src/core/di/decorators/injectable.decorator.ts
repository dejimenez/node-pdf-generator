import { injectable } from 'inversify';
import 'reflect-metadata';

export default (): ClassDecorator => {
  return injectable();
};
