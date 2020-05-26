export function addCommas(num: string, comma: string) {
    const parts: string[] = [];
    let i = num.length;
    while(i >0) {
        const cutP = Math.max(0, i-3);
        parts.push(num.substring(cutP, i));
        i = cutP
    }
    return parts.reverse().join(comma);
}

function hasNonDigit(val: string) {
    return val && !/^\d+$/.test(val);
}

export interface LocaleFormatter {
    format(v: string): string;
    unFormat(v: string): string;
}

export class LocaleManager {
    private static decimalSeparator: string = '.';
    private static thousandsSeparator: string = ',';
    public static readonly formatter =  {
        format: (v: string, digits: number) => LocaleManager.formatDecimalString(v, digits),
        unFormat: (v: string) => LocaleManager.unFormatDecimalString(v),
    } as LocaleFormatter;

    public static setFromLocale(locale: string) {
        LocaleManager.thousandsSeparator = (1000).toLocaleString(locale)[1] === "," ? "," : ".";
        LocaleManager.decimalSeparator = LocaleManager.thousandsSeparator === "." ? "," : ".";
    }

    public static formatDecimalString(amount: string, digits: number = 6): string | undefined {
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

    static decimalToBigintString(amount: string, decimals: number): string {
        let [main, decimal] = amount.split('.');
        decimal = (decimal || '').substr(0, decimals);
        const zeros = '0'.repeat(Math.max(0, decimals - decimal.length));
        return main + decimal + zeros;
    }


    public static unFormatDecimalString(amount: string): string | undefined {
        const parts = amount.split(LocaleManager.decimalSeparator);
        if (parts.length > 2) { return undefined; }
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
        if (commas.length > 1 && (
            !!commas.find((c, i) => hasNonDigit(c) || (
                i === 0 ? c.length > 3 : c.length !== 3
            )))) {
            return undefined;
        }
        return prefix + commas.join('') + (decimal ? ('.' + decimal) : '');
    }

    private static cutDecimal(decimalPart: string, digits: number) {
        if (digits === 0) {
            return '';
        }
        let nonZeroIdx = decimalPart.split('').reverse().findIndex(c => c !== '0');
        if (nonZeroIdx == -1) { nonZeroIdx = decimalPart.length;}
        const lastNonZero = decimalPart.length - nonZeroIdx;
        return decimalPart.substr(0, Math.min(digits, lastNonZero));
    }
}
