import { MongooseTemplateRepository } from '../../../../../src/app/template/infrastructure/repository/mongoose-template-repository';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connection } from 'mongoose';
import { Template } from '../../../../../src/app/template/domain/entity/template';
import { PaperFormat } from '../../../../../src/app/shared/domain/paper-format';
import { dbConnect } from '../../../../../src/infrastructure/db/mongodb';
import {
  Injectable,
  LOGGER_SERVICE,
  registerProvider,
} from '../../../../../src/core';

const mongodb = new MongoMemoryServer();

@Injectable()
class MockLoggerService {
  info = jest.fn();
}

describe('MongooseTemplateRepository', () => {
  let mongooseTemplateRepository: MongooseTemplateRepository;
  const template1 = Template.create(
    'id1',
    'template1',
    '<p>{{name1}}</p>',
    'header',
    'footer',
    PaperFormat.A4
  );
  const template2 = Template.create(
    'id2',
    'template2',
    '<p>{{name2}}</p>',
    'header',
    'footer',
    PaperFormat.LETTER
  );
  const template3 = Template.create(
    'id3',
    'template3',
    '<p>{{name3}}</p>',
    'header',
    'footer',
    PaperFormat.LETTER
  );

  beforeAll(async () => {
    registerProvider(LOGGER_SERVICE, MockLoggerService);
    const connectionString = await mongodb.getUri();
    await dbConnect(connectionString);

    mongooseTemplateRepository = new MongooseTemplateRepository();
    await mongooseTemplateRepository.create(template1);
    await mongooseTemplateRepository.create(template2);
  });

  describe('list', () => {
    it('should be defined', () => {
      expect(mongooseTemplateRepository.list).toBeDefined();
    });

    it('should get list of existing Templates', async () => {
      const list = await mongooseTemplateRepository.list();
      expect(list).toEqual([template1, template2]);
    });
  });

  describe('findById', () => {
    it('should be defined', () => {
      expect(mongooseTemplateRepository.findById).toBeDefined();
    });

    it('should get a Template by id', async () => {
      const template = await mongooseTemplateRepository.findById(template1.id);
      expect(template).toEqual(template1);
    });

    it('should return null when not found', async () => {
      const found = await mongooseTemplateRepository.findById('id4');
      expect(found).toEqual(null);
    });
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(mongooseTemplateRepository.create).toBeDefined();
    });

    it('should create a new Template', async () => {
      await mongooseTemplateRepository.create(template3);
      const template = await mongooseTemplateRepository.findById(template3.id);

      expect(template).toEqual(template3);
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(mongooseTemplateRepository.update).toBeDefined();
    });

    it('should update a Template', async () => {
      let templateUpdate = Template.create(
        'id1',
        'template updated',
        '<p>{{name.updated}}</p>',
        PaperFormat.LETTER
      );
      await mongooseTemplateRepository.update(templateUpdate);
      const template = await mongooseTemplateRepository.findById(
        templateUpdate.id
      );

      expect(template).toEqual(templateUpdate);
    });

    it('should return null when not found', async () => {
      let template3 = Template.create(
        'id4',
        'template updated',
        '<p>{{name.updated}}</p>',
        PaperFormat.LETTER
      );
      const updated = await mongooseTemplateRepository.update(template3);

      expect(updated).toEqual(null);
    });
  });

  describe('delete', () => {
    it('should be defined', () => {
      expect(mongooseTemplateRepository.delete).toBeDefined();
    });

    it('should delete Template', async () => {
      await mongooseTemplateRepository.delete(template1.id);
      const list = await mongooseTemplateRepository.list();

      expect(list).toEqual([template2, template3]);
    });

    it('should return null when not found', async () => {
      const deleted = await mongooseTemplateRepository.delete('id4');
      expect(deleted).toEqual(null);
    });
  });

  afterAll(async () => {
    await connection.close();
    await mongodb.stop();
  });
});
