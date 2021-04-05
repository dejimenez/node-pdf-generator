import { get, registerController, registerProvider } from '../../../../../src/core';
import {
  TEMPLATE_DELETE,
  TEMPLATE_REPOSITORY,
} from '../../../../../src/app/template/constants';
import { InMemoryTemplateRepository } from '../../../../../src/app/template/infrastructure/repository/in-memory-template-repository';
import { Template } from '../../../../../src/app/template/domain/entity/template';
import { TemplateDelete } from '../../../../../src/app/template/application/template-delete';
import { TemplateNotFoundError } from '../../../../../src/app/shared/application/errors/template-not-found.error';
import { TemplateDeleteDeleteController } from '../../../../../src/app/template/infrastructure/controller/template-delete.delete.controller';

describe('TemplateDeleteDeleteController', () => {
  let templateDelete: TemplateDelete;
  let templateDeleteDeleteController: TemplateDeleteDeleteController;
  let templateRepository: InMemoryTemplateRepository;
  let template: Template;

  beforeAll(async () => {
    registerProvider(TEMPLATE_REPOSITORY, InMemoryTemplateRepository);
    registerProvider(TEMPLATE_DELETE, TemplateDelete);
    registerController(TemplateDeleteDeleteController);
    templateDelete = get(TEMPLATE_DELETE);
    templateRepository = get(TEMPLATE_REPOSITORY);
    templateDeleteDeleteController = get(TemplateDeleteDeleteController.name);

    await templateRepository.create(
      Template.create('id1', 'template1', '<p>{{name}}</p>')
    );
    template = Template.create('id2', 'template1', '<p>{{name}}</p>');
    await templateRepository.create(template);
  });

  it('should be defined', () => {
    expect(templateDeleteDeleteController).toBeDefined();
  });

  it('should delete a template', async () => {
    const spy = jest.spyOn(templateDelete, 'delete');
    const id = 'id1';

    await templateDeleteDeleteController.delete(id);

    expect(spy).toBeCalledWith(id);
    expect(templateRepository.findById(id)).resolves.toEqual(null);
  });

  it('should throw when not found', async () => {
    const id = 'id3';

    expect(templateDeleteDeleteController.delete(id)).rejects.toThrow(
      TemplateNotFoundError
    );
  });
});
