import { Injectable } from '../../core';

@Injectable()
export class ConfigService {
  get(key: string): string {
    const value = process.env[key];
    
    if (!value) throw new Error('Key not found in .env file');

    return value;
  }
}
