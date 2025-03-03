import { Modifier } from './types/types.decorator';
export * from './manager.module';
export { ManageType, Nullable } from './types/types.decorator';
export { Managed } from './manager.decorator';
export * from './types/types-utils';
export { ConfigInterceptor } from './manager.interceptor';
export interface BaseGridNode<NodeName extends string = string, NodeAttrs = any> {
    type: NodeName;
    title?: string;
    nodes?: BaseGridNode<string>[];
    attributes?: NodeAttrs;
}
export type BaseColumn = {
    header: string;
    filters: boolean | any;
    type: Modifier | 'enum';
    raw_args?: any[];
    attributes?: any;
} & {
    path: string;
};
export type TableAttributes = {
    data_request_path: string;
    columns: BaseColumn[];
};
export interface TableGridNode extends BaseGridNode<'table', TableAttributes> {
    attributes: TableAttributes;
}
export type GridNodes = TableGridNode;
