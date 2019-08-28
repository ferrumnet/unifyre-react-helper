import { PageVisitDuration } from './MetricModel';
import { GoogleMeasurementClient } from './GoogleMeasurementClient';
import { Injectable } from 'ferrum-plumbing';
export declare class MetricCatalogWrapper {
    catalogId: string;
    svc: MetricsService;
    private readonly time;
    constructor(catalogId: string, svc: MetricsService);
    done(): void;
}
export interface MetricsService {
    start(catalogId: string): MetricCatalogWrapper;
    done(catalogId: string, startTime: number): void;
    timedAsync<T>(catalogId: string, fun: () => Promise<T>): Promise<T>;
}
export interface AnalyticsService {
    count(catalogId: string, count: number): void;
}
export declare class MetricsServiceGlobal implements MetricsService, AnalyticsService, Injectable {
    private measurementClient;
    private metrics;
    private dirty;
    private lastRemoteSave;
    private storage;
    constructor(measurementClient: GoogleMeasurementClient);
    __name__(): string;
    private _save;
    private _saveMetrics;
    private _load;
    private _remoteSave;
    start(catalogId: string): MetricCatalogWrapper;
    done(catalogId: string, startTime: number): void;
    timedAsync<T>(catalogId: string, fun: () => Promise<T>): Promise<T>;
    count(catalogId: string, count: number): void;
    navigate(visitDuration: PageVisitDuration): void;
    private static __instance;
    static _instance(): any;
}
export declare class MetricsServiceModuleWrapper implements MetricsService {
    private readonly dotModule;
    private svc;
    constructor(module: string);
    start(catalogId: string): MetricCatalogWrapper;
    done(catalogId: string, startTime: number): void;
    timedAsync<T>(catalogId: string, fun: () => Promise<T>): Promise<T>;
}
export declare function metricsforModule(module: string): MetricsServiceModuleWrapper;
//# sourceMappingURL=MetricsService.d.ts.map