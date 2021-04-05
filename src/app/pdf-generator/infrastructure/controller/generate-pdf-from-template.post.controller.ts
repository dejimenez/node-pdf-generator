import { Post, Body, Inject, Controller } from '../../../../core';
import { GeneratePdfFromTemplate } from '../../application/generate-pdf-from-template';
import { PDF_GENERATOR_GENERATE_FROM_TEMPLATE } from '../../constants';

@Controller('generate-pdf')
export class GeneratePdfFromTemplatePostController {
  constructor(
    @Inject(PDF_GENERATOR_GENERATE_FROM_TEMPLATE)
    private readonly generatePdfFromTemplate: GeneratePdfFromTemplate
  ) {}

  @Post('template')
  post(
    @Body('templateId') templateId: string,
    @Body('data') data: any
  ): Promise<Buffer> {
    return this.generatePdfFromTemplate.generate(templateId, data);
  }
}
