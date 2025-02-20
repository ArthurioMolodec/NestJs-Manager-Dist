import { GridNodes } from 'src/index';
export declare const MANAGED_KEY = "managed";
export declare const Managed: (config: {
    grid: GridNodes;
}, name?: string) => <T>(target: T) => any;
