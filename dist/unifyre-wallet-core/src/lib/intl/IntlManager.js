var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "@fluent/bundle", "../common/WalletPlatform", "../common/Log", "../common/services/GlobalContainer"], function (require, exports, fluent, WalletPlatform_1, Log_1, GlobalContainer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    fluent = __importStar(fluent);
    const { FluentBundle, FluentResource, FluentNode } = fluent;
    function intl(k, par) {
        // Get the global container, and a singleton instance
        return GlobalContainer_1.GlobalContainer.instance().get(IntlManager).translate(k, par);
    }
    exports.intl = intl;
    const PRODUCT_KUDI = `
-product = Kudi
`;
    const PRODUCT_UNIFYRE = `
-product = Unifyre
`;
    /**
     * The internationalization manager.
     */
    class IntlManager {
        constructor(lang = 'en-US', resources, pubSub) {
            this.lang = lang;
            this.resources = resources;
            this.pubSub = pubSub;
            this.bundle = new FluentBundle('en-US');
        }
        __name__() { return 'IntlManager'; }
        load(lang = 'en-US') {
            this.bundle = new FluentBundle(lang);
            const product = WalletPlatform_1.walletPlatform() === 'kudi' ?
                new FluentResource(PRODUCT_KUDI) : new FluentResource(PRODUCT_UNIFYRE);
            this.bundle.addResource(product);
            const langPart1 = lang.split('-')[0];
            const messages = this.resources[langPart1];
            if (!messages || !messages.length) {
                throw new Error(`IntlManager.load: Translations not found for language ${langPart1}`);
            }
            messages.forEach(m => this.bundle.addResource(new FluentResource(m)));
            this.lang = lang;
            const dis = this;
            setTimeout(() => dis.pubSub.pub('intlManagerLoaded', { lang: lang }));
        }
        translate(k, par) {
            const kParts = k.split('.');
            let mes;
            try {
                mes = this.bundle.getMessage(kParts[0]);
            }
            catch (e) {
                Log_1.Log.error('IntlManager.translate (bundle.getMessage)', k, par, e);
                throw e;
            }
            if (kParts.length === 2) {
                console.log('INTL MANAGER ', k, kParts, mes);
                // @ts-ignore
                return mes.attributes[kParts[1]];
            }
            try {
                return this.bundle.formatPattern(mes.value, par);
            }
            catch (e) {
                Log_1.Log.error('IntlManager.translate (bundle.format)', k, par, e);
                throw e;
            }
        }
    }
    exports.IntlManager = IntlManager;
});
//# sourceMappingURL=IntlManager.js.map