import {
  get,
  registerController,
  registerProvider,
} from '../../../../../src/core';
import {
  TEMPLATE_FIND_BY_ID,
  TEMPLATE_REPOSITORY,
} from '../../../../../src/app/template/constants';
import { InMemoryTemplateRepository } from '../../../../../src/app/template/infrastructure/repository/in-memory-template-repository';
import { Template } from '../../../../../src/app/template/domain/entity/template';
import { TemplateNotFoundError } from '../../../../../src/app/shared/application/errors/template-not-found.error';
import { TemplateFindById } from '../../../../../src/app/template/application/template-find-by-id';
import { TemplateFindByIdGetController } from '../../../../../src/app/template/infrastructure/controller/template-find-by-id.get.controller';

describe('TemplateFindByIdGetController', () => {
  let templateFindById: TemplateFindById;
  let templateFindByIdGetController: TemplateFindByIdGetController;
  let templateRepository: InMemoryTemplateRepository;
  let template: Template;

  beforeAll(async () => {
    registerProvider(TEMPLATE_REPOSITORY, InMemoryTemplateRepository);
    registerProvider(TEMPLATE_FIND_BY_ID, TemplateFindById);
    registerController(TemplateFindByIdGetController);
    templateRepository = get(TEMPLATE_REPOSITORY);
    templateFindById = get(TEMPLATE_FIND_BY_ID);
    templateFindByIdGetController = get(TemplateFindByIdGetController.name);

    template = Template.create('id1', 'template1', '<p>{{name}}</p>');
    await templateRepository.create(template);
  });

  it('should be defined', () => {
    expect(templateFindByIdGetController).toBeDefined();
  });

  it('should find a template', async () => {
    const spy = jest.spyOn(templateFindById, 'find');
    const id = 'id1';

    const found = await templateFindByIdGetController.get(id);

    expect(spy).toBeCalledWith(id);
    expect(found).toEqual(template);
  });

  it('should throw when not found', async () => {
    const id = 'id3';

    expect(templateFindByIdGetController.get(id)).rejects.toThrow(
      TemplateNotFoundError
    );
  });
});
