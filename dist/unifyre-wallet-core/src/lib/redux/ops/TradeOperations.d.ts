import { CurrencyValue, Currency } from '../../common/CurrencyValue';
import { UxOperations } from './UxOperations';
import { AppContact, AppManualDepositProps, AppTransaction } from '../AppState';
import { AppState } from '../AppStateType';
import { Api } from '../../common/Api';
import { Context } from '../../Context';
import { Injectable } from 'ferrum-plumbing';
export declare class TradeOperations implements Injectable {
    private api;
    private context;
    private ux;
    constructor(api: Api, context: Context, ux: UxOperations);
    __name__(): string;
    requestFiatDeposit(currency: Currency, amountInt: number): Promise<void>;
    validateWithdrawNgn(amount: CurrencyValue, fee: CurrencyValue): Promise<void | undefined>;
    withdrawFiat(token: string, amountDat: CurrencyValue, feeDat: CurrencyValue): Promise<string>;
    validateWithdrawCrypto(amount: CurrencyValue, fee: CurrencyValue, address: string): Promise<void | undefined>;
    withdrawCrypto(token: string, amountDat: CurrencyValue, feeDat: CurrencyValue, address: string): Promise<string>;
    tradeCryptoFiat(cryptoAmount: CurrencyValue, fiatAmount: CurrencyValue, fee: CurrencyValue): Promise<boolean | undefined>;
    sendMoney(fullPhoneNumber: string, friendlyName: string, amount: CurrencyValue, notes: string, customShareMessage?: string): Promise<void | undefined>;
    validateSendMoney(c: AppContact, amount: CurrencyValue, notes: string): string;
    sendMoneyForBussiness(busPhone: string, amount: CurrencyValue): Promise<"" | "SUCCESS">;
    sendReferralTransaction(fullPhoneNumber: string, friendlyName: string): Promise<void | undefined>;
    static validateManualDeposit(deposit: AppManualDepositProps): void;
    submitManualDeposit(): Promise<void>;
    trade(tradeAction: string, tFun: (state: AppState) => AppTransaction, token?: string): Promise<boolean | undefined>;
    manualDepositSaveProof(base64Imge: string): Promise<"" | "SUCCESS">;
    withdrawOperation(token: string, tFun: (state: AppState) => AppTransaction): Promise<string>;
    private submitSendMoney;
}
//# sourceMappingURL=TradeOperations.d.ts.map