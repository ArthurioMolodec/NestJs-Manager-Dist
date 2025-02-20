export declare const MANAGE_TYPE_KEY = "manage_type";
export type Modifier = 'date' | 'datetime' | 'plain' | 'number' | 'text';
export type AnyType = 'number' | 'string' | 'boolean' | 'null';
export type CanBeNull = Exclude<AnyType, 'null'>;
export type NullableType<T extends CanBeNull> = `${T} | null`;
export declare function Nullable(type: CanBeNull): "string | null" | "number | null" | "boolean | null";
export type BaseScheme = Record<string, [AnyType | NullableType<CanBeNull>, Modifier] | [AnyType | NullableType<CanBeNull>]>;
export declare function ManageType(name: string, schema: BaseScheme): import("@nestjs/common").CustomDecorator<string>;
export declare function getModelSchema(model: string): BaseScheme | undefined;
