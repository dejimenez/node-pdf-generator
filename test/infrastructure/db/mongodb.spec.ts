import { connection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { dbConnect } from '../../../src/infrastructure/db/mongodb';
import {
  Injectable,
  LOGGER_SERVICE,
  registerProvider,
} from '../../../src/core';

const mongodb = new MongoMemoryServer();

@Injectable()
class MockLoggerService {
  info = jest.fn();
}

describe('dbConnect', () => {
  beforeAll(() => {
    registerProvider(LOGGER_SERVICE, MockLoggerService);
  });

  it('should stablish db connection', async () => {
    const connectionString = await mongodb.getUri();
    await dbConnect(connectionString);

    expect(connection.readyState).toBe(1);
  });

  afterAll(async () => {
    await connection.close();
    await mongodb.stop();
  });
});
