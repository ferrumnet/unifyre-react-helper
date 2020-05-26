"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const bundle_1 = require("@fluent/bundle");
function intl(k, par) {
    // Get the global container, and a singleton instance
    return IntlManager.instance.translate(k, par);
}
exports.intl = intl;
/**
 * The internationalization manager.
 */
class IntlManager {
    constructor() {
        this.initialized = false;
        this.bundle = new bundle_1.FluentBundle('en-US');
        this.lang = 'en-US';
    }
    load(resources, lang = 'en-US') {
        this.bundle = new bundle_1.FluentBundle(lang);
        resources.forEach(resource => {
            const res = new bundle_1.FluentResource(resource);
            this.bundle.addResource(res);
        });
        this.lang = lang;
        this.initialized = true;
    }
    translate(k, par) {
        if (!this.initialized) {
            throw new Error('IntlManager is not initialized');
        }
        const kParts = k.split('.');
        let mes;
        try {
            mes = this.bundle.getMessage(kParts[0]);
        }
        catch (e) {
            const msg = `Error in getting message: ${k}, ${JSON.stringify(par || {})}: ${e.toString()}`;
            throw new Error(msg);
        }
        if (kParts.length === 2) {
            mes = mes.attributes[kParts[1]];
        }
        else {
            mes = mes.value;
        }
        if (!mes) {
            const msg = `IntlManager.translate: Message or attribute not found: ${k}, ${JSON.stringify(par || {})}`;
            throw new Error(msg);
        }
        try {
            return this.bundle.formatPattern(mes, par);
        }
        catch (e) {
            const msg = `IntlManager.translate (bundle.format): ${k} ${JSON.stringify(par)}: ${e.toString()}`;
            throw e;
        }
    }
}
exports.IntlManager = IntlManager;
IntlManager.instance = new IntlManager();
//# sourceMappingURL=IntlManager.js.map