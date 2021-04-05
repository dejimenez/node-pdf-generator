import { get, registerProvider } from '../../../../../src/core';

import { PDF_GENERATOR_TEMPLATE_ENGINE } from '../../../../../src/app/pdf-generator/constants';
import { HandlebarsTemplateEngine } from '../../../../../src/app/pdf-generator/infrastructure/service/handlebars-template-engine';

describe('HandlebarsTemplateEngine', () => {
  let handlebarsTemplateEngine: HandlebarsTemplateEngine;

  beforeAll(async () => {
    registerProvider(PDF_GENERATOR_TEMPLATE_ENGINE, HandlebarsTemplateEngine);
    handlebarsTemplateEngine = get(PDF_GENERATOR_TEMPLATE_ENGINE);
  });

  it('should be defined', () => {
    expect(handlebarsTemplateEngine).toBeDefined();
  });

  it('should return a built html', () => {
    const data = { name: 'Name' };
    const html = '<p>{{name}}</p>';
    const htmlResult = '<p>Name</p>';

    const result = handlebarsTemplateEngine.build(html, data);

    expect(result).toBe(htmlResult);
  });
});
