import { get, registerProvider } from '../../../../src/core';
import {
  TEMPLATE_DELETE,
  TEMPLATE_REPOSITORY,
} from '../../../../src/app/template/constants';
import { InMemoryTemplateRepository } from '../../../../src/app/template/infrastructure/repository/in-memory-template-repository';
import { Template } from '../../../../src/app/template/domain/entity/template';
import { TemplateDelete } from '../../../../src/app/template/application/template-delete';
import { TemplateNotFoundError } from '../../../../src/app/shared/application/errors/template-not-found.error';

describe('TemplateDelete', () => {
  let templateDelete: TemplateDelete;
  let templateRepository: InMemoryTemplateRepository;
  let template: Template;

  beforeAll(async () => {
    registerProvider(TEMPLATE_REPOSITORY, InMemoryTemplateRepository);
    registerProvider(TEMPLATE_DELETE, TemplateDelete);
    templateDelete = get(TEMPLATE_DELETE);
    templateRepository = get(TEMPLATE_REPOSITORY);

    await templateRepository.create(
      Template.create('id1', 'template1', '<p>{{name}}</p>')
    );
    template = Template.create('id2', 'template1', '<p>{{name}}</p>');
    await templateRepository.create(template);
  });

  it('should be defined', () => {
    expect(templateDelete).toBeDefined();
  });

  it('should delete a template', async () => {
    const spy = jest.spyOn(templateRepository, 'delete');
    const id = 'id1';

    await templateDelete.delete(id);

    expect(spy).toBeCalledWith(id);
    expect(templateRepository.findById(id)).resolves.toEqual(null);
  });

  it('should throw when not found', async () => {
    const id = 'id3';

    expect(templateDelete.delete(id)).rejects.toThrow(TemplateNotFoundError);
  });
});
