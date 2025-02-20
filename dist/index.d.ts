import { Modifier } from './types/types.decorator';
export * from './manager.module';
export { ManageType, Nullable } from './types/types.decorator';
export { Managed } from './manager.decorator';
export * from './types/types-utils';
export { ConfigInterceptor } from './manager.interceptor';
export interface BaseGridNode<NodeName extends string = string, NodeAttrs = never> {
    type: NodeName;
    title?: string;
    nodes?: BaseGridNode<string>[];
    attributes?: NodeAttrs;
}
export interface TableGridNode extends BaseGridNode<'table', {
    data_request_path: string;
    columns: ({
        header: string;
        filters: boolean | any;
        type: Modifier;
    } & {
        path: string;
    })[];
}> {
}
export type GridNodes = TableGridNode;
