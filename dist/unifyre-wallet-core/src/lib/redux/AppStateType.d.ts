import { AppBalanceRaw, AppStateData, AppStateUi, AppTransaction, AppUser } from './AppState';
export interface AppState {
    data: AppStateData;
    ui: AppStateUi;
    admin: any;
}
export interface RemoteSyncData {
    user: AppUser;
    balanceRaw: AppBalanceRaw;
    transactionsRaw: AppTransaction[];
    shelvedTransactionsRaw: AppTransaction[];
}
//# sourceMappingURL=AppStateType.d.ts.map