define(["require", "exports", "./Log"], function (require, exports, Log_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WalletPlatformImpl {
    }
    WalletPlatformImpl._walletPlatform = undefined;
    function walletPlatform() {
        if (WalletPlatformImpl._walletPlatform) {
            return WalletPlatformImpl._walletPlatform;
        }
        throw new Error('Wallet platform not initialized');
    }
    exports.walletPlatform = walletPlatform;
    function initializeWalletPlatform(p) {
        WalletPlatformImpl._walletPlatform = p;
        Log_1.Log.info('Wallet platform set', p);
    }
    exports.initializeWalletPlatform = initializeWalletPlatform;
});
//# sourceMappingURL=WalletPlatform.js.map