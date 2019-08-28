import { CurrencyValue } from '../CurrencyValue';
import { AppTransaction, AppUiTransactionDetailsForm, AppUser, AppBalanceRaw } from '../../redux/AppState';
export declare type TransactionSemanticType = 'deposit' | 'withdraw' | 'send' | 'receive' | 'buy' | 'sell' | 'request' | 'pendingRequest';
export declare type TransactionNetworkType = 'crypto' | 'bank';
export declare type ServerTxType = 'FLUTTERWAVE_DEPOSIT' | 'BLOCKCYPHER_BTC' | 'MANUAL_DEPOSIT' | 'CRYPTO_WITHDRAWAL' | 'FIAT_WITHDRAWAL' | 'TRADE' | 'INTERNAL_TRANSFER' | 'REQUEST';
export interface TransactionViewModelItem {
    networkType: TransactionNetworkType;
    amount: CurrencyValue;
    address: string;
    addressType: string;
    virtualAddress: string;
    friendlyName: string;
}
export interface TransactionViewModel {
    transactionId: string;
    type: TransactionSemanticType;
    relativeCreationTime: string;
    isExpanded: boolean;
    isConfirmed: boolean;
    item1?: TransactionViewModelItem;
    item2?: TransactionViewModelItem;
    positiveAmount?: CurrencyValue;
    negativeAmount?: CurrencyValue;
    description: any;
    title: string;
    original: AppTransaction;
    form?: AppUiTransactionDetailsForm;
}
export interface TransactionListView {
    spinning: boolean;
    transactions: TransactionViewModel[];
    transactionFilter: string;
    selectedTransaction?: TransactionViewModel;
    selectedTransactionUser?: AppUser;
    selectedTransactionUserBalance?: AppBalanceRaw;
}
//# sourceMappingURL=Types.d.ts.map