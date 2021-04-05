import { Inject, Injectable } from '../../../core';
import { TEMPLATE_REPOSITORY } from '../constants';
import { Template } from '../domain/entity/template';
import { TemplateRepository } from '../domain/repository/template-repository';

@Injectable()
export class TemplateList {
  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly templateRepository: TemplateRepository
  ) {}

  getAllTemplates(): Promise<Template[]> {
    return this.templateRepository.list();
  }
}
