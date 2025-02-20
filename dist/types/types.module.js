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
exports.TypesModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const types_decorator_1 = require("./types.decorator");
const fs = require("fs");
const path = require("path");
let TypesModule = class TypesModule {
    constructor(discoveryService, reflector) {
        this.discoveryService = discoveryService;
        this.reflector = reflector;
        this.collectedTypes = {};
    }
    onModuleInit() {
        const controllers = [...this.discoveryService.getControllers(), ...this.discoveryService.getProviders()];
        for (const wrapper of controllers) {
            const controller = wrapper.instance;
            if (!controller)
                continue;
            const metadata = this.reflector.get(types_decorator_1.MANAGE_TYPE_KEY, controller.constructor);
            if (metadata) {
                this.collectedTypes[metadata.name] = metadata.schema;
            }
        }
        this.generateTypeScriptInterfaces();
    }
    generateTypeScriptInterfaces() {
        const outputDir = path.join(process.cwd(), 'generated-types');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        let interfacesContent = '';
        for (const [name, schema] of Object.entries(this.collectedTypes)) {
            let interfaceContent = `export interface I${name} {\n`;
            for (const [key, typeInfo] of Object.entries(schema)) {
                const [type, _defaultValue, ...rest] = typeInfo;
                interfaceContent += `  ${key}: ${type};\n`;
            }
            interfaceContent += `}\n`;
            fs.writeFileSync(path.join(outputDir, `I${name}.ts`), interfaceContent);
            interfacesContent += interfaceContent;
        }
        fs.writeFileSync(path.join(outputDir, `Interfaces.ts`), interfacesContent);
        console.log(`Generated TypeScript interfaces in ${outputDir}`);
    }
};
exports.TypesModule = TypesModule;
exports.TypesModule = TypesModule = __decorate([
    (0, common_1.Module)({
        providers: [core_1.Reflector],
        imports: [core_1.DiscoveryModule],
    }),
    __metadata("design:paramtypes", [core_1.DiscoveryService,
        core_1.Reflector])
], TypesModule);
//# sourceMappingURL=types.module.js.map