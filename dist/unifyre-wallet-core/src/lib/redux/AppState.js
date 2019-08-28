/*
  Convention: UI State: AppState... , DataState: App...
 */
define(["require", "exports", "../common/CurrencyValue"], function (require, exports, CurrencyValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultAppUserAccountGroup = {
        id: '', name: '', addresses: [], backups: [], keyType: 'ON_DEVICE'
    };
    exports.dummyAppUser = {
        email: '', intId: '', humanifiedIntId: '', liveAccountGroupId: '', accountGroups: [exports.defaultAppUserAccountGroup],
        displayName: '', bankAccounts: [], id: '', countryCode: '', phoneNumber: '', anonymous: true,
        otpMethod: '', totpSetup: false, adminRoles: [], devices: [], emailVerified: false, banned: false,
        phoneNumberVerified: false, businessDetails: { businessAddress: '', businessName: '', limitedAccess: false },
    };
    exports.defaultAppConfig = { baseCurrency: 'NGN',
        currencyPrices: { 'BTCNGN': { bid: 1, ask: 1 }, 'GUSDNGN': { bid: 1, ask: 1 } }, locale: 'us',
        language: 'en', statusBarHeight: 0, isOffline: true, isBioSupported: false, isBioSetup: false,
        dashboardMode: 'personal', deviceConstants: {},
        isPinSetup: false, lastPinConfirmationTime: 0, viewPortHeight: 0, activeAccountGroupId: '' };
    exports.EMPTY_OVERLAY_PARAMS = { params: {}, overlayType: '2fa', onFail: () => { },
        onAccept: o => Promise.resolve(o) };
    exports.defaultAppUiSignInForm = {
        email: '', password: '', emailIsValid: false,
    };
    exports.defaultAppUiBusinessDetailsForm = { isDirty: false, errorMessage: '',
        lockDown: false, businessName: '', address: '' };
    exports.defaultAppUiSellItemForm = { isDirty: false, quantityUnit: 'CTE', quantity: 0,
        price: CurrencyValue_1.CurrencyValue.zero('NGN'), itemTitle: '', itemTitleList: [] };
    exports.defaultAppUiReferralDashboard = { awardAmount: CurrencyValue_1.CurrencyValue.zero('NGN') };
    exports.defaultAppUiSinglePageMenuForm = {
        isDirty: false, items: [], menuType: 'accountGroupTypeSelector',
    };
    exports.defaultAppUiCoinSelectorForm = {
        coinSummaries: [],
        originalCoins: [], isDirty: false, selectedCoins: []
    };
    exports.defaultAppUiAccountGroupListForm = {
        isDirty: false, onDevice: [], needRestore: [],
    };
    exports.defaultAppUiAccountGroupStandardForm = {
        isDirty: false, name: '', backups: [], accountGroupId: '',
    };
    exports.defaultAppUiNmonicSeedForm = {
        isDirty: false, sheetNumber: 0, words: [], isTest: false, isRestore: false,
        actualSeed: undefined, accountGroupId: '', backupType: 'NMONIC_ONE', errors: [],
    };
    exports.defaultAppUiAccountGroupPaperBackupRestoreForm = {
        isDirty: false, mode: 'restore', partCount: 1, threshold: 1, sheets: [], showDone: false,
        backupType: 'NMONIC_ONE',
    };
});
//# sourceMappingURL=AppState.js.map