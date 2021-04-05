import { get, registerProvider } from '../../../../src/core';
import {
  TEMPLATE_LIST,
  TEMPLATE_REPOSITORY,
} from '../../../../src/app/template/constants';
import { InMemoryTemplateRepository } from '../../../../src/app/template/infrastructure/repository/in-memory-template-repository';

import { Template } from '../../../../src/app/template/domain/entity/template';
import { TemplateList } from '../../../../src/app/template/application/template-list';

describe('TemplateList', () => {
  let templateList: TemplateList;
  let templateRepository: InMemoryTemplateRepository;
  let template: Template;

  beforeAll(async () => {
    registerProvider(TEMPLATE_REPOSITORY, InMemoryTemplateRepository);
    registerProvider(TEMPLATE_LIST, TemplateList);
    templateList = get(TEMPLATE_LIST);
    templateRepository = get(TEMPLATE_REPOSITORY);

    template = Template.create('id1', 'template1', '<p>{{name}}</p>');

    await templateRepository.create(template);
  });

  it('should be defined', () => {
    expect(templateList).toBeDefined();
  });

  it('should return a template array', async () => {
    const spy = jest.spyOn(templateRepository, 'list');

    expect(templateRepository.list()).resolves.toEqual([template]);
  });
});
