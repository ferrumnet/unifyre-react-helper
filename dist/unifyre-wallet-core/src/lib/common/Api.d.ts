import { Context } from '../Context';
import { PubSub } from './PubSub';
import { StringStorage } from "./services/CrossPlatformServices";
import { Injectable } from 'ferrum-plumbing';
export declare const KudiExchangeBackend = "minimal-cloud.com";
export declare const ApiHostName: any;
export declare const DevModeApi: boolean;
export declare const apiUrl: string;
export declare const wsApiUrl: string;
export declare class Api implements Injectable {
    private storage;
    private pubSub;
    private context;
    host: string;
    wsHost: string;
    token?: string;
    private _wSocket;
    private metric;
    constructor(storage: StringStorage, pubSub: PubSub, context: Context);
    __name__(): string;
    _setUpWebSockets(): void;
    post(command: string, data: Object, otpToken?: string): Promise<Object>;
    offlineGet(command: string): Promise<any>;
    /**
     * Cache the results after posting. Return cached results for the first call and refresh the cache.
     * @param command The command.
     * @param data The data.
     */
    cachedGet(command: string, data: Object): Promise<Object>;
    get(command: string, args: Object, otpToken?: string): Promise<Object>;
    getString(command: string): Promise<string>;
    toFullAddress(command: string): string;
    private fetchUrl;
}
export declare function remoteLog(message: any): void;
//# sourceMappingURL=Api.d.ts.map