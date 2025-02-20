"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelSchema = exports.ManageType = exports.Nullable = exports.MANAGE_TYPE_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.MANAGE_TYPE_KEY = 'manage_type';
function Nullable(type) {
    return `${type} | null`;
}
exports.Nullable = Nullable;
const DefinedModels = new Map();
function ManageType(name, schema) {
    DefinedModels.set(name, schema);
    return (0, common_1.SetMetadata)(exports.MANAGE_TYPE_KEY, { name, schema });
}
exports.ManageType = ManageType;
function getModelSchema(model) {
    return DefinedModels.get(model);
}
exports.getModelSchema = getModelSchema;
//# sourceMappingURL=types.decorator.js.map