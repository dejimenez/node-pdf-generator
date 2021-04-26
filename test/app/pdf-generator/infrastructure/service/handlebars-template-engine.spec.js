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
const constants_1 = require("../../../../../src/app/pdf-generator/constants");
const handlebars_template_engine_1 = require("../../../../../src/app/pdf-generator/infrastructure/service/handlebars-template-engine");
describe('HandlebarsTemplateEngine', () => {
    let handlebarsTemplateEngine;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        core_1.registerProvider(constants_1.PDF_GENERATOR_TEMPLATE_ENGINE, handlebars_template_engine_1.HandlebarsTemplateEngine);
        handlebarsTemplateEngine = core_1.get(constants_1.PDF_GENERATOR_TEMPLATE_ENGINE);
    }));
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
