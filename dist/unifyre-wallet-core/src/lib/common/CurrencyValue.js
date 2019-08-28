var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "big-integer", "numeral"], function (require, exports, big_integer_1, numeral_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    big_integer_1 = __importDefault(big_integer_1);
    numeral_1 = __importDefault(numeral_1);
    exports.CURRENCIES = new Set(['NGN', 'BTC', 'GUSD', 'ETH']);
    const unitRatioFromBigInt = {
        'BTC': big_integer_1.default(100000000),
        'NGN': big_integer_1.default(1),
        'GHS': big_integer_1.default(1),
        'KES': big_integer_1.default(1),
        'GUSD': big_integer_1.default(100),
        'ETH': big_integer_1.default(1),
        'FRM': big_integer_1.default(1000000),
    };
    const uiIntRatioFromBigInt = {
        'BTC': big_integer_1.default(10000),
        'NGN': big_integer_1.default(1),
        'GHS': big_integer_1.default(1),
        'KES': big_integer_1.default(1),
        'GUSD': big_integer_1.default(1),
        'ETH': big_integer_1.default(1),
        'FRM': big_integer_1.default(1),
    };
    const unitRatioToUi = {
        'BTC': unitRatioFromBigInt['BTC'].toJSNumber() / uiIntRatioFromBigInt['BTC'].toJSNumber(),
        'GHS': unitRatioFromBigInt['GHS'].toJSNumber() / uiIntRatioFromBigInt['GHS'].toJSNumber(),
        'KES': unitRatioFromBigInt['KES'].toJSNumber() / uiIntRatioFromBigInt['KES'].toJSNumber(),
        'NGN': unitRatioFromBigInt['NGN'].toJSNumber() / uiIntRatioFromBigInt['NGN'].toJSNumber(),
        'GUSD': unitRatioFromBigInt['GUSD'].toJSNumber() / uiIntRatioFromBigInt['GUSD'].toJSNumber(),
        'ETH': unitRatioFromBigInt['ETH'].toJSNumber() / uiIntRatioFromBigInt['ETH'].toJSNumber(),
        'FRM': unitRatioFromBigInt['FRM'].toJSNumber() / uiIntRatioFromBigInt['FRM'].toJSNumber(),
    };
    class CurrencyValue {
        constructor(currency, rawAmount) {
            this.currency = currency;
            this.rawAmount = rawAmount;
            this._amountInt = 0;
            this._amount = 0.0;
            this._rawAmountCopy = big_integer_1.default(0);
            this.setVals();
        }
        static fromInt(currency, amountInt, roundUp = false) {
            const amountIntRound = roundUp ? Math.ceil(amountInt) : Math.trunc(amountInt);
            return new CurrencyValue(currency, big_integer_1.default(amountIntRound).multiply(uiIntRatioFromBigInt[currency]));
        }
        static from(currency, amount, roundUp = false) {
            return CurrencyValue.fromInt(currency, amount * unitRatioToUi[currency], roundUp);
        }
        static zero(currency) {
            return new CurrencyValue(currency, big_integer_1.default(0));
        }
        static fromObj(currency, amount) {
            if (amount !== undefined && amount !== null) {
                return new CurrencyValue(currency, big_integer_1.default(amount));
            }
            throw new Error('Amount must be provided');
        }
        static fromSumObjs(currency, amounts) {
            let res = big_integer_1.default(0);
            amounts.forEach(a => {
                if (a !== undefined && a !== null) {
                    res = res.add(big_integer_1.default(a));
                }
            });
            return new CurrencyValue(currency, res);
        }
        static deserialize(cv) {
            return CurrencyValue.fromInt(cv.currency, cv._amountInt);
        }
        static nullSafeEquals(i1, i2) {
            if (!i1 && !i2) {
                return true;
            }
            if (!i1 || !i2) {
                return false;
            }
            return i1.amountInt() === i2.amountInt();
        }
        setVals() {
            if (!this.rawAmount.eq(this._rawAmountCopy)) {
                this._amountInt = this.rawAmount.divide(uiIntRatioFromBigInt[this.currency]).toJSNumber();
                this._amount = this._amountInt / unitRatioToUi[this.currency];
            }
        }
        amountInt() {
            this.setVals();
            return this._amountInt;
        }
        amount() {
            this.setVals();
            return this._amount;
        }
        format() {
            switch (this.currency) {
                case 'GHS':
                case 'KES':
                case 'NGN':
                    return numeral_1.default(this.amount()).format('0,0');
                case 'BTC':
                    return numeral_1.default(this.amount()).format('0,0.0000');
                case 'GUSD':
                    return numeral_1.default(this.amount()).format('0,0.00');
                case 'ETH':
                    return numeral_1.default(this.amount()).format('0,0.0001');
                case 'FRM':
                    return numeral_1.default(this.amount()).format('0,0.0001');
                default:
                    throw new Error('Unsupported currency ' + this.currency);
            }
        }
        abs() {
            if (this.amountInt() > 0) {
                return this;
            }
            return CurrencyValue.fromInt(this.currency, Math.abs(this.amountInt()));
        }
        negate() {
            return CurrencyValue.fromInt(this.currency, -this.amountInt());
        }
        plus(other) {
            if (this.currency !== other.currency) {
                throw new Error(`Cannot add two amounts of different currencies ${this.currency} vs ${other.currency}`);
            }
            return CurrencyValue.fromInt(this.currency, this.amountInt() + other.amountInt());
        }
    }
    exports.CurrencyValue = CurrencyValue;
});
//# sourceMappingURL=CurrencyValue.js.map