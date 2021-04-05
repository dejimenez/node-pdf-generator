import { Inject, Injectable } from '../../../core';
import { TemplateNotFoundError } from '../../shared/application/errors/template-not-found.error';
import { PartialWithId } from '../../shared/domain/partial-with-id';
import { TEMPLATE_REPOSITORY } from '../constants';
import { Template } from '../domain/entity/template';
import { TemplateRepository } from '../domain/repository/template-repository';

@Injectable()
export class TemplateUpdate {
  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly templateRepository: TemplateRepository
  ) {}

  async update(template: PartialWithId<Template>): Promise<void> {
    const updated = await this.templateRepository.update(template);

    if(!updated) throw new TemplateNotFoundError(template.id);
  }
}
