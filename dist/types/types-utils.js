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
    return fields.filter(field => typeof field === 'string' && field in scheme || field[0] in scheme).map((field) => {
        const filedName = (typeof field === 'string') ? field : field[0];
        const fieldParams = (typeof field === 'string') ? {} : field[1];
        return {
            header: snakeToHuman(filedName),
            path: filedName,
            type: scheme[filedName][1] ?? 'plain',
            raw_args: scheme[filedName].slice(2) ?? [],
            ...fieldParams,
        };
    });
}
exports.ColumnsFromModel = ColumnsFromModel;
//# sourceMappingURL=types-utils.js.map