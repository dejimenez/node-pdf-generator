import { get, registerProvider } from '../../../../../src/core';

import { registerController } from '../../../../../src/core';
import {
  PDF_GENERATOR_ENGINE,
  PDF_GENERATOR_GENERATE_FROM_HTML,
  PDF_GENERATOR_TEMPLATE_ENGINE,
} from '../../../../../src/app/pdf-generator/constants';
import { HandlebarsTemplateEngine } from '../../../../../src/app/pdf-generator/infrastructure/service/handlebars-template-engine';
import { PuppeteerPdfGeneratorEngine } from '../../../../../src/app/pdf-generator/infrastructure/service/puppeteer-pdf-generator-engine';
import { GeneratePdfFromHtmlPostController } from '../../../../../src/app/pdf-generator/infrastructure/controller/generate-pdf-from-html.post.controller';
import { GeneratePdfFromHtml } from '../../../../../src/app/pdf-generator/application/generate-pdf-from-html';

describe('GeneratePdfFromHtmlPostController', () => {
  let generatePdfFromHtmlPostController: GeneratePdfFromHtmlPostController;
  let generatePdfFromHtml: GeneratePdfFromHtml;

  beforeAll(() => {
    registerProvider(PDF_GENERATOR_TEMPLATE_ENGINE, HandlebarsTemplateEngine);
    registerProvider(PDF_GENERATOR_ENGINE, PuppeteerPdfGeneratorEngine);
    registerProvider(PDF_GENERATOR_GENERATE_FROM_HTML, GeneratePdfFromHtml);
    registerController(GeneratePdfFromHtmlPostController);
    generatePdfFromHtml = get(PDF_GENERATOR_GENERATE_FROM_HTML);
    generatePdfFromHtmlPostController = get(
      GeneratePdfFromHtmlPostController.name
    );
  });

  it('should be defined', () => {
    expect(generatePdfFromHtmlPostController).toBeDefined();
  });

  it('should create a template', async () => {
    const pdf = Buffer.from('pdf');
    const data = { name: 'Name' };
    const html = '<p>{{name}}</p>';

    const spy = jest
      .spyOn(generatePdfFromHtml, 'generate')
      .mockImplementation(() => Promise.resolve(pdf));

    const result = await generatePdfFromHtmlPostController.post(html, data);

    expect(spy).toBeCalledWith(html, data);
    expect(result).toBe(pdf);
  });
});
