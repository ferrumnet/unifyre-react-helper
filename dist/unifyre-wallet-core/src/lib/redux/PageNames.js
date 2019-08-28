define(["require", "exports", "../common/Consts"], function (require, exports, Consts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NATIVE_PAGES = new Set(['dashboard', 'transactions',
        'settingsMenu', 'welcomeWizard', 'qrReader', 'friendSearch',
        'signInEmail', 'signInPw', 'signUpPwAndName', 'signUpPhoneNumber', 'signUpEmailVerification',
        'pinRequest', 'pinSetup',
    ]);
    exports.COMMON_PAGES = new Set(['dashboard', 'transactions',
        'settingsMenu']);
    exports.BOTH_SIDE_PAGES = new Set(['editor', '2fa']);
    exports.NATIVE_PAGES_WITH_TABBAR = new Set(['charts', 'dashboard', 'transactions', 'settingsMenu']);
    exports.NATIVE_PAGES_FULLSCREEN = new Set(['welcomeWizard', 'qrReader']);
    exports.PULL_TO_REFRESH_PAGES = new Set(['dashboard', 'transactions']);
    exports.OVERLAY_PAGES = new Set(['deposit', 'withdraw', 'buy', 'sell', 'manualDeposit',
        'transactionDetails', 'transactionDetailsNoTitle', 'shareTransactionResult', 'referralDashboard',
        'friendSearch', 'editor', '2fa',
    ]);
    exports.TRANSPARENT_PAGES = new Set(['friendSearch', 'editor', 'transactionDetails', 'transactionDetailsNoTitle']);
    exports.ANONYMOUS_PAGES = new Set(['dashboard', 'charts', 'chartDetails', 'transactions',
        'settingsMenu', 'signIn', 'welcomeWizard', 'account', 'deposit', 'securityMenu',
        'signInEmail', 'signInPw', 'signUpResetPw', 'signUpPwAndName', 'signUpPhoneNumber', 'signUpEmailVerification',
    ]);
    exports.PIN_SECURED_BUSINESS_PAGES = new Set(['deposit', 'withdraw', 'buy', 'sell', 'manualDeposit',
        'securityMenu', 'sendMoney', 'bankAccount', 'account', 'editBusiness']);
    function isPullToRefreshEnabled(page) {
        return exports.PULL_TO_REFRESH_PAGES.has(page);
    }
    exports.isPullToRefreshEnabled = isPullToRefreshEnabled;
    function availableAnonymously(page) {
        return exports.ANONYMOUS_PAGES.has(page);
    }
    exports.availableAnonymously = availableAnonymously;
    function pinCodeRequired(config, page) {
        return !!(config.dashboardMode === 'business' &&
            config.isPinSetup &&
            (Date.now() - config.lastPinConfirmationTime) > Consts_1.Consts.PIN_REQUEST_TIMEOUT &&
            exports.PIN_SECURED_BUSINESS_PAGES.has(page));
    }
    exports.pinCodeRequired = pinCodeRequired;
    function dontGoAwayIfTransaction(page) {
        return page === 'shareTransactionResult';
    }
    exports.dontGoAwayIfTransaction = dontGoAwayIfTransaction;
});
//# sourceMappingURL=PageNames.js.map