import { TemplateCreate } from '../../../../../src/app/template/application/template-create';
import { get, registerProvider } from '../../../../../src/core';
import {
  TEMPLATE_CREATE,
  TEMPLATE_REPOSITORY,
} from '../../../../../src/app/template/constants';
import { InMemoryTemplateRepository } from '../../../../../src/app/template/infrastructure/repository/in-memory-template-repository';

import { Template } from '../../../../../src/app/template/domain/entity/template';
import { TemplateCreatePostController } from '../../../../../src/app/template/infrastructure/controller/template-create.post.controller';
import { registerController } from '../../../../../src/core';

describe('TemplateCreatePostController', () => {
  let templateCreatePostController: TemplateCreatePostController;
  let templateCreate: TemplateCreate;
  let templateRepository: InMemoryTemplateRepository;

  beforeAll(() => {
    registerProvider(TEMPLATE_REPOSITORY, InMemoryTemplateRepository);
    registerProvider(TEMPLATE_CREATE, TemplateCreate);
    registerController(TemplateCreatePostController);
    templateCreate = get(TEMPLATE_CREATE);
    templateCreatePostController = get(TemplateCreatePostController.name);
    templateRepository = get(TEMPLATE_REPOSITORY);
  });

  it('should be defined', () => {
    expect(templateCreatePostController).toBeDefined();
  });

  it('should create a template', async () => {
    const spy = jest.spyOn(templateCreate, 'create');
    const template: Template = Template.create(
      'id1',
      'template1',
      '<p>{{name}}</p>'
    );

    await templateCreatePostController.post(template);

    expect(spy).toBeCalledWith(template);
    expect(templateRepository.findById(template.id)).resolves.toEqual(template);
  });
});
