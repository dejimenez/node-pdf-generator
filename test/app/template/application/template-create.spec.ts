import { TemplateCreate } from '../../../../src/app/template/application/template-create';
import {
  get,
  registerProvider,
} from '../../../../src/core';
import {
  TEMPLATE_CREATE,
  TEMPLATE_REPOSITORY,
} from '../../../../src/app/template/constants';
import { InMemoryTemplateRepository } from '../../../../src/app/template/infrastructure/repository/in-memory-template-repository';

import { Template } from '../../../../src/app/template/domain/entity/template';

describe('TemplateCreate', () => {
  let templateCreator: TemplateCreate;
  let templateRepository: InMemoryTemplateRepository;

  beforeAll(() => {
    registerProvider(TEMPLATE_REPOSITORY, InMemoryTemplateRepository);
    registerProvider(TEMPLATE_CREATE, TemplateCreate);
    templateCreator = get(TEMPLATE_CREATE);
    templateRepository = get(TEMPLATE_REPOSITORY);
  });

  it('should be defined', () => {
    expect(templateCreator).toBeDefined();
  });

  it('should create a template', async () => {
    const spy = jest.spyOn(templateRepository, 'create');
    const template: Template = Template.create(
      'id1',
      'template1',
      '<p>{{name}}</p>'
    );

    await templateCreator.create(template);

    expect(spy).toBeCalledWith(template);
    expect(templateRepository.findById(template.id)).resolves.toEqual(template);
  });
});
