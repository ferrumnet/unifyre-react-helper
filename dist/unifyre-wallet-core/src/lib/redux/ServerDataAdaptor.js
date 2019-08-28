define(["require", "exports", "../common/CurrencyValue"], function (require, exports, CurrencyValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ServerDataAdaptor {
        static adaptAppBalance(obj) {
            // Server side all amounts are BigInts
            return obj.map(a => {
                const currency = a.address.currency;
                return {
                    id: a.id,
                    accountType: a.accountType,
                    address: {
                        currency: a.address.currency,
                        address: a.address.address,
                        balance: CurrencyValue_1.CurrencyValue.fromObj(currency, a.address.balance),
                        pending: CurrencyValue_1.CurrencyValue.fromObj(currency, a.address.pending),
                        lastModified: a.address.lastModified,
                    },
                };
            });
        }
    }
    exports.ServerDataAdaptor = ServerDataAdaptor;
});
//# sourceMappingURL=ServerDataAdaptor.js.map