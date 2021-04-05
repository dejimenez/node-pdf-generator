import { TEMPLATE_REPOSITORY } from '../../../../src/app/template';
import { InMemoryTemplateRepository } from '../../../../src/app/template/infrastructure/repository/in-memory-template-repository';
import { Template } from '../../../../src/app/template/domain/entity/template';

import { get, registerProvider } from '../../../../src/core';
import {
  PDF_GENERATOR_ENGINE,
  PDF_GENERATOR_GENERATE_FROM_TEMPLATE,
  PDF_GENERATOR_TEMPLATE_ENGINE,
} from '../../../../src/app/pdf-generator/constants';

import { HandlebarsTemplateEngine } from '../../../../src/app/pdf-generator/infrastructure/service/handlebars-template-engine';
import { PuppeteerPdfGeneratorEngine } from '../../../../src/app/pdf-generator/infrastructure/service/puppeteer-pdf-generator-engine';
import { PaperFormat } from '../../../../src/app/shared/domain/paper-format';
import { GeneratePdfFromTemplate } from '../../../../src/app/pdf-generator/application/generate-pdf-from-template';
import { TemplateRepository } from '../../../../src/app/template/domain/repository/template-repository';
import { TemplateNotFoundError } from '../../../../src/app/shared/application/errors/template-not-found.error';

describe('GeneratePdfFromTemplate', () => {
  let generatePdfFromTemplate: GeneratePdfFromTemplate;
  let puppeteerPdfGeneratorEngine: PuppeteerPdfGeneratorEngine;
  let handlebarsTemplateEngine: HandlebarsTemplateEngine;
  let templateRepository: TemplateRepository;
  let template: Template;

  beforeAll(async () => {
    registerProvider(TEMPLATE_REPOSITORY, InMemoryTemplateRepository);
    registerProvider(PDF_GENERATOR_TEMPLATE_ENGINE, HandlebarsTemplateEngine);
    registerProvider(PDF_GENERATOR_ENGINE, PuppeteerPdfGeneratorEngine);
    registerProvider(
      PDF_GENERATOR_GENERATE_FROM_TEMPLATE,
      GeneratePdfFromTemplate
    );

    generatePdfFromTemplate = get(PDF_GENERATOR_GENERATE_FROM_TEMPLATE);
    puppeteerPdfGeneratorEngine = get(PDF_GENERATOR_ENGINE);
    handlebarsTemplateEngine = get(PDF_GENERATOR_TEMPLATE_ENGINE);
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
    expect(generatePdfFromTemplate).toBeDefined();
  });

  it('should generate a pdf from template', async () => {
    const pdf = Buffer.from('pdf');
    const builtTemplate = '<p>Name</p>';
    const data = { name: 'Name' };

    const spyPuppeteer = jest
      .spyOn(puppeteerPdfGeneratorEngine, 'generate')
      .mockImplementation(() => Promise.resolve(pdf));
    const spyHandlebars = jest
      .spyOn(handlebarsTemplateEngine, 'build')
      .mockImplementation(() => builtTemplate);

    const result = await generatePdfFromTemplate.generate(template.id, data);

    expect(spyHandlebars).toBeCalledWith(template.html, data);
    expect(spyPuppeteer).toBeCalledWith(builtTemplate, template.paperFormat);
    expect(result).toBe(pdf);
  });

  it('should throw when template not found', async () => {
    const id = 'id3';

    expect(generatePdfFromTemplate.generate(id, {})).rejects.toThrow(
      TemplateNotFoundError
    );
  });
});
