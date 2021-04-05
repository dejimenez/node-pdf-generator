import { Inject, Injectable } from '../../../core';
import { TemplateNotFoundError } from '../../shared/application/errors/template-not-found.error';
import { TEMPLATE_REPOSITORY } from '../constants';
import { Template } from '../domain/entity/template';
import { TemplateRepository } from '../domain/repository/template-repository';

@Injectable()
export class TemplateFindById {
  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly templateRepository: TemplateRepository
  ) {}

  async find(id: string): Promise<Template> {
    const template = await this.templateRepository.findById(id);
    if (!template) {
      throw new TemplateNotFoundError(id);
    }

    return template;
  }
}
