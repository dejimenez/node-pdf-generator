import { Inject, Injectable } from '../../../core';
import { TemplateNotFoundError } from '../../shared/application/errors/template-not-found.error';
import { TEMPLATE_REPOSITORY } from '../constants';
import { TemplateRepository } from '../domain/repository/template-repository';

@Injectable()
export class TemplateDelete {
  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly templateRepository: TemplateRepository
  ) {}

  async delete(id: string): Promise<void> {
    const deleted = await this.templateRepository.delete(id);

    if (!deleted) throw new TemplateNotFoundError(id);
  }
}
