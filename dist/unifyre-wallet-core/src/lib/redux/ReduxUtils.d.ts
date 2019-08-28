import { AppConfig, AppUser, Locale } from './AppState';
import { AppState } from './AppStateType';
import { Action, AnyAction, Reducer, Store } from 'redux';
export declare type FullReducer<S = any, A extends Action = AnyAction> = (appState: AppState | undefined, state: S | undefined, action: A) => S;
export declare type FullReducersMapObject<S = any, A extends Action = Action> = {
    [K in keyof S]?: FullReducer<S[K], A>;
};
export declare type ReducersMapObjectOpt<S = any, A extends Action = Action> = {
    [K in keyof S]?: Reducer<S[K], A>;
};
export declare class ReduxUtils {
    private static _config;
    private static _userInfo;
    private static store;
    static setUserInfo(userInfo: AppUser): void;
    static getUserInfo(): AppUser;
    static fullySignedUpUser(): boolean;
    static getStore(): Store<{}>;
    static getState(): AppState;
    static setConfig(config: AppConfig): void;
    static config(): AppConfig;
    static getLocale(): Locale;
    static combineReducers<S, A extends Action = AnyAction>(sliceReducers: ReducersMapObjectOpt<S, A>, fullReducers: FullReducersMapObject<S, A>): FullReducer<S, A>;
}
//# sourceMappingURL=ReduxUtils.d.ts.map