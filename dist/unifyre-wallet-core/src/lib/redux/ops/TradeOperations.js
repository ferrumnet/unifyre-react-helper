var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../../common/CurrencyValue", "../ReduxUtils", "../../common/Utils", "../ServerDataAdaptor", "../actions/Actions", "../../common/Log", "../../common/Api", "../../common/AppEnv", "../../common/ErrorUtils", "../../common/transaction/FeeUtils"], function (require, exports, CurrencyValue_1, ReduxUtils_1, Utils_1, ServerDataAdaptor_1, Actions_1, Log_1, Api_1, AppEnv_1, ErrorUtils_1, FeeUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TradeOperations {
        constructor(api, context, ux) {
            this.api = api;
            this.context = context;
            this.ux = ux;
        }
        __name__() { return 'TradeOperations'; }
        requestFiatDeposit(currency, amountInt) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (amountInt <= Utils_1.Utils.minimumDepositAmountInt[currency]) {
                        this.ux.notify('error', `Minimum deposit amount is ${Utils_1.Utils.minimumDepositAmountInt[currency]}`);
                        return;
                    }
                    const isApp = AppEnv_1.AppEnv.isStandalone() ? '' : `?app=true&redirectUrl=${this.context.getRedirectUrl()}`;
                    const result = yield this.api.post(`transactions/deposit/${currency}/${amountInt}${isApp}`, {});
                    Actions_1.dispatchCrossApp(Actions_1.addAction(Actions_1.ActionTypes.LOAD_WEB_URL, { url: result.url }));
                    this.ux.notify('success', 'Opening a new window to finish deposit');
                }
                catch (e) {
                    this.ux.notify('error', ErrorUtils_1.ErrorUtils.fromError(e));
                }
            });
        }
        validateWithdrawNgn(amount, fee) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.ux.wrapAsync(() => __awaiter(this, void 0, void 0, function* () {
                    const state = ReduxUtils_1.ReduxUtils.getState();
                    if (state.data.user.bankAccounts.length === 0) {
                        // noinspection ExceptionCaughtLocallyJS
                        throw new Error('No bank account available');
                    }
                    const minWithdraw = FeeUtils_1.FeeUtils.minWithdrawal(amount.currency);
                    if (amount.amountInt() < minWithdraw.amountInt()) {
                        throw new Error(`Minimum withdrawal amount is ${minWithdraw.format()} ${minWithdraw.currency}`);
                    }
                    Utils_1.Utils.validateBalance(amount.negate(), fee, ServerDataAdaptor_1.ServerDataAdaptor.adaptAppBalance(state.data.balanceRaw));
                    ReduxUtils_1.ReduxUtils.getStore().dispatch(Actions_1.addAction(Actions_1.ActionTypes.OVERLAY_2FA_REQUEST, Actions_1.addAction(Actions_1.ActionTypes.WITHDRAW_NGN_SUBMIT_WITH_2FA, { amount: amount, fee: fee })));
                    ReduxUtils_1.ReduxUtils.getStore().dispatch(Actions_1.addAction(Actions_1.ActionTypes.NAVIGATE, { page: '2fa', params: {} }));
                }));
            });
        }
        withdrawFiat(token, amountDat, feeDat) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.withdrawOperation(token, state => {
                    const amount = CurrencyValue_1.CurrencyValue.deserialize(amountDat); // Data could have passed from web to native
                    const fee = CurrencyValue_1.CurrencyValue.deserialize(feeDat);
                    const activeWallet = ReduxUtils_1.ReduxUtils.config().activeAccountGroupId;
                    const fiatAddress = Utils_1.Utils.addressFor(amount.currency, state.data.user, activeWallet);
                    if (state.data.user.bankAccounts.length === 0) {
                        // noinspection ExceptionCaughtLocallyJS
                        throw new Error('No bank account available');
                    }
                    const bankAddress = state.data.user.bankAccounts[0].address;
                    const minWithdraw = FeeUtils_1.FeeUtils.minWithdrawal(amount.currency);
                    if (amount.amountInt() < minWithdraw.amountInt()) {
                        throw new Error(`Minimum withdrawal amount is ${minWithdraw.format()} ${minWithdraw.currency}`);
                    }
                    Utils_1.Utils.validateBalance(amount.negate(), fee, ServerDataAdaptor_1.ServerDataAdaptor.adaptAppBalance(state.data.balanceRaw));
                    return {
                        items: [
                            { currency: amount.currency, amount: amount.negate().plus(fee).rawAmount.toString(),
                                address: fiatAddress, addressType: 'ADDRESS' },
                            { currency: amount.currency, amount: amount.rawAmount.toString(),
                                address: bankAddress, addressType: 'FAKE' },
                        ],
                        externalFee: 0,
                        fee: fee.negate().rawAmount.toString(),
                        feeCurrency: fee.currency,
                        transactionData: '{}',
                        receiveTime: new Date().getTime(),
                        isConfirmed: false,
                        failed: false,
                        transactionId: Utils_1.Utils.uuid(),
                        creationTime: new Date().getTime(),
                        id: '',
                        logItems: [],
                    };
                });
            });
        }
        validateWithdrawCrypto(amount, fee, address) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.ux.wrapAsync(() => __awaiter(this, void 0, void 0, function* () {
                    const state = ReduxUtils_1.ReduxUtils.getState();
                    const currency = amount.currency;
                    address = Utils_1.Utils.normalizeAddress(amount.currency, address);
                    const activeWallet = ReduxUtils_1.ReduxUtils.config().activeAccountGroupId;
                    const selfAddress = Utils_1.Utils.addressFor(currency, ReduxUtils_1.ReduxUtils.getUserInfo(), activeWallet);
                    if (!Utils_1.Utils.isAddressValid(currency, address)) {
                        throw new Error(`Invalid ${currency} address`);
                    }
                    const minWithdraw = FeeUtils_1.FeeUtils.minWithdrawal(amount.currency);
                    if (amount.amountInt() < minWithdraw.amountInt()) {
                        throw new Error(`Minimum withdrawal amount is ${minWithdraw.format()} ${minWithdraw.currency}`);
                    }
                    Utils_1.Utils.validateBalance(amount.negate(), fee, ServerDataAdaptor_1.ServerDataAdaptor.adaptAppBalance(state.data.balanceRaw));
                    if (address === selfAddress) {
                        throw new Error('Cannot withdraw to self');
                    }
                    ReduxUtils_1.ReduxUtils.getStore().dispatch(Actions_1.addAction(Actions_1.ActionTypes.OVERLAY_2FA_REQUEST, Actions_1.addAction(Actions_1.ActionTypes.WITHDRAW_CRYPTO_SUBMIT_WITH_2FA, { amount, fee, address })));
                    ReduxUtils_1.ReduxUtils.getStore().dispatch(Actions_1.addAction(Actions_1.ActionTypes.NAVIGATE, { page: '2fa', params: {} }));
                }));
            });
        }
        withdrawCrypto(token, amountDat, feeDat, address) {
            return __awaiter(this, void 0, void 0, function* () {
                // TODO: Make the amount negative
                const amount = CurrencyValue_1.CurrencyValue.deserialize(amountDat); // Data could have passed from web to native
                const fee = CurrencyValue_1.CurrencyValue.deserialize(feeDat);
                const currency = amount.currency;
                return this.withdrawOperation(token, state => {
                    address = Utils_1.Utils.normalizeAddress(currency, address);
                    Api_1.remoteLog('Checking addr valid ' + currency);
                    const activeWallet = ReduxUtils_1.ReduxUtils.config().activeAccountGroupId;
                    const selfAddress = Utils_1.Utils.addressFor(currency, state.data.user, activeWallet);
                    if (!Utils_1.Utils.isAddressValid(currency, address)) {
                        throw new Error(`Invalid ${currency} address`);
                    }
                    const minWithdraw = FeeUtils_1.FeeUtils.minWithdrawal(amount.currency);
                    if (amount.amountInt() < minWithdraw.amountInt()) {
                        throw new Error(`Minimum withdrawal amount is ${minWithdraw.format()} ${minWithdraw.currency}`);
                    }
                    Utils_1.Utils.validateBalance(amount.negate(), fee, ServerDataAdaptor_1.ServerDataAdaptor.adaptAppBalance(state.data.balanceRaw));
                    if (address === selfAddress) {
                        throw new Error('Cannot withdraw to self');
                    }
                    return {
                        items: [
                            { currency: amount.currency, amount: amount.negate().plus(fee).rawAmount.toString(),
                                address: selfAddress, addressType: 'ADDRESS' },
                            { currency: amount.currency, amount: amount.rawAmount.toString(),
                                address: address, addressType: 'ADDRESS' },
                        ],
                        feeCurrency: fee.currency,
                        externalFee: 0,
                        fee: fee.negate().rawAmount.toString(),
                        transactionData: '{}',
                        receiveTime: new Date().getTime(),
                        isConfirmed: false,
                        failed: false,
                        transactionId: Utils_1.Utils.uuid(),
                        creationTime: new Date().getTime(),
                        id: '',
                        logItems: [],
                    };
                });
            });
        }
        tradeCryptoFiat(cryptoAmount, fiatAmount, fee) {
            return __awaiter(this, void 0, void 0, function* () {
                const cCurrency = cryptoAmount.currency;
                const fCurrency = fiatAmount.currency;
                return this.trade('trade', state => {
                    const isBuy = cryptoAmount.amountInt() > 0;
                    const pricePair = state.data.config.currencyPrices[cCurrency + fCurrency];
                    const price = isBuy ? pricePair.ask : pricePair.bid;
                    if (fiatAmount.amountInt() === 0 || cryptoAmount.amountInt() === 0) {
                        throw new Error('Amounts must be positive');
                    }
                    if ([cryptoAmount.currency, fiatAmount.currency].indexOf(fee.currency) < 0) {
                        throw new Error(`Fee currency '${fee.currency}'does not match any of the trade sides`);
                    }
                    const cryptoFee = (fee.currency === cryptoAmount.currency) ? fee : CurrencyValue_1.CurrencyValue.zero(cryptoAmount.currency);
                    const fiatFee = (fee.currency === fiatAmount.currency) ? fee : CurrencyValue_1.CurrencyValue.zero(fiatAmount.currency);
                    const expected = isBuy ?
                        FeeUtils_1.FeeUtils.calculateBuyFee(fiatAmount.currency, cryptoAmount.currency, cryptoAmount, price) :
                        FeeUtils_1.FeeUtils.calculateSellFee(fiatAmount.currency, cryptoAmount.currency, fiatAmount, price);
                    Log_1.Log.info(`Trading ${cryptoAmount.format()} ${cryptoAmount.currency}
                    with ${fiatAmount.format()} ${fiatAmount.currency} for price ${price}
                    (fee included: ${fee.format()} ${fee.currency})
                    Expected ${fCurrency} amount is ${expected}`);
                    let priceChanged = isBuy &&
                        !Utils_1.Utils.inEpsilonRange(expected.tradeAmount.amountInt(), cryptoAmount.amountInt());
                    priceChanged = priceChanged || (!isBuy &&
                        !Utils_1.Utils.inEpsilonRange(expected.baseAmount.amountInt(), fiatAmount.amountInt()));
                    if (priceChanged) {
                        throw new Error('Price has changed');
                    }
                    const balance = ServerDataAdaptor_1.ServerDataAdaptor.adaptAppBalance(state.data.balanceRaw);
                    Utils_1.Utils.validateBalance(cryptoAmount, cryptoFee.negate(), balance);
                    Utils_1.Utils.validateBalance(fiatAmount, fiatFee.negate(), balance);
                    const activeWallet = ReduxUtils_1.ReduxUtils.config().activeAccountGroupId;
                    const cryptoAddress = Utils_1.Utils.addressFor(cCurrency, state.data.user, activeWallet);
                    const fiatAddress = Utils_1.Utils.addressFor(fCurrency, state.data.user, activeWallet);
                    return {
                        items: [
                            { currency: cryptoAmount.currency, amount: cryptoAmount.rawAmount.toString(), address: cryptoAddress,
                                addressType: 'ADDRESS' },
                            { currency: fiatAmount.currency, amount: fiatAmount.rawAmount.toString(), address: fiatAddress,
                                addressType: 'ADDRESS' },
                        ],
                        feeCurrency: fee.currency,
                        externalFee: 0,
                        fee: fee.rawAmount.toString(),
                        transactionData: '{}',
                        receiveTime: new Date().getTime(),
                        isConfirmed: true,
                        failed: false,
                        transactionId: Utils_1.Utils.uuid(),
                        creationTime: new Date().getTime(),
                        id: '',
                        logItems: [],
                    };
                });
            });
        }
        sendMoney(fullPhoneNumber, friendlyName, amount, notes, customShareMessage) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.ux.wrapAsync(() => __awaiter(this, void 0, void 0, function* () {
                    const phoneNumber = Utils_1.Utils.digitsOnly(fullPhoneNumber);
                    const locale = ReduxUtils_1.ReduxUtils.getLocale();
                    // This is a complete phone number so including + to force it.
                    Utils_1.Utils.validateTrue(Utils_1.Utils.isValidPhoneNumber(locale, '+' + phoneNumber), 'Invalid phone number ' + phoneNumber);
                    Utils_1.Utils.validateBalance(amount, CurrencyValue_1.CurrencyValue.zero(amount.currency), ServerDataAdaptor_1.ServerDataAdaptor.adaptAppBalance(ReduxUtils_1.ReduxUtils.getState().data.balanceRaw));
                    const res = yield this.submitSendMoney(phoneNumber, friendlyName, amount, notes);
                    if (res) {
                        // Success!
                        const userMessage = customShareMessage ||
                            `I have sent you ${amount.format()} ${amount.currency} using the Kudi app.`;
                        const routeParams = ReduxUtils_1.ReduxUtils.getState().ui.route.params;
                        ReduxUtils_1.ReduxUtils.getStore().dispatch(Actions_1.addAction(Actions_1.ActionTypes.NAVIGATE_CLEAR_STACK, {
                            page: 'shareTransactionResult',
                            params: Object.assign({}, routeParams, { userMessage: userMessage, oldPage: undefined, oldParams: undefined }),
                        }));
                    }
                }));
            });
        }
        validateSendMoney(c, amount, notes) {
            try {
                Log_1.Log.info('Validating sendMoney', c, amount, notes);
                Utils_1.Utils.validateTrue(amount.amountInt() > 0, 'amount must be positive');
                Utils_1.Utils.validateBalance(amount.negate(), CurrencyValue_1.CurrencyValue.zero(amount.currency), ServerDataAdaptor_1.ServerDataAdaptor.adaptAppBalance(ReduxUtils_1.ReduxUtils.getState().data.balanceRaw));
                ReduxUtils_1.ReduxUtils.getStore().dispatch(Actions_1.addAction(Actions_1.ActionTypes.NAVIGATE, { page: 'confirmSendMoney', params: {
                        contact: c,
                        amount: amount,
                        notes: notes
                    } }));
                return '';
            }
            catch (e) {
                this.ux.notify('error', ErrorUtils_1.ErrorUtils.fromError(e));
                return '';
            }
        }
        sendMoneyForBussiness(busPhone, amount) {
            return __awaiter(this, void 0, void 0, function* () {
                let cCode = '';
                let phoneNo = '';
                try {
                    Utils_1.Utils.validateTrue(amount.amountInt() > 0, 'amount must be positive');
                    Utils_1.Utils.validateTrue(Utils_1.Utils.isValidCurrency(amount.currency), `Unsupported currency ${amount.currency}`);
                    Utils_1.Utils.validateBalance(amount.negate(), CurrencyValue_1.CurrencyValue.zero(amount.currency), ServerDataAdaptor_1.ServerDataAdaptor.adaptAppBalance(ReduxUtils_1.ReduxUtils.getState().data.balanceRaw));
                    const parts = busPhone.replace('+', '').split('-');
                    Utils_1.Utils.validateTrue(parts.length === 2, 'Invalid business phone number');
                    cCode = parts[0];
                    phoneNo = parts[1];
                }
                catch (e) {
                    this.ux.notify('error', ErrorUtils_1.ErrorUtils.fromError(e));
                    return '';
                }
                const res = yield this.trade('sendMoney', _ => {
                    const timestamp = Utils_1.Utils.now();
                    const user = ReduxUtils_1.ReduxUtils.getUserInfo();
                    const currency = amount.currency;
                    const fee = FeeUtils_1.FeeUtils.calcBusinessSellFee(amount);
                    Utils_1.Utils.validateTrue(fee.amountInt() >= 0, 'Fee must be positive');
                    return {
                        transactionId: user.id + '-' + Utils_1.Utils.uuid(),
                        transactionData: '{}',
                        creationTime: timestamp,
                        notes: '',
                        feeCurrency: fee.currency,
                        fee: fee.rawAmount.toString(),
                        items: [
                            { currency: currency, amount: amount.negate().rawAmount.toString(),
                                address: Utils_1.Utils.addressFor(currency, user), addressType: 'ADDRESS', friendlyName: user.displayName },
                            { currency: currency, amount: amount.rawAmount.toString(),
                                address: '', virtualAddress: `${cCode}${phoneNo}`, addressType: 'PHONE', friendlyName: '' }
                        ],
                    };
                });
                if (res) {
                    this.ux.notify('success', 'Transaction submitted');
                    ReduxUtils_1.ReduxUtils.getStore().dispatch(Actions_1.addAction(Actions_1.ActionTypes.NAVIGATE_CLEAR_STACK, { page: 'dashboard', params: {} }));
                }
                return 'SUCCESS';
            });
        }
        sendReferralTransaction(fullPhoneNumber, friendlyName) {
            const amount = CurrencyValue_1.CurrencyValue.fromInt(ReduxUtils_1.ReduxUtils.getState().data.config.baseCurrency, 1);
            const customShareMessage = `I have sent you a small gift using the Kudi app. By accepting you will also be ` +
                'registered to win $$';
            return this.sendMoney(fullPhoneNumber, friendlyName, amount, 'kudi referral program', customShareMessage);
        }
        static validateManualDeposit(deposit) {
            Utils_1.Utils.validateTrue(deposit.amount && deposit.amount.amountInt() > 0, 'Amount must be more than zero');
            Utils_1.Utils.validateTrue(!!deposit.bank && deposit.bank.length > 3, 'Bank must be provided');
            Utils_1.Utils.validateTrue(!deposit.photoAttaching, 'Please wait until the photo is uploaded');
        }
        submitManualDeposit() {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.trade('depositManualNgn', state => {
                    Api_1.remoteLog('SUBMITTING MAN DEP ' + JSON.stringify(state.ui.manualDeposit));
                    const deposit = state.ui.manualDeposit;
                    const user = ReduxUtils_1.ReduxUtils.getUserInfo();
                    TradeOperations.validateManualDeposit(deposit);
                    const activeWallet = ReduxUtils_1.ReduxUtils.config().activeAccountGroupId;
                    const ngnAddress = Utils_1.Utils.addressFor('NGN', user, activeWallet);
                    const timestamp = Utils_1.Utils.now();
                    return {
                        transactionType: 'MANUAL_DEPOSIT',
                        transactionId: user.id + '-' + Utils_1.Utils.uuid(),
                        items: [
                            { currency: deposit.currency, amount: deposit.amount.negate().rawAmount.toString(),
                                address: deposit.bank + ':' + Utils_1.Utils.uuid(), addressType: 'FAKE', fakeAddress: true },
                            { currency: deposit.currency, amount: deposit.amount.rawAmount.toString(),
                                address: ngnAddress, addressType: 'ADDRESS' }
                        ],
                        creationTime: timestamp,
                        fee: '0',
                        feeCurrency: deposit.currency,
                        logItems: [
                            {
                                actionBy: user.id,
                                actionType: 'MANUAL_DEPOSIT',
                                message: '',
                                proofTransactionId: deposit.attachedPhotoId || '',
                                severity: 'NON_CRITICAL',
                                time: timestamp,
                            },
                        ],
                    };
                });
                ReduxUtils_1.ReduxUtils.getStore().dispatch(Actions_1.addAction(Actions_1.ActionTypes.MANUAL_DEPOSIT_SUBMIT, {}));
            });
        }
        trade(tradeAction, tFun, token) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.ux.wrapAsync(() => __awaiter(this, void 0, void 0, function* () {
                    ReduxUtils_1.ReduxUtils.getStore().dispatch(Actions_1.addAction(Actions_1.ActionTypes.WAITING, {}));
                    const state = ReduxUtils_1.ReduxUtils.getStore().getState();
                    const t = tFun(state);
                    Log_1.Log.info('Going to submit transaction', t);
                    yield this.api.post(tradeAction, t, token);
                    Log_1.Log.info('Transaction submitted');
                    this.ux.notify('success', 'Transaction Submitted');
                    return true;
                }));
            });
        }
        manualDepositSaveProof(base64Imge) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const imageId = yield this.api.post('uploadImage', base64Imge);
                    Log_1.Log.info('Uploaded Image and got ID', imageId);
                    ReduxUtils_1.ReduxUtils.getStore().dispatch(Actions_1.addAction(Actions_1.ActionTypes.MANUAL_DEPOSIT_PROOF_SAVED, { photoId: imageId.docId }));
                    return 'SUCCESS';
                }
                catch (e) {
                    Log_1.Log.error('manualDepositSaveProof', e);
                    ReduxUtils_1.ReduxUtils.getStore().dispatch(Actions_1.addAction(Actions_1.ActionTypes.MANUAL_DEPOSIT_PROOF_CANCELLED, {}));
                    this.ux.notify('error', ErrorUtils_1.ErrorUtils.fromError(e));
                    return '';
                }
            });
        }
        withdrawOperation(token, tFun) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.trade('withdraw', tFun, token);
                return 'SUCCESS';
            });
        }
        submitSendMoney(phoneNumber, friendlyName, amount, notes) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.trade('sendMoney', () => {
                    const timestamp = Utils_1.Utils.now();
                    const user = ReduxUtils_1.ReduxUtils.getUserInfo();
                    const currency = amount.currency;
                    return {
                        transactionId: user.id + '-' + Utils_1.Utils.uuid(),
                        transactionData: '{}',
                        creationTime: timestamp,
                        notes: notes,
                        feeCurrency: amount.currency,
                        fee: '0',
                        items: [
                            { currency: currency, amount: amount.negate().rawAmount.toString(),
                                address: Utils_1.Utils.addressFor(currency, user), addressType: 'ADDRESS', friendlyName: user.displayName },
                            { currency: currency, amount: amount.rawAmount.toString(),
                                address: '', virtualAddress: phoneNumber, addressType: 'PHONE', friendlyName: friendlyName }
                        ],
                    };
                });
            });
        }
    }
    exports.TradeOperations = TradeOperations;
});
//# sourceMappingURL=TradeOperations.js.map