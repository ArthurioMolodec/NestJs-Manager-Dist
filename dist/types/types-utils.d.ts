import { BaseColumn } from "src";
export declare function snakeToHuman(str: string): string;
export declare function ColumnsFromModel(modelName: string, fields: (string | [string, Partial<BaseColumn>])[]): {
    header: string;
    filters?: any;
    type: import("./types.decorator").Modifier | "enum";
    raw_args: any[];
    attributes?: any;
    path: string;
}[];
