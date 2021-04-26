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
const constants_1 = require("../../../../../src/app/template/constants");
const in_memory_template_repository_1 = require("../../../../../src/app/template/infrastructure/repository/in-memory-template-repository");
const template_1 = require("../../../../../src/app/template/domain/entity/template");
const core_2 = require("../../../../../src/core");
const generate_pdf_from_template_post_controller_1 = require("../../../../../src/app/pdf-generator/infrastructure/controller/generate-pdf-from-template.post.controller");
const constants_2 = require("../../../../../src/app/pdf-generator/constants");
const generate_pdf_from_template_1 = require("../../../../../src/app/pdf-generator/application/generate-pdf-from-template");
const handlebars_template_engine_1 = require("../../../../../src/app/pdf-generator/infrastructure/service/handlebars-template-engine");
const puppeteer_pdf_generator_engine_1 = require("../../../../../src/app/pdf-generator/infrastructure/service/puppeteer-pdf-generator-engine");
const paper_format_1 = require("../../../../../src/app/shared/domain/paper-format");
describe('GeneratePdfFromTemplatePostController', () => {
    let generatePdfFromTemplatePostController;
    let generatePdfFromTemplate;
    let templateRepository;
    let template;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        core_1.registerProvider(constants_1.TEMPLATE_REPOSITORY, in_memory_template_repository_1.InMemoryTemplateRepository);
        core_1.registerProvider(constants_2.PDF_GENERATOR_TEMPLATE_ENGINE, handlebars_template_engine_1.HandlebarsTemplateEngine);
        core_1.registerProvider(constants_2.PDF_GENERATOR_ENGINE, puppeteer_pdf_generator_engine_1.PuppeteerPdfGeneratorEngine);
        core_1.registerProvider(constants_2.PDF_GENERATOR_GENERATE_FROM_TEMPLATE, generate_pdf_from_template_1.GeneratePdfFromTemplate);
        core_2.registerController(generate_pdf_from_template_post_controller_1.GeneratePdfFromTemplatePostController);
        generatePdfFromTemplate = core_1.get(constants_2.PDF_GENERATOR_GENERATE_FROM_TEMPLATE);
        generatePdfFromTemplatePostController = core_1.get(generate_pdf_from_template_post_controller_1.GeneratePdfFromTemplatePostController.name);
        templateRepository = core_1.get(constants_1.TEMPLATE_REPOSITORY);
        template = template_1.Template.create('id1', 'template1', '<p>{{name}}</p>', paper_format_1.PaperFormat.LEDGER);
        yield templateRepository.create(template);
    }));
    it('should be defined', () => {
        expect(generatePdfFromTemplatePostController).toBeDefined();
    });
    it('should create a template', () => __awaiter(void 0, void 0, void 0, function* () {
        const pdf = Buffer.from('pdf');
        const data = { name: 'Name' };
        const spy = jest
            .spyOn(generatePdfFromTemplate, 'generate')
            .mockImplementation(() => Promise.resolve(pdf));
        const result = yield generatePdfFromTemplatePostController.post(template.id, data);
        expect(spy).toBeCalledWith(template.id, data);
        expect(result).toBe(pdf);
    }));
});
