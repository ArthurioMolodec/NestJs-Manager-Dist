import { OnModuleInit } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
export declare class TypesModule implements OnModuleInit {
    private readonly discoveryService;
    private readonly reflector;
    private collectedTypes;
    constructor(discoveryService: DiscoveryService, reflector: Reflector);
    onModuleInit(): void;
    private generateTypeScriptInterfaces;
}
