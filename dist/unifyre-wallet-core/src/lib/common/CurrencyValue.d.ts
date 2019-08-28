import bigInt from 'big-integer';
export declare type Currency = 'NGN' | 'BTC' | 'GHS' | 'KES' | 'GUSD' | 'ETH' | 'FRM';
export declare type Network = 'FERRUM' | 'ETHEREUM' | 'BITCOIN' | 'BINANCE_CHAIN';
export declare const CURRENCIES: Set<Currency>;
export declare class CurrencyValue {
    currency: Currency;
    rawAmount: bigInt.BigInteger;
    private _amountInt;
    private _amount;
    private _rawAmountCopy;
    static fromInt(currency: Currency, amountInt: number, roundUp?: boolean): CurrencyValue;
    static from(currency: Currency, amount: number, roundUp?: boolean): CurrencyValue;
    static zero(currency: Currency): CurrencyValue;
    static fromObj(currency: Currency, amount: any): CurrencyValue;
    static fromSumObjs(currency: Currency, amounts: any[]): CurrencyValue;
    static deserialize(cv: any): CurrencyValue;
    static nullSafeEquals(i1?: CurrencyValue, i2?: CurrencyValue): boolean;
    constructor(currency: Currency, rawAmount: bigInt.BigInteger);
    setVals(): void;
    amountInt(): number;
    amount(): number;
    format(): string;
    abs(): CurrencyValue;
    negate(): CurrencyValue;
    plus(other: CurrencyValue): CurrencyValue;
}
//# sourceMappingURL=CurrencyValue.d.ts.map