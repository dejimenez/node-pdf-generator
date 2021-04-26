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
const core_1 = require("../../../../../src/core");
const core_2 = require("../../../../../src/core");
const constants_1 = require("../../../../../src/app/pdf-generator/constants");
const handlebars_template_engine_1 = require("../../../../../src/app/pdf-generator/infrastructure/service/handlebars-template-engine");
const puppeteer_pdf_generator_engine_1 = require("../../../../../src/app/pdf-generator/infrastructure/service/puppeteer-pdf-generator-engine");
const generate_pdf_from_html_post_controller_1 = require("../../../../../src/app/pdf-generator/infrastructure/controller/generate-pdf-from-html.post.controller");
const generate_pdf_from_html_1 = require("../../../../../src/app/pdf-generator/application/generate-pdf-from-html");
describe('GeneratePdfFromHtmlPostController', () => {
    let generatePdfFromHtmlPostController;
    let generatePdfFromHtml;
    beforeAll(() => {
        core_1.registerProvider(constants_1.PDF_GENERATOR_TEMPLATE_ENGINE, handlebars_template_engine_1.HandlebarsTemplateEngine);
        core_1.registerProvider(constants_1.PDF_GENERATOR_ENGINE, puppeteer_pdf_generator_engine_1.PuppeteerPdfGeneratorEngine);
        core_1.registerProvider(constants_1.PDF_GENERATOR_GENERATE_FROM_HTML, generate_pdf_from_html_1.GeneratePdfFromHtml);
        core_2.registerController(generate_pdf_from_html_post_controller_1.GeneratePdfFromHtmlPostController);
        generatePdfFromHtml = core_1.get(constants_1.PDF_GENERATOR_GENERATE_FROM_HTML);
        generatePdfFromHtmlPostController = core_1.get(generate_pdf_from_html_post_controller_1.GeneratePdfFromHtmlPostController.name);
    });
    it('should be defined', () => {
        expect(generatePdfFromHtmlPostController).toBeDefined();
    });
    it('should create a template', () => __awaiter(void 0, void 0, void 0, function* () {
        const pdf = Buffer.from('pdf');
        const data = { name: 'Name' };
        const html = '<p>{{name}}</p>';
        const spy = jest
            .spyOn(generatePdfFromHtml, 'generate')
            .mockImplementation(() => Promise.resolve(pdf));
        const result = yield generatePdfFromHtmlPostController.post(html, data);
        expect(spy).toBeCalledWith(html, data);
        expect(result).toBe(pdf);
    }));
});
