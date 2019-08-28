import { TransactionViewModel, TransactionListView } from "../transaction/Types";
import { CurrencyValue } from "../CurrencyValue";
import { Dispatch, Action } from "redux";
export interface StringStorage {
    getItem(key: string): Promise<string>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
}
export interface JsonStorage {
    load(key: string): Promise<any>;
    save(key: string, val: any): Promise<void>;
    remove(key: string): Promise<void>;
}
export interface ContactManager {
    search(toTerm: string, fromTerm: string, filteredContacts?: any[]): string[];
}
/**
 * Use this to avoid importing React-Redux in sub libraries
 */
export interface ReduxConnector {
    connect<TState, TProps, TDispatchProps>(mapStateToProps: (s: TState) => TProps, mapDispatchToProps: (d: Dispatch<Action>) => TDispatchProps): (c: any) => any;
}
export interface AdminOperations {
    refreshAdminTransactions(): Promise<void>;
    lockUser(userId: string, action: 'lock' | 'unlock'): Promise<void>;
    search(term: string): Promise<void>;
    loadUserTransactions(userId: string): Promise<void>;
    findTransaction(tid: string, txs?: TransactionListView): TransactionViewModel | undefined;
    selectTransaction(transactionId: string, noNotify: boolean): Promise<void>;
    loadCryptoWithdrawTransactions(): Promise<void>;
    loadManualDepositFiatTransactions(): Promise<void>;
    loadFiatWithdrawTransactions(): Promise<void>;
    loadLockedTransactions(): Promise<void>;
    lockTransaction(txId: string): Promise<void>;
    rejectTransaction(txId: string, proof: string, message: string): Promise<void>;
    setTransactionAsConfirmed(transactionId: string, proof: string, message?: string, newValue?: CurrencyValue, newFee?: CurrencyValue): Promise<void>;
    refreshAdminTransactions(): Promise<void>;
    setAccountLimits(id: string, daily: number, monthly: number): Promise<void>;
}
//# sourceMappingURL=CrossPlatformServices.d.ts.map