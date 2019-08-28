import { Currency, CurrencyValue } from '../CurrencyValue';
export interface TradeFeeResult {
    fee: CurrencyValue;
    baseAmount: CurrencyValue;
    tradeAmount: CurrencyValue;
}
export declare class FeeUtils {
    private static readonly _tradeFeeRate;
    private static readonly _minWithdrawFee;
    private static readonly _minWithdrawAmount;
    static calculateWithdrawFee(amount: CurrencyValue): CurrencyValue;
    static calcCryptoWithdrawFee(amount: CurrencyValue): CurrencyValue;
    static calcFiatWithdrawFee(amount: CurrencyValue): CurrencyValue;
    static calcBusinessSellFee(price: CurrencyValue): CurrencyValue;
    static calculateBuyFee(baseCurrency: Currency, tradeCurrency: Currency, amount: CurrencyValue, price: number): TradeFeeResult;
    static calculateSellFee(baseCurrency: Currency, tradeCurrency: Currency, amount: CurrencyValue, price: number): TradeFeeResult;
    static minWithdrawal(currency: Currency): CurrencyValue;
    static testCalculateTradeFees(): void;
    /**
     * The formula to calculate the fee:
     *  x = y.p.(1+r)
     * r: fee ratio
     * p: price, if buy, trade vs base; if sell, base vs trade
     * x: If buy, then base currency, else trade currency
     * y: If buy, then trade currency, else base currency
     * r is always known, but from x, and y, only one is known.
     * fee is always given out of x.
     */
    private static calculateTradeFee;
}
//# sourceMappingURL=FeeUtils.d.ts.map