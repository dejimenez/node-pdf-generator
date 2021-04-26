"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../../../src/core");
const generate_pdf_from_html_1 = require("../../../../src/app/pdf-generator/application/generate-pdf-from-html");
const constants_1 = require("../../../../src/app/pdf-generator/constants");
const handlebars_template_engine_1 = require("../../../../src/app/pdf-generator/infrastructure/service/handlebars-template-engine");
const puppeteer_pdf_generator_engine_1 = require("../../../../src/app/pdf-generator/infrastructure/service/puppeteer-pdf-generator-engine");
const paper_format_1 = require("../../../../src/app/shared/domain/paper-format");
describe('GeneratePdfFromHtml', () => {
    let generatePdfFromHtml;
    let puppeteerPdfGeneratorEngine;
    let handlebarsTemplateEngine;
    beforeAll(() => {
        core_1.registerProvider(constants_1.PDF_GENERATOR_TEMPLATE_ENGINE, handlebars_template_engine_1.HandlebarsTemplateEngine);
        core_1.registerProvider(constants_1.PDF_GENERATOR_ENGINE, puppeteer_pdf_generator_engine_1.PuppeteerPdfGeneratorEngine);
        core_1.registerProvider(constants_1.PDF_GENERATOR_GENERATE_FROM_HTML, generate_pdf_from_html_1.GeneratePdfFromHtml);
        generatePdfFromHtml = core_1.get(constants_1.PDF_GENERATOR_GENERATE_FROM_HTML);
        puppeteerPdfGeneratorEngine = core_1.get(constants_1.PDF_GENERATOR_ENGINE);
        handlebarsTemplateEngine = core_1.get(constants_1.PDF_GENERATOR_TEMPLATE_ENGINE);
    });
    it('should be defined', () => {
        expect(generatePdfFromHtml).toBeDefined();
    });
    it('should generate a pdf from html', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const paperFormat = paper_format_1.PaperFormat.LETTER;
        const result = yield generatePdfFromHtml.generate(html, data, paperFormat);
        expect(spyHandlebars).toBeCalledWith(html, data);
        expect(spyPuppeteer).toBeCalledWith(builtTemplate, paperFormat);
        expect(result).toBe(pdf);
    }));
    it('should use a default PaperFormat.A4', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield generatePdfFromHtml.generate(html, data);
        expect(spyHandlebars).toBeCalledWith(html, data);
        expect(spyPuppeteer).toBeCalledWith(builtTemplate, paper_format_1.PaperFormat.A4);
        expect(result).toBe(pdf);
    }));
});
