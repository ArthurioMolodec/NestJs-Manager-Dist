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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const manager_decorator_1 = require("./manager.decorator");
let ConfigInterceptor = class ConfigInterceptor {
    constructor(reflector) {
        this.reflector = reflector;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const path = request.path || request.url;
        if (path.endsWith('/config')) {
            const controllerClass = context.getClass();
            const config = this.reflector.get(manager_decorator_1.MANAGED_KEY, controllerClass);
            if (config) {
                return (0, rxjs_1.of)(config);
            }
        }
        return next.handle();
    }
};
exports.ConfigInterceptor = ConfigInterceptor;
exports.ConfigInterceptor = ConfigInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], ConfigInterceptor);
//# sourceMappingURL=manager.interceptor.js.map