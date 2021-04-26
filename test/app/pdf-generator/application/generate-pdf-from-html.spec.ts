import { get, registerProvider } from '../../../../src/core';
import { GeneratePdfFromHtml } from '../../../../src/app/pdf-generator/application/generate-pdf-from-html';
import {
  PDF_GENERATOR_ENGINE,
  PDF_GENERATOR_GENERATE_FROM_HTML,
  PDF_GENERATOR_TEMPLATE_ENGINE,
} from '../../../../src/app/pdf-generator/constants';

import { HandlebarsTemplateEngine } from '../../../../src/app/pdf-generator/infrastructure/service/handlebars-template-engine';
import { PuppeteerPdfGeneratorEngine } from '../../../../src/app/pdf-generator/infrastructure/service/puppeteer-pdf-generator-engine';
import { PaperFormat } from '../../../../src/app/shared/domain/paper-format';

describe('GeneratePdfFromHtml', () => {
  let generatePdfFromHtml: GeneratePdfFromHtml;
  let puppeteerPdfGeneratorEngine: PuppeteerPdfGeneratorEngine;
  let handlebarsTemplateEngine: HandlebarsTemplateEngine;

  beforeAll(() => {
    registerProvider(PDF_GENERATOR_TEMPLATE_ENGINE, HandlebarsTemplateEngine);
    registerProvider(PDF_GENERATOR_ENGINE, PuppeteerPdfGeneratorEngine);
    registerProvider(PDF_GENERATOR_GENERATE_FROM_HTML, GeneratePdfFromHtml);

    generatePdfFromHtml = get(PDF_GENERATOR_GENERATE_FROM_HTML);
    puppeteerPdfGeneratorEngine = get(PDF_GENERATOR_ENGINE);
    handlebarsTemplateEngine = get(PDF_GENERATOR_TEMPLATE_ENGINE);
  });

  it('should be defined', () => {
    expect(generatePdfFromHtml).toBeDefined();
  });

  it('should generate a pdf from html', async () => {
    const pdf = Buffer.from('pdf');
    const builtTemplate = '<p>Name</p>';

    const spyPuppeteer = jest
      .spyOn(puppeteerPdfGeneratorEngine, 'generate')
      .mockImplementation(() => Promise.resolve(pdf));
    const spyHandlebars = jest
      .spyOn(handlebarsTemplateEngine, 'build')
      .mockImplementation(() => builtTemplate);

    const html = '<p>{{name}}</p>';
    const data = { name: 'Name' };
    const paperFormat = PaperFormat.LETTER;

    const result = await generatePdfFromHtml.generate(html, data, paperFormat);

    expect(spyHandlebars).toBeCalledWith(html, data);
    expect(spyPuppeteer).toBeCalledWith(builtTemplate, paperFormat);
    expect(result).toBe(pdf);
  });

  it('should use a default PaperFormat.A4', async () => {
    const pdf = Buffer.from('pdf');
    const builtTemplate = '<p>Name</p>';

    const spyPuppeteer = jest
      .spyOn(puppeteerPdfGeneratorEngine, 'generate')
      .mockImplementation(() => Promise.resolve(pdf));
    const spyHandlebars = jest
      .spyOn(handlebarsTemplateEngine, 'build')
      .mockImplementation(() => builtTemplate);

    const html = '<p>{{name}}</p>';
    const data = { name: 'Name' };

    const result = await generatePdfFromHtml.generate(html, data);

    expect(spyHandlebars).toBeCalledWith(html, data);
    expect(spyPuppeteer).toBeCalledWith(builtTemplate, PaperFormat.A4);
    expect(result).toBe(pdf);
  });
});
