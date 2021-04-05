import { Inject, Injectable } from '../../../core';
import { TemplateNotFoundError } from '../../shared/application/errors/template-not-found.error';
import { TEMPLATE_REPOSITORY } from '../../template';
import { TemplateRepository } from '../../template/domain/repository/template-repository';
import {
  PDF_GENERATOR_ENGINE,
  PDF_GENERATOR_TEMPLATE_ENGINE,
} from '../constants';
import { PdfGeneratorEngine } from '../domain/service/pdf-generator-engine';
import { TemplateEngine } from '../domain/service/template-engine';

@Injectable()
export class GeneratePdfFromTemplate {
  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly templateRepository: TemplateRepository,
    @Inject(PDF_GENERATOR_TEMPLATE_ENGINE)
    private readonly templateEngine: TemplateEngine,
    @Inject(PDF_GENERATOR_ENGINE)
    private readonly pdfGeneratorEngine: PdfGeneratorEngine
  ) {}

  async generate(templateId: string, data: any): Promise<Buffer> {
    const template = await this.templateRepository.findById(templateId);

    if (!template) throw new TemplateNotFoundError(templateId);

    const builtHtml = this.templateEngine.build(template.html, data);
    return this.pdfGeneratorEngine.generate(builtHtml, template.paperFormat);
  }
}
