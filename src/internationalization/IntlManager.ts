// @ts-ignore
import {FluentBundle, FluentResource} from '@fluent/bundle';

export function intl(k: string, par?: any): string {
    // Get the global container, and a singleton instance
    return IntlManager.instance.translate(k, par);
}

/**
 * The internationalization manager.
 */
export class IntlManager {
    static instance: IntlManager = new IntlManager();
    private initialized: boolean = false;
    private bundle = new FluentBundle('en-US');
    private lang: string = 'en-US';
    constructor() { }

    load(resources: string[], lang: string = 'en-US') {
        this.bundle = new FluentBundle(lang);
        resources.forEach(resource => {
            const res = new FluentResource(resource);
            this.bundle.addResource(res);
        });
        this.lang = lang;
        this.initialized = true;
    }

    translate(k: string, par?: any) {
        if (!this.initialized) {
            throw new Error('IntlManager is not initialized');
        }
        const kParts = k.split('.');
        let mes: any;
        try {
            mes = this.bundle.getMessage(kParts[0])!;
        } catch (e) {
            const msg = `Error in getting message: ${k}, ${JSON.stringify(par || {})}: ${e.toString()}`
            throw new Error(msg);
        }
        if (kParts.length === 2) {
            mes = mes.attributes[kParts[1]];
        } else {
            mes = mes.value;
        }
        if (!mes) {
            const msg = `IntlManager.translate: Message or attribute not found: ${k}, ${JSON.stringify(par || {})}`
            throw new Error(msg);
        }
        try {
            return this.bundle.formatPattern(mes, par);
        } catch (e) {
            const msg = `IntlManager.translate (bundle.format): ${k} ${JSON.stringify(par)}: ${e.toString()}`;
            throw e;
        }
    }
}
