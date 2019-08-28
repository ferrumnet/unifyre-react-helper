import { AppPage } from "../../redux/AppState";
export declare type MetricUnit = 'count' | 'duration' | 'navigation';
export interface MetricObject {
    event?: string;
    time: number;
    unit: MetricUnit;
    value: number | PageVisitDuration;
}
export interface PageVisitDuration {
    page: AppPage;
    subPage: string;
    duration: number;
}
export declare function countMetric(value: number): MetricObject;
export declare function durationMetric(value: number): MetricObject;
//# sourceMappingURL=MetricModel.d.ts.map