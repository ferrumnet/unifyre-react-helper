import { MetricObject, PageVisitDuration } from "./MetricModel";
import { Context } from "../../Context";
import { Injectable } from "ferrum-plumbing";
export declare class GoogleMeasurementClient implements Injectable {
    private context;
    constructor(context: Context);
    static GA_URL: string;
    __name__(): string;
    collectTiming(events: MetricObject[]): Promise<void>;
    collectEvent(events: MetricObject[]): Promise<void>;
    collectPageVisits(pageVisits: PageVisitDuration[]): Promise<void>;
    private api;
    private post;
}
//# sourceMappingURL=GoogleMeasurementClient.d.ts.map