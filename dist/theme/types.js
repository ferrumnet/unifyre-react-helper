"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConstantBuilder {
    constructor() {
        this.consts = {};
    }
    set(k, v) {
        const value = typeof v === 'string' && v.startsWith('$') ?
            this.consts[v.replace('$', '')] : v;
        // @ts-ignore
        this.consts[k] = value;
        return this;
    }
    build() {
        return this.consts;
    }
    static builder() {
        return new ConstantBuilder();
    }
}
exports.ConstantBuilder = ConstantBuilder;
class ThemeError extends Error {
}
exports.ThemeError = ThemeError;
class ConstantProvider {
    constructor(name, defaultMap) {
        this.name = name;
        this.constants = [];
        this.constants.push(defaultMap);
    }
    register(map) {
        this.constants.push(map);
    }
    get(key) {
        for (let i = this.constants.length - 1; i >= 0; i--) {
            const res = this.constants[i][key];
            if (res) {
                return res;
            }
        }
        throw new ThemeError(`ThemeConstantProvider.get: Key "${key}" has no registered constant.`);
    }
}
exports.ConstantProvider = ConstantProvider;
class ThemeConstantProvider extends ConstantProvider {
}
exports.ThemeConstantProvider = ThemeConstantProvider;
//# sourceMappingURL=types.js.map