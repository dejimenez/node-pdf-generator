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
const template_create_1 = require("../../../../src/app/template/application/template-create");
const core_1 = require("../../../../src/core");
const constants_1 = require("../../../../src/app/template/constants");
const in_memory_template_repository_1 = require("../../../../src/app/template/infrastructure/repository/in-memory-template-repository");
const template_1 = require("../../../../src/app/template/domain/entity/template");
describe('TemplateCreate', () => {
    let templateCreator;
    let templateRepository;
    beforeAll(() => {
        core_1.registerProvider(constants_1.TEMPLATE_REPOSITORY, in_memory_template_repository_1.InMemoryTemplateRepository);
        core_1.registerProvider(constants_1.TEMPLATE_CREATE, template_create_1.TemplateCreate);
        templateCreator = core_1.get(constants_1.TEMPLATE_CREATE);
        templateRepository = core_1.get(constants_1.TEMPLATE_REPOSITORY);
    });
    it('should be defined', () => {
        expect(templateCreator).toBeDefined();
    });
    it('should create a template', () => __awaiter(void 0, void 0, void 0, function* () {
        const spy = jest.spyOn(templateRepository, 'create');
        const template = template_1.Template.create('id1', 'template1', '<p>{{name}}</p>');
        yield templateCreator.create(template);
        expect(spy).toBeCalledWith(template);
        expect(templateRepository.findById(template.id)).resolves.toEqual(template);
    }));
});
