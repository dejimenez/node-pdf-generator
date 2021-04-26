import { Inject, Injectable } from '../../../core';
import { PdfGeneratorEngine } from '../domain/service/pdf-generator-engine';
import { TemplateEngine } from '../domain/service/template-engine';
import {
  PDF_GENERATOR_TEMPLATE_ENGINE,
  PDF_GENERATOR_ENGINE,
} from '../constants';
import { PaperFormat } from '../../shared/domain/paper-format';

@Injectable()
export class GeneratePdfFromHtml {
  constructor(
    @Inject(PDF_GENERATOR_TEMPLATE_ENGINE)
    private readonly templateEngine: TemplateEngine,
    @Inject(PDF_GENERATOR_ENGINE)
    private readonly pdfGeneratorEngine: PdfGeneratorEngine
  ) {}

  async generate(
    html: string,
    data: object,
    format: PaperFormat = PaperFormat.A4
  ): Promise<Buffer> {
    const builtHtml = this.templateEngine.build(html, data);
    return this.pdfGeneratorEngine.generate(builtHtml, format);
  }
}
