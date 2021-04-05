import { registerController, registerProvider } from '../../core';
import { GeneratePdfFromHtml } from './application/generate-pdf-from-html';
import { GeneratePdfFromTemplate } from './application/generate-pdf-from-template';
import {
  PDF_GENERATOR_ENGINE,
  PDF_GENERATOR_GENERATE_FROM_HTML,
  PDF_GENERATOR_GENERATE_FROM_TEMPLATE,
  PDF_GENERATOR_TEMPLATE_ENGINE,
} from './constants';
import { GeneratePdfFromHtmlPostController } from './infrastructure/controller/generate-pdf-from-html.post.controller';
import { GeneratePdfFromTemplatePostController } from './infrastructure/controller/generate-pdf-from-template.post.controller';
import { PuppeteerPdfGeneratorEngine } from './infrastructure/service/puppeteer-pdf-generator-engine';
import { HandlebarsTemplateEngine } from './infrastructure/service/handlebars-template-engine';

export default () => {
  registerController(GeneratePdfFromHtmlPostController);
  registerController(GeneratePdfFromTemplatePostController);
  registerProvider(
    PDF_GENERATOR_GENERATE_FROM_TEMPLATE,
    GeneratePdfFromTemplate
  );
  registerProvider(PDF_GENERATOR_GENERATE_FROM_HTML, GeneratePdfFromHtml);
  registerProvider(PDF_GENERATOR_ENGINE, PuppeteerPdfGeneratorEngine);
  registerProvider(PDF_GENERATOR_TEMPLATE_ENGINE, HandlebarsTemplateEngine);
};
