export interface Logger {
    info(...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
}
declare class DebugLoger implements Logger {
    info: (message?: any, ...optionalParams: any[]) => void;
    error: (message?: any, ...optionalParams: any[]) => void;
    warn: (message?: any, ...optionalParams: any[]) => void;
}
export declare let Log: DebugLoger;
export {};
//# sourceMappingURL=Log.d.ts.map