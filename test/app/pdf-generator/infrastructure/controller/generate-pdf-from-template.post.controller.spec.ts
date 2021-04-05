import { get, registerProvider } from '../../../../../src/core';
import { TEMPLATE_REPOSITORY } from '../../../../../src/app/template/constants';
import { InMemoryTemplateRepository } from '../../../../../src/app/template/infrastructure/repository/in-memory-template-repository';

import { Template } from '../../../../../src/app/template/domain/entity/template';
import { registerController } from '../../../../../src/core';
import { GeneratePdfFromTemplatePostController } from '../../../../../src/app/pdf-generator/infrastructure/controller/generate-pdf-from-template.post.controller';
import {
  PDF_GENERATOR_ENGINE,
  PDF_GENERATOR_GENERATE_FROM_TEMPLATE,
  PDF_GENERATOR_TEMPLATE_ENGINE,
} from '../../../../../src/app/pdf-generator/constants';
import { GeneratePdfFromTemplate } from '../../../../../src/app/pdf-generator/application/generate-pdf-from-template';
import { HandlebarsTemplateEngine } from '../../../../../src/app/pdf-generator/infrastructure/service/handlebars-template-engine';
import { PuppeteerPdfGeneratorEngine } from '../../../../../src/app/pdf-generator/infrastructure/service/puppeteer-pdf-generator-engine';
import { PaperFormat } from '../../../../../src/app/shared/domain/paper-format';

describe('GeneratePdfFromTemplatePostController', () => {
  let generatePdfFromTemplatePostController: GeneratePdfFromTemplatePostController;
  let generatePdfFromTemplate: GeneratePdfFromTemplate;
  let templateRepository: InMemoryTemplateRepository;
  let template: Template;

  beforeAll(async () => {
    registerProvider(TEMPLATE_REPOSITORY, InMemoryTemplateRepository);
    registerProvider(PDF_GENERATOR_TEMPLATE_ENGINE, HandlebarsTemplateEngine);
    registerProvider(PDF_GENERATOR_ENGINE, PuppeteerPdfGeneratorEngine);
    registerProvider(
      PDF_GENERATOR_GENERATE_FROM_TEMPLATE,
      GeneratePdfFromTemplate
    );
    registerController(GeneratePdfFromTemplatePostController);
    generatePdfFromTemplate = get(PDF_GENERATOR_GENERATE_FROM_TEMPLATE);
    generatePdfFromTemplatePostController = get(
      GeneratePdfFromTemplatePostController.name
    );
    templateRepository = get(TEMPLATE_REPOSITORY);

    template = Template.create(
      'id1',
      'template1',
      '<p>{{name}}</p>',
      PaperFormat.LEDGER
    );
    await templateRepository.create(template);
  });

  it('should be defined', () => {
    expect(generatePdfFromTemplatePostController).toBeDefined();
  });

  it('should create a template', async () => {
    const pdf = Buffer.from('pdf');
    const data = { name: 'Name' };

    const spy = jest
      .spyOn(generatePdfFromTemplate, 'generate')
      .mockImplementation(() => Promise.resolve(pdf));

    const result = await generatePdfFromTemplatePostController.post(
      template.id,
      data
    );

    expect(spy).toBeCalledWith(template.id, data);
    expect(result).toBe(pdf);
  });
});
