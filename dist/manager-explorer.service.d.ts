import { OnModuleInit } from '@nestjs/common';
import { ApplicationConfig, ModulesContainer, Reflector } from '@nestjs/core';
import { HttpAdapterHost } from '@nestjs/core';
export declare class ManagerExplorerService implements OnModuleInit {
    private readonly modulesContainer;
    private readonly reflector;
    private readonly httpAdapterHost;
    private readonly applicationConfig;
    constructor(modulesContainer: ModulesContainer, reflector: Reflector, httpAdapterHost: HttpAdapterHost, applicationConfig: ApplicationConfig);
    onModuleInit(): void;
    private getControllerPath;
}
