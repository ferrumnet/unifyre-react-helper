import { ActionTypes } from './actions/Actions';
import { CurrencyValue } from '../common/CurrencyValue';
import { Currency } from '../common/CurrencyValue';
import { AppUiSendMoneyForm } from '../containers/SendMoneyContainer';
import { TransactionViewModel } from '../common/transaction/Types';
import { AnyAction } from 'redux';
export declare type Language = 'en';
export declare type Locale = 'us' | 'ng';
export declare type DashboardMode = 'business' | 'personal';
export declare type AppPage = 'splash' | 'pinRequest' | 'pinSetup' | 'dashboard' | 'signIn' | 'transactions' | 'settingsMenu' | 'contactUsMenu' | 'transactionDetails' | 'transactionDetailsNoTitle' | 'account' | 'withdraw' | 'deposit' | 'buy' | 'sell' | 'bankAccount' | 'profile' | '2fa' | 'editor' | 'manualDeposit' | 'manualDepositDescription' | 'ussdDescription' | 'qrReader' | 'charts' | 'chartDetails' | 'sendMoney' | 'confirmSendMoney' | 'confirmSendMoneyForScanned' | 'shareTransactionResult' | 'signInEmail' | 'signInPw' | 'signUpResetPw' | 'signUpPwAndName' | 'signUpPhoneNumber' | 'signUpEmailVerification' | 'securityMenu' | 'totpSetup' | 'welcomeWizard' | 'friendSearch' | 'editBusiness' | 'busSellItem' | 'busSellItemQrCode' | 'busSellItemConfirm' | 'referralDashboard' | 'referralConfirm' | 'coinList' | 'nmonicSeed' | 'accountGroupList' | 'accountGroupStandard' | 'accountGroupTypeSelector' | 'backupTypeSelector' | 'restoreTypeSelector' | 'newKeyBackupCloud' | 'newKeyBackupNmonic' | 'restoreKeyCloud' | 'restoreKeyNmonic' | 'testKeyCloud' | 'testKeyNmonic' | 'admin' | 'admin-btc-list' | 'admin-fiat-list' | 'admin-notifications' | 'admin-limits' | 'admin-manual-deposit';
export declare type DashboardMainControl = 'wallet' | 'unknownUser';
export declare type NotificationType = 'fundAccount' | 'twoFactor' | 'profileUpdate' | 'completeSignUp' | 'pendingRequest' | 'setUpPinCode' | 'qrScanCard';
export declare type OverlayType = '2fa';
export declare type EditorType = 'stringEditor' | 'currencyEditor' | 'bankEditor' | 'phoneEditor' | 'dropDownEditor' | 'quantityEditor' | 'listEditor' | 'acceptPolicy' | 'nmonicWord' | 'dialogue';
export declare type OtpMethod = 'AUTHY' | 'TOTP' | 'SMS' | 'NOTIFICATION';
export declare type CoinSymbol = 'ETH' | 'GUSD' | 'XRP' | 'EOS' | 'LTC' | 'BCE' | 'USDT';
export declare type SelectedChartType = 'today' | '1w' | '1m' | '3m' | '6m' | '1y';
export interface Dict {
    [k: string]: string | Dict | Dict[] | number;
}
export interface AppContact {
    id: string;
    name: string;
    firstName?: string;
    lastName?: string;
    phoneNumbers?: Array<{
        number?: string;
        primary?: boolean;
        digits?: string;
        countryCode?: string;
        label: string;
    }>;
}
export interface AppCoinItem {
    coin: Currency | CoinSymbol;
    baseCurrency: Currency;
    logo: string;
    title: string;
    price: number;
    change1h: number;
    change24h: number;
    links: {
        website: string;
        reddit?: string;
        twitter?: string;
        explorer?: string;
    };
}
export interface AppNewsItem {
    logo: string;
    title: string;
    time: number;
    source: string;
    url: string;
    tags: string[];
    categories: string;
}
export interface QrCodeRequest {
    match: string;
}
export interface EditorRequest {
    replaceRoute?: boolean;
    editorType: EditorType;
    title: string;
    autoCompleteItems?: string[];
    autoCompleteDefault?: string;
    onSuccessAction: ActionTypes;
    onSuccessPayload?: any;
    onCloseAction: ActionTypes;
    params: Dict;
}
export interface TwoFaRequest {
    token?: string;
    payload: any;
    onSuccessAction: ActionTypes;
    overrideMethod?: OtpMethod;
}
export interface AppUiForm {
    isDirty: boolean;
    errorMessage?: string;
}
export interface AppAddressWithBalanceRaw {
    address: string;
    currency: Currency;
    balance: string;
    pending: string;
    lastModified: number;
}
export interface AppAddressWithBalance {
    address: string;
    currency: Currency;
    balance: CurrencyValue;
    pending: CurrencyValue;
    lastModified: number;
}
export interface AppBankAccount {
    bankName: string;
    accountNumber: string;
    address: string;
    verified: boolean;
}
export interface AppUiUserProfileForm extends AppUiForm {
    displayName: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
}
export interface AppUiSecurityForm extends AppUiForm {
    isPinCodeSetup: boolean;
    otpMethod: OtpMethod;
    isTotpSetup: boolean;
    isBioSupported: boolean;
    isBioSetup: boolean;
}
export interface AppUiTotpSetupForm {
    totpQrCodeUrl: string;
}
export interface AppUiTransactionDetailsInvoiceItem {
    title: string;
    price: string;
    currency: string;
}
export interface AppUiTransactionDetailsForm extends AppUiForm {
    transactionId: string;
    tvmType: string;
    transactionType: string;
    currency: Currency;
    title: string;
    subTitle: string;
    positiveAmount?: CurrencyValue;
    negativeAmount?: CurrencyValue;
    fee: CurrencyValue;
    isConfirmed: boolean;
    isFailed: boolean;
    fullDate: string;
    kudiId: string;
    receiverAddress?: string;
    externalId?: string;
    externalUrl?: string;
    reason?: string;
    notes?: string;
    invoiceItems: AppUiTransactionDetailsInvoiceItem[];
    receiveTransactionDetails?: {
        senderFriendlyName?: string;
        receiveVirtualAddress?: string;
    };
    sendTransactionDetails?: {
        receiveVirtualAddress?: string;
        receiverFriendlyName?: string;
    };
}
export interface AppUserDevice {
    deviceId: string;
    appId: string;
    deviceType: string;
    countryCode: string;
    notificationToken: string;
    disabled: boolean;
}
export declare type AccountGroupBackupType = 'NMONIC_ONE' | 'NMONIC_ENCRYPTED' | 'NMONIC_TWO_OF_TWO' | 'NMONIC_TWO_OF_THREE' | 'NMONIC_THREE_OF_FIVE' | 'SUB_ZERO_SYNC' | 'ICLOUD' | 'GOOGLE_CLOUD';
export declare type AppUserAccountGroupKeyType = 'REMOTE' | 'ON_DEVICE' | 'SUBZERO' | 'SECURE_ENCLAVE';
export interface AppUserAddresses {
    [c: string]: {
        address: string;
        accountGroupId?: string;
    };
}
export interface AppUserAccountGroup {
    id: string;
    name: string;
    keyType: AppUserAccountGroupKeyType;
    backups: AccountGroupBackupType[];
    addresses: AppUserAddresses;
}
export declare const defaultAppUserAccountGroup: AppUserAccountGroup;
export interface AppUser {
    displayName: string;
    id: string;
    intId: string;
    humanifiedIntId: string;
    liveAccountGroupId: string;
    email: string;
    emailVerified: boolean;
    countryCode: string;
    phoneNumber: string;
    phoneNumberVerified: boolean;
    anonymous: boolean;
    bankAccounts: AppBankAccount[];
    accountGroups: AppUserAccountGroup[];
    totpSetup: boolean;
    otpMethod: OtpMethod;
    adminRoles: string[];
    form?: AppUiUserProfileForm;
    securityForm?: AppUiSecurityForm;
    totpSetupForm?: AppUiTotpSetupForm;
    signUpForm?: AppUiSignUpForm;
    devices: AppUserDevice[];
    banned: boolean;
    businessDetails: {
        businessName: string;
        businessAddress: string;
        limitedAccess: boolean;
    };
}
export declare const dummyAppUser: AppUser;
export interface AppStateRoute {
    page: AppPage;
    params: Dict;
    oldPage?: AppPage;
    oldParams?: Dict;
}
export interface AppCurrencyPricePair {
    bid: number;
    ask: number;
}
export interface AppCurrencyPrices {
    [currencyPair: string]: AppCurrencyPricePair;
}
export interface AppConfig {
    baseCurrency: Currency;
    language: Language;
    locale: Locale;
    currencyPrices: AppCurrencyPrices;
    statusBarHeight: number;
    viewPortHeight?: number;
    isOffline: boolean;
    isPinSetup: boolean;
    isBioSupported: boolean;
    isBioSetup: boolean;
    lastPinConfirmationTime: number;
    dashboardMode: DashboardMode;
    deviceConstants: Dict;
    activeAccountGroupId: string;
}
export declare const defaultAppConfig: AppConfig;
export interface AppAccountRaw {
    id: string;
    accountType: string;
    address: AppAddressWithBalanceRaw;
    dailyLimit?: number;
    monthlyLimit?: number;
}
export interface AppAccount {
    id: string;
    accountType: string;
    address: AppAddressWithBalance;
}
export declare type AppBalanceRaw = AppAccountRaw[];
export declare type AppBalance = AppAccount[];
export interface AppTransactionItemRaw {
    currency: Currency;
    userId?: string;
    address: string;
    addressType: 'ADDRESS' | 'PHONE' | 'FAKE';
    virtualAddress?: string;
    friendlyName?: string;
    amount: string;
    fakeAddress?: boolean;
}
export interface AppTransactionLogItems {
    actionType: string;
    actionBy: string;
    severity: string;
    proofTransactionId: string;
    time: number;
    message: string;
}
export interface AppTransaction {
    id: string;
    transactionId: string;
    creationTime: number;
    receiveTime: number;
    externalFee: number;
    fee: string;
    feeCurrency: Currency;
    isConfirmed: boolean;
    failed: boolean;
    transactionData: string;
    transactionType?: string;
    lockedBy?: string;
    notes?: string;
    items: AppTransactionItemRaw[];
    logItems: AppTransactionLogItems[];
}
export interface AppFrequentSaleItem {
    title: string;
    price: CurrencyValue;
    lastUsed: number;
}
export interface AppLocalAccountGroup {
    id: string;
    selectedCoins: string[];
}
export interface AppStateData {
    user: AppUser;
    config: AppConfig;
    balanceRaw: AppBalanceRaw;
    transactions: AppTransaction[];
    shelvedTransactions: AppTransaction[];
    accountGroups: AppLocalAccountGroup[];
}
export interface AppStateNotification {
    notificationType: NotificationType;
    title: string;
    target: AppStateRoute;
    subTitle: string;
    details: string;
}
export interface AppStateDashboard {
    mainControl: DashboardMainControl;
    notifications: AppStateNotification[];
}
export interface AppStateBusinessDashboard {
    recentSales: AppFrequentSaleItem[];
    itemLookup: AppFrequentSaleItem[];
}
export interface AppStateWallet {
    currency: Currency;
    amount: CurrencyValue;
    price: number;
    pendingAmount: CurrencyValue;
}
export interface AppWithdrawCryptoProps {
    amount: CurrencyValue;
    fee: CurrencyValue;
    address: string;
}
export interface AppManualDepositProps {
    bank: string;
    currency: Currency;
    amount: CurrencyValue;
    photoAttached: boolean;
    photoAttaching: boolean;
    attachedPhotoId?: string;
}
export interface OverlayParams {
    overlayType: OverlayType;
    onAccept: (result: Object) => Promise<Object>;
    onFail: (e: Error) => void;
    params: Object;
}
export interface ToastMessage {
    type: 'error' | 'success';
    message: string;
}
export declare const EMPTY_OVERLAY_PARAMS: OverlayParams;
export interface AppUiFlags {
    waiting: boolean;
    loadMoreTransactionsWaiting: boolean;
    overlay2fa: boolean;
    overlayParams: OverlayParams;
    toast?: ToastMessage;
}
export interface AppUiBankAccountForm extends AppUiForm {
    bank: string;
    accountNumber: string;
}
export interface AppUiSignUpForm extends AppUiForm {
    fullName: string;
    email: string;
    createAccountMode: boolean;
    emailIsValid: boolean;
    pw: string;
    pwSet: boolean;
    countryCode: string;
    phoneNumber: string;
    phoneNumberIsValid: boolean;
    phoneNumberToken?: string;
    phoneNumberVerified: boolean;
    phoneNumberVerificationSent: boolean;
    phoneNumberWaiting: boolean;
    phoneNumberVerificationFailed: boolean;
    emailIsVerified: boolean;
    emailVerificationSent: boolean;
}
export interface AppUiSignInForm extends AppUiForm {
    email: string;
    passwordResetEmail: string;
    password: string;
    password2?: string;
    displayName: string;
    displayNameFocused: boolean;
    emailIsValid: boolean;
    resetPwToken?: string;
    countryCode: string;
    phoneNumber: string;
    phoneNumberIsValid: boolean;
    phoneNumberToken?: string;
    phoneNumberWaiting: boolean;
    phoneNumberVerified: boolean;
    phoneNumberVerificationFailed: boolean;
    phoneNumberVerificationSent: boolean;
    emailVerificationSent: boolean;
    signInAttemptFailed?: boolean;
}
export interface AppUiPinCodeForm {
    pinIsSet: boolean;
    onSuccessRoute?: AppStateRoute;
    onSuccessAction?: ActionTypes;
}
export declare const defaultAppUiSignInForm: AppUiSignInForm;
export interface AppUiBusinessDetailsForm extends AppUiForm {
    businessName: string;
    address: string;
    lockDown: boolean;
}
export declare const defaultAppUiBusinessDetailsForm: AppUiBusinessDetailsForm;
export interface AppUiSellItemForm extends AppUiForm {
    itemTitle: string;
    quantity: number;
    quantityUnit: string;
    price: CurrencyValue;
    customerPhoneNumber?: string;
    customerCountryCode?: string;
    itemTitleList: string[];
}
export declare const defaultAppUiSellItemForm: AppUiSellItemForm;
export interface AppUiQrReader {
    qrCode: string;
    onSuccess: AnyAction;
}
export interface AppUiReferralDashboard {
    awardAmount: CurrencyValue;
    referred?: AppContact;
}
export interface AppUiManualDepositDescription {
    intId: string;
    humanifiedId: string;
    selectedBank: string;
}
export declare const defaultAppUiReferralDashboard: AppUiReferralDashboard;
export interface AppUiCoinSelectorForm extends AppUiForm {
    coinSummaries: AppCoinItem[];
    originalCoins: Currency[];
    selectedCoins: Currency[];
    searchTerm?: string;
}
export interface AppUiSinglePageMenuForm extends AppUiForm {
    menuType: 'accountGroupTypeSelector';
    items: any[];
}
export declare const defaultAppUiSinglePageMenuForm: AppUiSinglePageMenuForm;
export declare const defaultAppUiCoinSelectorForm: AppUiCoinSelectorForm;
export interface AppUiAccountGroupListForm extends AppUiForm {
    onDevice: AppUserAccountGroup[];
    needRestore: AppUserAccountGroup[];
}
export declare const defaultAppUiAccountGroupListForm: AppUiAccountGroupListForm;
export interface AppUiAccountGroupStandardForm extends AppUiForm {
    accountGroupId: string;
    name: string;
    backups: AccountGroupBackupType[];
}
export declare const defaultAppUiAccountGroupStandardForm: AppUiAccountGroupStandardForm;
export interface AppUiNmonicSeedForm extends AppUiForm {
    accountGroupId: string;
    backupType: AccountGroupBackupType;
    sheetNumber: number;
    words: string[];
    errors: number[];
    actualSeed?: string[];
    isTest: boolean;
    isRestore: boolean;
}
export declare const defaultAppUiNmonicSeedForm: AppUiNmonicSeedForm;
export interface AppUiAccountGroupPaperBackupRestoreSheet {
    words: string[];
    actedUppon: boolean;
    backupType: AccountGroupBackupType;
}
export interface AppUiAccountGroupPaperBackupRestoreForm extends AppUiForm {
    mode: 'backup' | 'restore' | 'test';
    threshold: number;
    partCount: number;
    sheets: AppUiAccountGroupPaperBackupRestoreSheet[];
    showDone: boolean;
    backupType: AccountGroupBackupType;
}
export declare const defaultAppUiAccountGroupPaperBackupRestoreForm: AppUiAccountGroupPaperBackupRestoreForm;
export interface AppUiForms {
    bankAccount: AppUiBankAccountForm;
    editor: EditorRequest;
    twoFa: TwoFaRequest;
    signIn: AppUiSignInForm;
    sendMoney: AppUiSendMoneyForm;
    business: AppUiBusinessDetailsForm;
    sellItem: AppUiSellItemForm;
    pinCode: AppUiPinCodeForm;
    qrReader: AppUiQrReader;
    referral: AppUiReferralDashboard;
    manualDeposit: AppUiManualDepositDescription;
    coinSelector: AppUiCoinSelectorForm;
    singlePageMenu: AppUiSinglePageMenuForm;
    accountGroupList: AppUiAccountGroupListForm;
    accountGroupStandard: AppUiAccountGroupStandardForm;
    accountGroupPaperBackupRestore: AppUiAccountGroupPaperBackupRestoreForm;
    nmonicSeed: AppUiNmonicSeedForm;
}
export interface AppUiTransactions {
    transactions: TransactionViewModel[];
    shelvedTransactions: TransactionViewModel[];
    form?: AppUiTransactionDetailsForm;
}
export interface AppUiFriends {
    filteredContacts: any[];
    previousSearchTerm: string;
    searchTerm: string;
    selectedContact?: any;
    onSuccess: AnyAction;
}
export interface AppStateUiNative {
    qeCodeRequest: QrCodeRequest;
    showPinOrFaceId: boolean;
    pullToRefreshRefreshing: boolean;
    documentHeight: number;
    documentScrollY: number;
    webPageLoaded: boolean;
    friends: AppUiFriends;
}
export interface AppUiCharts {
    summary: AppCoinItem[];
    news: AppNewsItem[];
    selectedPrice?: number;
    selectedChartType: SelectedChartType;
    selectedChartHourlyPrices: {
        coin: string;
        prices: number[];
    };
    selectedChartDailyPrices: {
        coin: string;
        prices: number[];
    };
}
export interface AppStateUi {
    route: AppStateRoute;
    dashboard: AppStateDashboard;
    businessDashboard: AppStateBusinessDashboard;
    wallet: AppStateWallet[];
    uiTransactions: AppUiTransactions;
    flags: AppUiFlags;
    withdrawCrypto: AppWithdrawCryptoProps;
    manualDeposit: AppManualDepositProps;
    charts: AppUiCharts;
    forms: AppUiForms;
    native: AppStateUiNative;
}
//# sourceMappingURL=AppState.d.ts.map