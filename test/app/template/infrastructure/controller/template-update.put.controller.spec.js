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
const template_update_1 = require("../../../../../src/app/template/application/template-update");
const template_1 = require("../../../../../src/app/template/domain/entity/template");
const template_not_found_error_1 = require("../../../../../src/app/shared/application/errors/template-not-found.error");
const template_update_put_controller_1 = require("../../../../../src/app/template/infrastructure/controller/template-update.put.controller");
const core_2 = require("../../../../../src/core");
describe('TemplateCreate', () => {
    let templateUpdate;
    let templateUpdatePutController;
    let templateRepository;
    let template;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        core_1.registerProvider(constants_1.TEMPLATE_REPOSITORY, in_memory_template_repository_1.InMemoryTemplateRepository);
        core_1.registerProvider(constants_1.TEMPLATE_UPDATE, template_update_1.TemplateUpdate);
        core_2.registerController(template_update_put_controller_1.TemplateUpdatePutController);
        templateUpdate = core_1.get(constants_1.TEMPLATE_UPDATE);
        templateRepository = core_1.get(constants_1.TEMPLATE_REPOSITORY);
        templateUpdatePutController = core_1.get(template_update_put_controller_1.TemplateUpdatePutController.name);
        template = template_1.Template.create('id1', 'template1', '<p>{{name}}</p>');
        yield templateRepository.create(template);
    }));
    it('should be defined', () => {
        expect(templateUpdatePutController).toBeDefined();
    });
    it('should update a template', () => __awaiter(void 0, void 0, void 0, function* () {
        const spy = jest.spyOn(templateUpdate, 'update');
        const updateTemplate = {
            id: 'id1',
            name: 'template1 updated',
        };
        yield templateUpdatePutController.put(updateTemplate);
        expect(spy).toBeCalledWith(updateTemplate);
        expect(templateRepository.findById(updateTemplate.id)).resolves.toEqual(Object.assign(Object.assign({}, template), updateTemplate));
    }));
    it('should throw when not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const updateTemplate = {
            id: 'id3',
            name: 'template1 updated',
        };
        expect(templateUpdate.update(updateTemplate)).rejects.toThrow(template_not_found_error_1.TemplateNotFoundError);
    }));
});
