export class ThemeConstantBuilder {
    private consts: ThemeConstants = {};
    private constructor() {}

    set(k: string, v: string | number) {
        const value = (v as string).startsWith('$') ?
            this.consts[(v as string).replace('$', '')] : v;
        this.consts[k] = value;
        return this;
    }

    build(): ThemeConstants {
        return this.consts;
    }

    static builder(): ThemeConstantBuilder {
        return new ThemeConstantBuilder();
    }
}

export type ThemeConstants = {[ k: string ]: number|string}

export class ThemeError extends Error {}

export class ThemeConstantProvider {
    private constants: ThemeConstants[] = [];
    constructor(defaultMap: ThemeConstants) {
        this.constants.push(defaultMap);
    }

    register(map: ThemeConstants) {
        this.constants.push(map);
    }

    get(key: string): number | string {
        for(let i = this.constants.length - 1; i>=0; i--) {
            const res = this.constants[i][key];
            if (res) { return res; }
        }
        throw new ThemeError(`ThemeConstantProvider.get: Key "${key}" has no registered constant.`);
    }
}
