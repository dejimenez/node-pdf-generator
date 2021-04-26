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
const mongoose_1 = require("mongoose");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongodb_1 = require("../../../src/infrastructure/db/mongodb");
const core_1 = require("../../../src/core");
const mongodb = new mongodb_memory_server_1.MongoMemoryServer();
let MockLoggerService = class MockLoggerService {
    constructor() {
        this.info = jest.fn();
    }
};
MockLoggerService = __decorate([
    core_1.Injectable()
], MockLoggerService);
describe('dbConnect', () => {
    beforeAll(() => {
        core_1.registerProvider(core_1.LOGGER_SERVICE, MockLoggerService);
    });
    it('should stablish db connection', () => __awaiter(void 0, void 0, void 0, function* () {
        const connectionString = yield mongodb.getUri();
        yield mongodb_1.dbConnect(connectionString);
        expect(mongoose_1.connection.readyState).toBe(1);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.connection.close();
        yield mongodb.stop();
    }));
});
