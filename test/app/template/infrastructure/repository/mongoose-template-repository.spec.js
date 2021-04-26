"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const mongoose_template_repository_1 = require("../../../../../src/app/template/infrastructure/repository/mongoose-template-repository");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = require("mongoose");
const template_1 = require("../../../../../src/app/template/domain/entity/template");
const paper_format_1 = require("../../../../../src/app/shared/domain/paper-format");
const mongodb_1 = require("../../../../../src/infrastructure/db/mongodb");
const core_1 = require("../../../../../src/core");
const mongodb = new mongodb_memory_server_1.MongoMemoryServer();
let MockLoggerService = class MockLoggerService {
    constructor() {
        this.info = jest.fn();
    }
};
MockLoggerService = __decorate([
    core_1.Injectable()
], MockLoggerService);
describe('MongooseTemplateRepository', () => {
    let mongooseTemplateRepository;
    const template1 = template_1.Template.create('id1', 'template1', '<p>{{name1}}</p>', 'header', 'footer', paper_format_1.PaperFormat.A4);
    const template2 = template_1.Template.create('id2', 'template2', '<p>{{name2}}</p>', 'header', 'footer', paper_format_1.PaperFormat.LETTER);
    const template3 = template_1.Template.create('id3', 'template3', '<p>{{name3}}</p>', 'header', 'footer', paper_format_1.PaperFormat.LETTER);
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        core_1.registerProvider(core_1.LOGGER_SERVICE, MockLoggerService);
        const connectionString = yield mongodb.getUri();
        yield mongodb_1.dbConnect(connectionString);
        mongooseTemplateRepository = new mongoose_template_repository_1.MongooseTemplateRepository();
        yield mongooseTemplateRepository.create(template1);
        yield mongooseTemplateRepository.create(template2);
    }));
    describe('list', () => {
        it('should be defined', () => {
            expect(mongooseTemplateRepository.list).toBeDefined();
        });
        it('should get list of existing Templates', () => __awaiter(void 0, void 0, void 0, function* () {
            const list = yield mongooseTemplateRepository.list();
            expect(list).toEqual([template1, template2]);
        }));
    });
    describe('findById', () => {
        it('should be defined', () => {
            expect(mongooseTemplateRepository.findById).toBeDefined();
        });
        it('should get a Template by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const template = yield mongooseTemplateRepository.findById(template1.id);
            expect(template).toEqual(template1);
        }));
        it('should return null when not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const found = yield mongooseTemplateRepository.findById('id4');
            expect(found).toEqual(null);
        }));
    });
    describe('create', () => {
        it('should be defined', () => {
            expect(mongooseTemplateRepository.create).toBeDefined();
        });
        it('should create a new Template', () => __awaiter(void 0, void 0, void 0, function* () {
            yield mongooseTemplateRepository.create(template3);
            const template = yield mongooseTemplateRepository.findById(template3.id);
            expect(template).toEqual(template3);
        }));
    });
    describe('update', () => {
        it('should be defined', () => {
            expect(mongooseTemplateRepository.update).toBeDefined();
        });
        it('should update a Template', () => __awaiter(void 0, void 0, void 0, function* () {
            let templateUpdate = template_1.Template.create('id1', 'template updated', '<p>{{name.updated}}</p>', paper_format_1.PaperFormat.LETTER);
            yield mongooseTemplateRepository.update(templateUpdate);
            const template = yield mongooseTemplateRepository.findById(templateUpdate.id);
            expect(template).toEqual(templateUpdate);
        }));
        it('should return null when not found', () => __awaiter(void 0, void 0, void 0, function* () {
            let template3 = template_1.Template.create('id4', 'template updated', '<p>{{name.updated}}</p>', paper_format_1.PaperFormat.LETTER);
            const updated = yield mongooseTemplateRepository.update(template3);
            expect(updated).toEqual(null);
        }));
    });
    describe('delete', () => {
        it('should be defined', () => {
            expect(mongooseTemplateRepository.delete).toBeDefined();
        });
        it('should delete Template', () => __awaiter(void 0, void 0, void 0, function* () {
            yield mongooseTemplateRepository.delete(template1.id);
            const list = yield mongooseTemplateRepository.list();
            expect(list).toEqual([template2, template3]);
        }));
        it('should return null when not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const deleted = yield mongooseTemplateRepository.delete('id4');
            expect(deleted).toEqual(null);
        }));
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.connection.close();
        yield mongodb.stop();
    }));
});
