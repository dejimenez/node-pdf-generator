import { get, registerProvider } from '../../../../src/core';
import {
  TEMPLATE_REPOSITORY,
  TEMPLATE_UPDATE,
} from '../../../../src/app/template/constants';
import { InMemoryTemplateRepository } from '../../../../src/app/template/infrastructure/repository/in-memory-template-repository';
import { TemplateUpdate } from '../../../../src/app/template/application/template-update';
import { Template } from '../../../../src/app/template/domain/entity/template';
import { PartialWithId } from '../../../../src/app/shared/domain/partial-with-id';
import { TemplateNotFoundError } from '../../../../src/app/shared/application/errors/template-not-found.error';

describe('TemplateUpdate', () => {
  let templateUpdate: TemplateUpdate;
  let templateRepository: InMemoryTemplateRepository;
  let template: Template;

  beforeAll(async () => {
    registerProvider(TEMPLATE_REPOSITORY, InMemoryTemplateRepository);
    registerProvider(TEMPLATE_UPDATE, TemplateUpdate);
    templateUpdate = get(TEMPLATE_UPDATE);
    templateRepository = get(TEMPLATE_REPOSITORY);

    template = Template.create('id1', 'template1', '<p>{{name}}</p>');
    await templateRepository.create(template);
  });

  it('should be defined', () => {
    expect(templateUpdate).toBeDefined();
  });

  it('should update a template', async () => {
    const spy = jest.spyOn(templateRepository, 'update');
    const updateTemplate: PartialWithId<Template> = {
      id: 'id1',
      name: 'template1 updated',
    };

    await templateUpdate.update(updateTemplate);

    expect(spy).toBeCalledWith(updateTemplate);
    expect(templateRepository.findById(updateTemplate.id)).resolves.toEqual({
      ...template,
      ...updateTemplate,
    });
  });

  it('should throw when not found', async () => {
    const updateTemplate: PartialWithId<Template> = {
      id: 'id3',
      name: 'template1 updated',
    };

    expect(templateUpdate.update(updateTemplate)).rejects.toThrow(
      TemplateNotFoundError
    );
  });
});
