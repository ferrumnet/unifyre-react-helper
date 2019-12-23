import { AppAddressWithBalance, AppBalance, AppContact, AppPage, AppStateData, AppStateRoute, AppTransaction, AppUser, AppUserAccountGroup, AppUserAddresses, Locale } from '../redux/AppState';
import { CurrencyValue, Network, Currency } from './CurrencyValue';
import { PhoneNumber } from "libphonenumber-js";
export declare const supportedTradeCurrencies: Currency[];
export declare const supportedBaseCurrencies: Currency[];
export declare const transactionTitleMap: {
    'deposit': string;
    'withdraw': string;
    'buy': string;
    'sell': string;
    'send': string;
    'receive': string;
    'pendingRequest': string;
    'request': string;
};

export declare class Utils {
    static minimumDepositAmountInt: {
        'BTC': number;
        'NGN': number;
        'KES': number;
        'GHS': number;
        'GUSD': number;
        'ETH': number;
        'FRM': number;
    };
    static currencyUnicodeCharForUrl: any;
    static clone<T>(obj: T): T;
    static balanceFor(currency: Currency, balance: AppBalance): AppAddressWithBalance | undefined;
    static bankAddress(bankName: string, accountNumber: string): string;
    static parseTime(timeStr: string): number;
    static uuid(): string;
    static now(): number;
    static normalizeAddress(currency: Currency, address: string): string;
    static isValidCurrency(currency: Currency): boolean;
    static isAddressValid(currency: Currency, address: string): boolean;
    static isBtcAddressValid(address: string): boolean;
    static isEthereumAddressValid(address: string): boolean;
    static timeSince(timeStamp: number): string;
    static isValidPhoneNumber(locale: Locale, phoneNumber?: string): boolean;
    static formatPhoneNumber(locale: Locale, phoneNumber: string): string;
    static validateBalance(amount: CurrencyValue, _: CurrencyValue, balance: AppBalance): void;
    static availableAmount(balance: AppAddressWithBalance, posFee: CurrencyValue): CurrencyValue;
    static validateEmail(email: string): void;
    static openWebUrl(url: string): void;
    static userNeedsProfile(user: AppUser): boolean;
    static validateTrue(predicate: boolean, message: string): void;
    static pageTitle(route: AppStateRoute): string;
    static transactionLink(currency: Currency, proofTransactionId: string): string;
    static isValidEmail(email: string): boolean;
    static phoneForContact(locale: Locale, contact: AppContact): PhoneNumber | undefined;
    static formattedPhoneNumberForContact(locale: Locale, contact: AppContact): string;
    static userAccountGroup(user: AppUser, accountGroupId?: string): AppUserAccountGroup;
    static userAddresses(user: AppUser, accountGroupId?: string): AppUserAddresses;
    static addressFor(currency: Currency, user: AppUser, accountGroupId?: string): string | undefined;
    static digitsOnly(phoneNumber: string): string;
    static formatVirtualAddress(locale: Locale, virtualAddress: string, addressType: string): string;
    static cleanUpPhoneNumber(locale: Locale, cCode: string, phone: string): [string, string];
    static calculateSignUpPage(user: AppUser): AppPage;
    static isTradeBase(currency: Currency): boolean;
    static isCrypto(currency: Currency): boolean;
    static network(currency: Currency): Network;
    static inEpsilonRange(n1: number, n2: number): boolean;
    static cleanUpScannedCryptoAddr(address: string): string;
    static isShelvedTransaction(trans: AppTransaction): boolean;
    static shelvedTransactionIdToUnshelved(transactionId: string): string;
    static shortenTransactionId(tId: string): string;
    static currencyForAddress(addr: string): Currency;
    static translateCurrency(potentialCurrency: string): Currency;
    static getLocalAccountGroup(data: AppStateData): import("../redux/AppState").AppLocalAccountGroup | undefined;
}

//# sourceMappingURL=Utils.d.ts.map