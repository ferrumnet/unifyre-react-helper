export declare type BaseConstValue<T> = {
    [k: string]: T;
};
export declare class ConstantBuilder<TConstValueType, TConstType extends BaseConstValue<TConstValueType>> {
    private consts;
    private constructor();
    set(k: string, v: TConstValueType): this;
    build(): TConstType;
    static builder<T1, T2 extends BaseConstValue<T1>>(): ConstantBuilder<T1, T2>;
}
export declare type ThemeConstants = {
    [k: string]: number | string;
};
export declare class ThemeError extends Error {
}
export declare class ConstantProvider<TConstValueType, TConstType extends {
    [k: string]: TConstValueType;
}> {
    name: string;
    private constants;
    constructor(name: string, defaultMap: TConstType);
    register(map: TConstType): void;
    get(key: string): TConstValueType;
    has(key: string): boolean;
    private getOptional;
}
export declare class ThemeConstantProvider extends ConstantProvider<number | string, ThemeConstants> {
}
//# sourceMappingURL=types.d.ts.map