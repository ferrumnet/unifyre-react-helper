"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LocaleManager_1 = require("./LocaleManager");
it('format a bunch', () => {
    LocaleManager_1.LocaleManager.setFromLocale('en-US');
    let s = LocaleManager_1.LocaleManager.formatDecimalString('12345678.12345678', 4);
    expect(s).toBe('12,345,678.1234');
    s = LocaleManager_1.LocaleManager.formatDecimalString('12345678.12345678', 0);
    expect(s).toBe('12,345,678');
    s = LocaleManager_1.LocaleManager.formatDecimalString('12345678.12345678', 10);
    expect(s).toBe('12,345,678.12345678');
    s = LocaleManager_1.LocaleManager.formatDecimalString('12345678.12340000', 10);
    expect(s).toBe('12,345,678.1234');
    s = LocaleManager_1.LocaleManager.formatDecimalString('0', 10);
    expect(s).toBe('0');
    s = LocaleManager_1.LocaleManager.unFormatDecimalString('12,345,678.12345678');
    expect(s).toBe('12345678.12345678');
    s = LocaleManager_1.LocaleManager.unFormatDecimalString('12,0345,678.12345678');
    expect(s).toBeUndefined();
    s = LocaleManager_1.LocaleManager.unFormatDecimalString('12,345,678.12345.678');
    expect(s).toBeUndefined();
    s = LocaleManager_1.LocaleManager.unFormatDecimalString('12.12-33');
    expect(s).toBeUndefined();
    s = LocaleManager_1.LocaleManager.unFormatDecimalString('12111,23.001');
    expect(s).toBeUndefined();
    s = LocaleManager_1.LocaleManager.unFormatDecimalString('12,345,678.0');
    expect(s).toBe('12345678.0');
});
it('format a bunch IT', () => {
    // @ts-ignore
    LocaleManager_1.LocaleManager.decimalSeparator = ',';
    // @ts-ignore
    LocaleManager_1.LocaleManager.thousandsSeparator = '.';
    let s = LocaleManager_1.LocaleManager.formatDecimalString('12345678.12345678', 4);
    expect(s).toBe('12.345.678,1234');
    s = LocaleManager_1.LocaleManager.formatDecimalString('12345678.12345678', 0);
    expect(s).toBe('12.345.678');
    s = LocaleManager_1.LocaleManager.formatDecimalString('12345678.12345678', 10);
    expect(s).toBe('12.345.678,12345678');
    s = LocaleManager_1.LocaleManager.formatDecimalString('12345678.12340000', 10);
    expect(s).toBe('12.345.678,1234');
    s = LocaleManager_1.LocaleManager.formatDecimalString('0', 10);
    expect(s).toBe('0');
    s = LocaleManager_1.LocaleManager.unFormatDecimalString('12.345.678,12345678');
    expect(s).toBe('12345678.12345678');
    s = LocaleManager_1.LocaleManager.unFormatDecimalString('12.0345.678,12345678');
    expect(s).toBeUndefined();
    s = LocaleManager_1.LocaleManager.unFormatDecimalString('12,12-33');
    expect(s).toBeUndefined();
    s = LocaleManager_1.LocaleManager.unFormatDecimalString('12111.23,001');
    expect(s).toBeUndefined();
    s = LocaleManager_1.LocaleManager.unFormatDecimalString('12.345.678,0');
    expect(s).toBe('12345678.0');
    s = LocaleManager_1.LocaleManager.unFormatDecimalString('14');
    expect(s).toBe('14');
    s = LocaleManager_1.LocaleManager.unFormatDecimalString('-14.123.012');
    expect(s).toBe('-14123012');
    s = LocaleManager_1.LocaleManager.unFormatDecimalString('-141.123.012');
    expect(s).toBe('-141123012');
});
it('decimal to bigint', () => {
    let s = '';
    s = LocaleManager_1.LocaleManager.decimalToBigintString('-0012314.313213213', 18);
    expect(s).toBe('-0012314313213213000000000');
    s = LocaleManager_1.LocaleManager.decimalToBigintString('-12', 4);
    expect(s).toBe('-120000');
    s = LocaleManager_1.LocaleManager.decimalToBigintString('11.002', 6);
    expect(s).toBe('11002000');
    s = LocaleManager_1.LocaleManager.decimalToBigintString('11.123456789', 4);
    expect(s).toBe('111234');
});
//# sourceMappingURL=LocaleManager.test.js.map