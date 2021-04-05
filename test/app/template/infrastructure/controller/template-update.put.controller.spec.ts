import { get, registerProvider } from '../../../../../src/core';
import {
  TEMPLATE_REPOSITORY,
  TEMPLATE_UPDATE,
} from '../../../../../src/app/template/constants';
import { InMemoryTemplateRepository } from '../../../../../src/app/template/infrastructure/repository/in-memory-template-repository';
import { TemplateUpdate } from '../../../../../src/app/template/application/template-update';
import { Template } from '../../../../../src/app/template/domain/entity/template';
import { PartialWithId } from '../../../../../src/app/shared/domain/partial-with-id';
import { TemplateNotFoundError } from '../../../../../src/app/shared/application/errors/template-not-found.error';
import { TemplateUpdatePutController } from '../../../../../src/app/template/infrastructure/controller/template-update.put.controller';
import { registerController } from '../../../../../src/core';

describe('TemplateCreate', () => {
  let templateUpdate: TemplateUpdate;
  let templateUpdatePutController: TemplateUpdatePutController;
  let templateRepository: InMemoryTemplateRepository;
  let template: Template;

  beforeAll(async () => {
    registerProvider(TEMPLATE_REPOSITORY, InMemoryTemplateRepository);
    registerProvider(TEMPLATE_UPDATE, TemplateUpdate);
    registerController(TemplateUpdatePutController);
    templateUpdate = get(TEMPLATE_UPDATE);
    templateRepository = get(TEMPLATE_REPOSITORY);
    templateUpdatePutController = get(TemplateUpdatePutController.name);

    template = Template.create('id1', 'template1', '<p>{{name}}</p>');
    await templateRepository.create(template);
  });

  it('should be defined', () => {
    expect(templateUpdatePutController).toBeDefined();
  });

  it('should update a template', async () => {
    const spy = jest.spyOn(templateUpdate, 'update');
    const updateTemplate: PartialWithId<Template> = {
      id: 'id1',
      name: 'template1 updated',
    };

    await templateUpdatePutController.put(updateTemplate);

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
