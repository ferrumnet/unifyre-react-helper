export declare class ErrorUtils {
    static translate(e: string): string;
    static fromError(e: Object): string;
    static stringify(e: Error): string;
    private static cleanError;
}
export declare class ApiError {
    status: number;
    statusText: string;
    message: string;
    constructor(status: number, statusText: string, message: string);
}
//# sourceMappingURL=ErrorUtils.d.ts.map