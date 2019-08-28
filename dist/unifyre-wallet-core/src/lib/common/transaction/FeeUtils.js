define(["require", "exports", "../CurrencyValue", "../Log", "../Utils"], function (require, exports, CurrencyValue_1, Log_1, Utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FeeUtils {
        static calculateWithdrawFee(amount) {
            if (amount.currency === 'NGN' || amount.currency === 'BTC') {
                return CurrencyValue_1.CurrencyValue.fromInt(amount.currency, FeeUtils._minWithdrawFee[amount.currency]);
            }
            return CurrencyValue_1.CurrencyValue.fromInt(amount.currency, Math.max(FeeUtils._minWithdrawFee[amount.currency], Math.ceil(amount.amountInt() * 0.022)));
        }
        static calcCryptoWithdrawFee(amount) {
            return FeeUtils.calculateWithdrawFee(amount);
        }
        static calcFiatWithdrawFee(amount) {
            return FeeUtils.calculateWithdrawFee(amount);
        }
        static calcBusinessSellFee(price) {
            return CurrencyValue_1.CurrencyValue.fromInt(price.currency, FeeUtils._tradeFeeRate * price.amountInt());
        }
        static calculateBuyFee(baseCurrency, tradeCurrency, amount, price) {
            const rate = FeeUtils._tradeFeeRate;
            const { fee, x, y } = FeeUtils.calculateTradeFee(price, rate, amount.currency === tradeCurrency ? undefined : amount.amount(), amount.currency === baseCurrency ? undefined : amount.amount());
            return {
                fee: CurrencyValue_1.CurrencyValue.from(baseCurrency, fee, true),
                baseAmount: CurrencyValue_1.CurrencyValue.from(baseCurrency, x, true),
                tradeAmount: CurrencyValue_1.CurrencyValue.from(tradeCurrency, y, false)
            };
        }
        static calculateSellFee(baseCurrency, tradeCurrency, amount, price) {
            const rate = FeeUtils._tradeFeeRate;
            const { fee, x, y } = FeeUtils.calculateTradeFee(1.0 / price, rate, amount.currency === baseCurrency ? undefined : amount.amount(), amount.currency === tradeCurrency ? undefined : amount.amount());
            return {
                fee: CurrencyValue_1.CurrencyValue.from(tradeCurrency, fee, true),
                baseAmount: CurrencyValue_1.CurrencyValue.from(baseCurrency, y, false),
                tradeAmount: CurrencyValue_1.CurrencyValue.from(tradeCurrency, x, true)
            };
        }
        static minWithdrawal(currency) {
            return CurrencyValue_1.CurrencyValue.fromInt(currency, this._minWithdrawAmount[currency]);
        }
        static testCalculateTradeFees() {
            const assertResult = (res, message) => {
                let { fee, baseAmount, tradeAmount } = res;
                Log_1.Log.info(message, 'fee:', fee, 'baseAmount:', baseAmount, 'tradeAmount:', tradeAmount);
            };
            let btc = 'BTC', usd = 'GUSD';
            let price = 4000;
            assertResult(FeeUtils.calculateBuyFee(usd, btc, CurrencyValue_1.CurrencyValue.from(btc, 10), price), 'Buying 10 btc');
            assertResult(FeeUtils.calculateSellFee(usd, btc, CurrencyValue_1.CurrencyValue.from(btc, 10), price), 'Selling 10 btc');
            assertResult(FeeUtils.calculateSellFee(usd, btc, CurrencyValue_1.CurrencyValue.from(usd, 8000), price), 'Selling 8000 usd worth of btc');
            assertResult(FeeUtils.calculateBuyFee(usd, btc, CurrencyValue_1.CurrencyValue.from(usd, 8000), price), 'Buying 8000 usd worth of btc');
            assertResult(FeeUtils.calculateBuyFee(usd, btc, CurrencyValue_1.CurrencyValue.from(usd, 10), price), 'Buying $10 worth of btc');
            assertResult(FeeUtils.calculateSellFee(usd, btc, CurrencyValue_1.CurrencyValue.from(usd, 10), price), 'Selling $10 worth of btc');
            assertResult(FeeUtils.calculateBuyFee(usd, btc, CurrencyValue_1.CurrencyValue.from(usd, 1), price), 'Buying $1 worth of btc');
            assertResult(FeeUtils.calculateSellFee(usd, btc, CurrencyValue_1.CurrencyValue.from(usd, 1), price), 'Selling $1 worth of btc');
        }
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
        static calculateTradeFee(p, r, x, y) {
            Utils_1.Utils.validateTrue(!!x || !!y, 'Both x and y cannot be undefined');
            if (!!y) { // y is known
                const rX = y * p * (1 + r);
                return { fee: y * p * r, x: rX, y: y };
            }
            else { // x is known
                const rY = x / (p * (1 + r));
                return { fee: rY * p * r, x: x, y: rY };
            }
        }
    }
    FeeUtils._tradeFeeRate = 0.02;
    FeeUtils._minWithdrawFee = {
        'BTC': 10,
        'NGN': 150,
        'GUSD': 50,
    };
    FeeUtils._minWithdrawAmount = {
        'BTC': 50,
        'NGN': 1000,
        'GUSD': 100,
    };
    exports.FeeUtils = FeeUtils;
});
//# sourceMappingURL=FeeUtils.js.map