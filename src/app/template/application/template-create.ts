import { Inject, Injectable } from '../../../core';
import { TEMPLATE_REPOSITORY } from '../constants';
import { Template } from '../domain/entity/template';
import { TemplateRepository } from '../domain/repository/template-repository';

@Injectable()
export class TemplateCreate {
  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly templateRepository: TemplateRepository
  ) {}

  create(template: Template): Promise<void> {
    return this.templateRepository.create(template);
  }
}
