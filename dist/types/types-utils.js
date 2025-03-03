"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnsFromModel = exports.snakeToHuman = void 0;
const types_decorator_1 = require("./types.decorator");
function snakeToHuman(str) {
    return str
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
}
exports.snakeToHuman = snakeToHuman;
function ColumnsFromModel(modelName, fields) {
    const scheme = (0, types_decorator_1.getModelSchema)(modelName);
    if (!scheme) {
        throw new Error("Model " + modelName + " is not found");
    }
    return fields.filter(field => field in scheme).map((filed) => ({
        header: snakeToHuman(filed),
        path: filed,
        type: scheme[filed][1] ?? 'plain',
        raw_args: scheme[filed].slice(2) ?? []
    }));
}
exports.ColumnsFromModel = ColumnsFromModel;
//# sourceMappingURL=types-utils.js.map