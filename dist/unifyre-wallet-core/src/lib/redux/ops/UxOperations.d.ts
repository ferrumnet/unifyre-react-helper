import { PubSub } from '../../common/PubSub';
import { Injectable } from 'ferrum-plumbing';
export declare class UxOperations implements Injectable {
    private pubSub;
    constructor(pubSub: PubSub);
    __name__(): string;
    notify(type: string, message: string): void;
    notifyError(e: Error): void;
    okDialog(title: string, message: string): void;
    wrapAsync<T>(fun: () => Promise<T>, waiting?: boolean): Promise<T | undefined>;
    static isOffline(): boolean;
}
//# sourceMappingURL=UxOperations.d.ts.map