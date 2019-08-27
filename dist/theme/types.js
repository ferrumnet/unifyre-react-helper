"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ThemeConstantBuilder {
    constructor() {
        this.consts = {};
    }
    set(k, v) {
        const value = v.startsWith('$') ?
            this.consts[v.replace('$', '')] : v;
        this.consts[k] = value;
        return this;
    }
    build() {
        return this.consts;
    }
    static builder() {
        return new ThemeConstantBuilder();
    }
}
exports.ThemeConstantBuilder = ThemeConstantBuilder;
class ThemeError extends Error {
}
exports.ThemeError = ThemeError;
class ThemeConstantProvider {
    constructor(defaultMap) {
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
exports.ThemeConstantProvider = ThemeConstantProvider;
//# sourceMappingURL=types.js.map