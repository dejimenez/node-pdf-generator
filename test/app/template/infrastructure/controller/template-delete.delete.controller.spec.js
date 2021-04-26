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
const template_delete_1 = require("../../../../../src/app/template/application/template-delete");
const template_not_found_error_1 = require("../../../../../src/app/shared/application/errors/template-not-found.error");
const template_delete_delete_controller_1 = require("../../../../../src/app/template/infrastructure/controller/template-delete.delete.controller");
describe('TemplateDeleteDeleteController', () => {
    let templateDelete;
    let templateDeleteDeleteController;
    let templateRepository;
    let template;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        core_1.registerProvider(constants_1.TEMPLATE_REPOSITORY, in_memory_template_repository_1.InMemoryTemplateRepository);
        core_1.registerProvider(constants_1.TEMPLATE_DELETE, template_delete_1.TemplateDelete);
        core_1.registerController(template_delete_delete_controller_1.TemplateDeleteDeleteController);
        templateDelete = core_1.get(constants_1.TEMPLATE_DELETE);
        templateRepository = core_1.get(constants_1.TEMPLATE_REPOSITORY);
        templateDeleteDeleteController = core_1.get(template_delete_delete_controller_1.TemplateDeleteDeleteController.name);
        yield templateRepository.create(template_1.Template.create('id1', 'template1', '<p>{{name}}</p>'));
        template = template_1.Template.create('id2', 'template1', '<p>{{name}}</p>');
        yield templateRepository.create(template);
    }));
    it('should be defined', () => {
        expect(templateDeleteDeleteController).toBeDefined();
    });
    it('should delete a template', () => __awaiter(void 0, void 0, void 0, function* () {
        const spy = jest.spyOn(templateDelete, 'delete');
        const id = 'id1';
        yield templateDeleteDeleteController.delete(id);
        expect(spy).toBeCalledWith(id);
        expect(templateRepository.findById(id)).resolves.toEqual(null);
    }));
    it('should throw when not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 'id3';
        expect(templateDeleteDeleteController.delete(id)).rejects.toThrow(template_not_found_error_1.TemplateNotFoundError);
    }));
});
