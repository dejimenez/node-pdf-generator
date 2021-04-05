import {
  get,
  registerController,
  registerProvider,
} from '../../../../../src/core';
import {
  TEMPLATE_LIST,
  TEMPLATE_REPOSITORY,
} from '../../../../../src/app/template/constants';
import { InMemoryTemplateRepository } from '../../../../../src/app/template/infrastructure/repository/in-memory-template-repository';

import { Template } from '../../../../../src/app/template/domain/entity/template';
import { TemplateList } from '../../../../../src/app/template/application/template-list';
import { TemplateListGetController } from '../../../../../src/app/template/infrastructure/controller/template-list.get.controller';

describe('TemplateListGetController', () => {
  let templateList: TemplateList;
  let templateListGetController: TemplateListGetController;
  let templateRepository: InMemoryTemplateRepository;
  let template: Template;

  beforeAll(async () => {
    registerProvider(TEMPLATE_REPOSITORY, InMemoryTemplateRepository);
    registerProvider(TEMPLATE_LIST, TemplateList);
    registerController(TemplateListGetController);
    templateRepository = get(TEMPLATE_REPOSITORY);
    templateList = get(TEMPLATE_LIST);
    templateListGetController = get(TemplateListGetController.name);

    template = Template.create('id1', 'template1', '<p>{{name}}</p>');

    await templateRepository.create(template);
  });

  it('should be defined', () => {
    expect(templateListGetController).toBeDefined();
  });

  it('should return a template array', async () => {
    const spy = jest.spyOn(templateListGetController, 'get');

    expect(templateListGetController.get()).resolves.toEqual([template]);
  });
});
