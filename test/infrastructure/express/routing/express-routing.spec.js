"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../../../src/core");
const express_routing_1 = __importDefault(require("../../../../src/infrastructure/express/routing/express-routing"));
let ControllerClass = class ControllerClass {
    get() { }
    post(bodyParam, pathParam, queryParam) { }
};
__decorate([
    core_1.Get('route-get-path'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ControllerClass.prototype, "get", null);
__decorate([
    core_1.Post('route-post-path/:param'),
    __param(0, core_1.Body()),
    __param(1, core_1.Param()),
    __param(2, core_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ControllerClass.prototype, "post", null);
ControllerClass = __decorate([
    core_1.Controller('controller-path')
], ControllerClass);
describe('', () => {
    let expressRouter;
    let controller;
    beforeAll(() => {
        core_1.registerController(ControllerClass);
        controller = core_1.get(ControllerClass.name);
        expressRouter = express_routing_1.default();
    });
    it('should create decorated routes', () => {
        expect(expressRouter.stack[0].route.path).toBe('/controller-path/route-get-path');
        expect(expressRouter.stack[0].route.methods.get).toBe(true);
        expect(expressRouter.stack[1].route.path).toBe('/controller-path/route-post-path/:param');
        expect(expressRouter.stack[1].route.methods.post).toBe(true);
    });
});
