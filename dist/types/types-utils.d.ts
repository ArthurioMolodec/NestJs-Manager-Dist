export declare function snakeToHuman(str: string): string;
export declare function ColumnsFromModel(modelName: string, fields: string[]): {
    header: string;
    path: string;
    type: import("./types.decorator").Modifier;
}[];
