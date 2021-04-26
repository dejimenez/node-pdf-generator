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
const template_1 = require("../../../../src/app/template");
const in_memory_template_repository_1 = require("../../../../src/app/template/infrastructure/repository/in-memory-template-repository");
const template_2 = require("../../../../src/app/template/domain/entity/template");
const core_1 = require("../../../../src/core");
const constants_1 = require("../../../../src/app/pdf-generator/constants");
const handlebars_template_engine_1 = require("../../../../src/app/pdf-generator/infrastructure/service/handlebars-template-engine");
const puppeteer_pdf_generator_engine_1 = require("../../../../src/app/pdf-generator/infrastructure/service/puppeteer-pdf-generator-engine");
const paper_format_1 = require("../../../../src/app/shared/domain/paper-format");
const generate_pdf_from_template_1 = require("../../../../src/app/pdf-generator/application/generate-pdf-from-template");
const template_not_found_error_1 = require("../../../../src/app/shared/application/errors/template-not-found.error");
describe('GeneratePdfFromTemplate', () => {
    let generatePdfFromTemplate;
    let puppeteerPdfGeneratorEngine;
    let handlebarsTemplateEngine;
    let templateRepository;
    let template;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        core_1.registerProvider(template_1.TEMPLATE_REPOSITORY, in_memory_template_repository_1.InMemoryTemplateRepository);
        core_1.registerProvider(constants_1.PDF_GENERATOR_TEMPLATE_ENGINE, handlebars_template_engine_1.HandlebarsTemplateEngine);
        core_1.registerProvider(constants_1.PDF_GENERATOR_ENGINE, puppeteer_pdf_generator_engine_1.PuppeteerPdfGeneratorEngine);
        core_1.registerProvider(constants_1.PDF_GENERATOR_GENERATE_FROM_TEMPLATE, generate_pdf_from_template_1.GeneratePdfFromTemplate);
        generatePdfFromTemplate = core_1.get(constants_1.PDF_GENERATOR_GENERATE_FROM_TEMPLATE);
        puppeteerPdfGeneratorEngine = core_1.get(constants_1.PDF_GENERATOR_ENGINE);
        handlebarsTemplateEngine = core_1.get(constants_1.PDF_GENERATOR_TEMPLATE_ENGINE);
        templateRepository = core_1.get(template_1.TEMPLATE_REPOSITORY);
        template = template_2.Template.create('id1', 'template1', '<p>{{name}}</p>', paper_format_1.PaperFormat.LEDGER);
        yield templateRepository.create(template);
    }));
    it('should be defined', () => {
        expect(generatePdfFromTemplate).toBeDefined();
    });
    it('should generate a pdf from template', () => __awaiter(void 0, void 0, void 0, function* () {
        const pdf = Buffer.from('pdf');
        const builtTemplate = '<p>Name</p>';
        const data = { name: 'Name' };
        const spyPuppeteer = jest
            .spyOn(puppeteerPdfGeneratorEngine, 'generate')
            .mockImplementation(() => Promise.resolve(pdf));
        const spyHandlebars = jest
            .spyOn(handlebarsTemplateEngine, 'build')
            .mockImplementation(() => builtTemplate);
        const result = yield generatePdfFromTemplate.generate(template.id, data);
        expect(spyHandlebars).toBeCalledWith(template.html, data);
        expect(spyPuppeteer).toBeCalledWith(builtTemplate, template.paperFormat);
        expect(result).toBe(pdf);
    }));
    it('should throw when template not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 'id3';
        expect(generatePdfFromTemplate.generate(id, {})).rejects.toThrow(template_not_found_error_1.TemplateNotFoundError);
    }));
});
