import { Container, Injectable } from "ferrum-plumbing";
import { AppState } from "../../redux/AppStateType";
import { AnyAction } from "redux";
export declare class GlobalReducerRegistry {
    static _registeredReducers: any;
    static registerReducer(name: string, reducer: any): void;
    static registerContainer(injectable: Injectable, reducer: (appState: AppState | undefined, state: any, action: AnyAction) => void): void;
    static containerReducer<T>(type: any): ((appState: AppState | undefined, state: T | undefined, action: AnyAction) => T);
    static chainReducers<T>(types: any[]): ((appState: AppState | undefined, state: T | undefined, action: AnyAction) => T);
    static reducer(name: string): any;
}
/**
 * DO NOT USE THIS. Only for legacy use-cases
 */
export declare class GlobalContainer {
    static _instance: Container;
    static instance(): Container;
    static init(container: Container): void;
}
//# sourceMappingURL=GlobalContainer.d.ts.map