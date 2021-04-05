import { get, registerProvider } from '../../../../src/core';
import {
  TEMPLATE_FIND_BY_ID,
  TEMPLATE_REPOSITORY,
} from '../../../../src/app/template/constants';
import { InMemoryTemplateRepository } from '../../../../src/app/template/infrastructure/repository/in-memory-template-repository';
import { Template } from '../../../../src/app/template/domain/entity/template';
import { TemplateNotFoundError } from '../../../../src/app/shared/application/errors/template-not-found.error';
import { TemplateFindById } from '../../../../src/app/template/application/template-find-by-id';

describe('TemplateFindById', () => {
  let templateFindById: TemplateFindById;
  let templateRepository: InMemoryTemplateRepository;
  let template: Template;

  beforeAll(async () => {
    registerProvider(TEMPLATE_REPOSITORY, InMemoryTemplateRepository);
    registerProvider(TEMPLATE_FIND_BY_ID, TemplateFindById);
    templateFindById = get(TEMPLATE_FIND_BY_ID);
    templateRepository = get(TEMPLATE_REPOSITORY);

    template = Template.create('id1', 'template1', '<p>{{name}}</p>');
    await templateRepository.create(template);
  });

  it('should be defined', () => {
    expect(templateFindById).toBeDefined();
  });

  it('should find a template', async () => {
    const spy = jest.spyOn(templateRepository, 'findById');
    const id = 'id1';

    const found = await templateFindById.find(id);

    expect(spy).toBeCalledWith(id);
    expect(found).toEqual(template);
  });

  it('should throw when not found', async () => {
    const id = 'id3';

    expect(templateFindById.find(id)).rejects.toThrow(TemplateNotFoundError);
  });
});
