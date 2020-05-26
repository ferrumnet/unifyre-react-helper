export declare function addCommas(num: string, comma: string): string;
export interface LocaleFormatter {
    format(v: string): string;
    unFormat(v: string): string;
}
export declare class LocaleManager {
    private static decimalSeparator;
    private static thousandsSeparator;
    static readonly formatter: LocaleFormatter;
    static setFromLocale(locale: string): void;
    static formatDecimalString(amount: string, digits?: number): string | undefined;
    static decimalToBigintString(amount: string, decimals: number): string;
    static unFormatDecimalString(amount: string): string | undefined;
    private static cutDecimal;
}
//# sourceMappingURL=LocaleManager.d.ts.map