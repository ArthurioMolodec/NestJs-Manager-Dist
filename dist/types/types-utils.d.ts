export declare function snakeToHuman(str: string): string;
export declare function ColumnsFromModel(modelName: string, fields: string[]): {
    header: string;
    path: string;
    type: import("./types.decorator").Modifier | "enum";
    raw_args: ("string" | "number" | "boolean" | "date" | "datetime" | "plain" | "text" | "null" | "string | null" | "number | null" | "boolean | null")[] | ("enum" | import("./types.decorator").AnyType | "string | null" | "number | null" | "boolean | null" | Record<string, string | number>)[];
}[];
