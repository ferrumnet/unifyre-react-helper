export declare class ThemeConstantBuilder {
    private consts;
    private constructor();
    set(k: string, v: string | number): this;
    build(): ThemeConstants;
    static builder(): ThemeConstantBuilder;
}
export declare type ThemeConstants = {
    [k: string]: number | string;
};
export declare class ThemeError extends Error {
}
export declare class ThemeConstantProvider {
    private constants;
    constructor(defaultMap: ThemeConstants);
    register(map: ThemeConstants): void;
    get(key: string): number | string;
}
//# sourceMappingURL=types.d.ts.map