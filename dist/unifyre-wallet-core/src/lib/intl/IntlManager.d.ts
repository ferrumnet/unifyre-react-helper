import { PubSub } from '../common/PubSub';
import { Injectable } from 'ferrum-plumbing';
export declare function intl(k: string, par?: any): string;
/**
 * The internationalization manager.
 */
export declare class IntlManager implements Injectable {
    lang: String;
    private resources;
    private pubSub;
    private bundle;
    constructor(lang: String, resources: {
        [lang: string]: string[];
    }, pubSub: PubSub);
    __name__(): string;
    load(lang?: string): void;
    translate(k: string, par?: any): any;
}
//# sourceMappingURL=IntlManager.d.ts.map