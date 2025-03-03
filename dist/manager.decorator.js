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
exports.Managed = exports.MANAGED_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.MANAGED_KEY = 'managed';
function numEnum(enumObj) {
    return Object.entries(enumObj).filter(([k]) => isNaN(Number(k)));
}
function notNumEnum(enumObj) {
    return Object.entries(enumObj).filter(([k]) => !isNaN(Number(k)));
}
function reverseEnum(enumObj) {
    return Object.entries(enumObj).reduce((acc, [key, value]) => {
        acc[value] = key;
        return acc;
    }, {});
}
function iterateOverNodes(grid, fn) {
    fn(grid);
    if (grid.nodes) {
        for (const node of grid.nodes) {
            iterateOverNodes(node, fn);
        }
    }
}
const Managed = (config, name) => {
    iterateOverNodes(config.grid, (grid) => {
        if (grid.type !== 'table') {
            return;
        }
        const tableGrid = grid;
        for (const column of tableGrid.attributes.columns) {
            if (column.type === 'enum' && column.raw_args?.[0] && typeof column.raw_args[0] === 'object') {
                const enumopts = column.raw_args[0];
                column.attributes ??= {};
                const enumFilteredEntr = notNumEnum(enumopts);
                column.attributes.enumValToLabel = Object.fromEntries(enumFilteredEntr);
                if (column.filters === true) {
                    column.filters = {
                        options: enumFilteredEntr.map(([key]) => ({
                            key,
                            label: enumopts[key],
                        }))
                    };
                }
            }
        }
    });
    return (target) => {
        let ManagedController = class ManagedController extends target {
            async config() {
                return config;
            }
        };
        __decorate([
            (0, common_1.Get)('config'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], ManagedController.prototype, "config", null);
        ManagedController = __decorate([
            (0, common_1.Controller)(name ?? target?.name.toLowerCase())
        ], ManagedController);
        return ManagedController;
    };
};
exports.Managed = Managed;
//# sourceMappingURL=manager.decorator.js.map