
export type BaseConstValue<T> = { [k: string]: T };

export class ConstantBuilder<TConstValueType, TConstType extends BaseConstValue<TConstValueType>> {
    private consts: TConstType = {} as any;
    private constructor() {}

    set(k: string, v: TConstValueType) {
        const value = typeof v === 'string' && (v as any as string).startsWith('$') ?
            this.consts[(v as any as string).replace('$', '')] : v;
        // @ts-ignore
        this.consts[k] = value;
        return this;
    }

    build(): TConstType {
        return this.consts;
    }

    static builder<T1, T2 extends BaseConstValue<T1>>(): ConstantBuilder<T1, T2> {
        return new ConstantBuilder();
    }
}

export type ThemeConstants = {[ k: string ]: number|string}

export class ThemeError extends Error {}

export class ConstantProvider<TConstValueType, TConstType extends { [k: string]: TConstValueType }> {
    private constants: TConstType[] = [];
    constructor(public name: string, defaultMap: TConstType) {
        this.constants.push(defaultMap);
    }

    register(map: TConstType) {
        this.constants.push(map);
    }

    get(key: string): TConstValueType {
        for(let i = this.constants.length - 1; i>=0; i--) {
            const res = this.constants[i][key];
            if (res) { return res; }
        }
        throw new ThemeError(`ThemeConstantProvider.get: Key "${key}" has no registered constant.`);
    }
}

export class ThemeConstantProvider extends ConstantProvider<number|string, ThemeConstants> {
}
