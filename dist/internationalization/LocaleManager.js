"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocaleManager = exports.addCommas = void 0;
function addCommas(num, comma) {
    const parts = [];
    let i = num.length;
    while (i > 0) {
        const cutP = Math.max(0, i - 3);
        parts.push(num.substring(cutP, i));
        i = cutP;
    }
    return parts.reverse().join(comma);
}
exports.addCommas = addCommas;
function hasNonDigit(val) {
    return val && !/^\d+$/.test(val);
}
class LocaleManager {
    static setFromLocale(locale) {
        LocaleManager.thousandsSeparator = (1000).toLocaleString(locale)[1] === "," ? "," : ".";
        LocaleManager.decimalSeparator = LocaleManager.thousandsSeparator === "." ? "," : ".";
    }
    static formatDecimalString(amount, digits = 6) {
        // We use standard delimiters
        if (!amount) {
            return undefined;
        }
        let prefix = '';
        if (amount.startsWith('-')) {
            prefix = '-';
            amount = amount.substring(1);
        }
        const [intPart, decimal] = amount.split('.');
        const formattedDecimal = LocaleManager.cutDecimal(decimal || '0', digits);
        return prefix + addCommas(intPart, LocaleManager.thousandsSeparator) +
            (!!formattedDecimal ? (LocaleManager.decimalSeparator + formattedDecimal) : '');
    }
    static decimalToBigintString(amount, decimals) {
        let [main, decimal] = amount.split('.');
        decimal = (decimal || '').substr(0, decimals);
        const zeros = '0'.repeat(Math.max(0, decimals - decimal.length));
        return main + decimal + zeros;
    }
    static unFormatDecimalString(amount) {
        const parts = amount.split(LocaleManager.decimalSeparator);
        if (parts.length > 2) {
            return undefined;
        }
        let [intPart, decimal] = parts;
        decimal = decimal || '';
        let prefix = '';
        if (intPart.startsWith('-')) {
            prefix = '-';
            intPart = intPart.substr(1);
        }
        if (hasNonDigit(decimal)) {
            return undefined;
        }
        const commas = intPart.split(LocaleManager.thousandsSeparator);
        if (commas.length > 1 && (!!commas.find((c, i) => hasNonDigit(c) || (i === 0 ? c.length > 3 : c.length !== 3)))) {
            return undefined;
        }
        return prefix + commas.join('') + (decimal ? ('.' + decimal) : '');
    }
    static cutDecimal(decimalPart, digits) {
        if (digits === 0) {
            return '';
        }
        let nonZeroIdx = decimalPart.split('').reverse().findIndex(c => c !== '0');
        if (nonZeroIdx == -1) {
            nonZeroIdx = decimalPart.length;
        }
        const lastNonZero = decimalPart.length - nonZeroIdx;
        return decimalPart.substr(0, Math.min(digits, lastNonZero));
    }
}
exports.LocaleManager = LocaleManager;
LocaleManager.decimalSeparator = '.';
LocaleManager.thousandsSeparator = ',';
LocaleManager.formatter = {
    format: (v, digits) => LocaleManager.formatDecimalString(v, digits),
    unFormat: (v) => LocaleManager.unFormatDecimalString(v),
};
//# sourceMappingURL=LocaleManager.js.map