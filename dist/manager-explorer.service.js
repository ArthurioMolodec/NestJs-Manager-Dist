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
exports.ManagerExplorerService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const manager_decorator_1 = require("./manager.decorator");
const core_2 = require("@nestjs/core");
let ManagerExplorerService = class ManagerExplorerService {
    constructor(modulesContainer, reflector, httpAdapterHost, applicationConfig) {
        this.modulesContainer = modulesContainer;
        this.reflector = reflector;
        this.httpAdapterHost = httpAdapterHost;
        this.applicationConfig = applicationConfig;
    }
    onModuleInit() {
        const app = this.httpAdapterHost.httpAdapter.getInstance();
        const globalPrefix = this.applicationConfig.getGlobalPrefix();
        Array.from(this.modulesContainer.values())
            .flatMap((module) => Array.from(module.controllers.values()))
            .forEach((controller) => {
            const config = this.reflector.get(manager_decorator_1.MANAGED_KEY, controller.metatype);
            if (config) {
                const basePath = this.getControllerPath(controller.metatype);
                const routePath = `${globalPrefix && '/' + globalPrefix || ''}/${basePath}/config`;
                app.get(routePath, (req, res) => {
                    res.json(config);
                });
                console.log(`Registered dynamic route: ${routePath}`);
            }
        });
    }
    getControllerPath(controller) {
        const path = Reflect.getMetadata('path', controller);
        return path || controller.name.replace(/Controller$/, '').toLowerCase();
    }
};
exports.ManagerExplorerService = ManagerExplorerService;
exports.ManagerExplorerService = ManagerExplorerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.ModulesContainer,
        core_1.Reflector,
        core_2.HttpAdapterHost,
        core_1.ApplicationConfig])
], ManagerExplorerService);
//# sourceMappingURL=manager-explorer.service.js.map