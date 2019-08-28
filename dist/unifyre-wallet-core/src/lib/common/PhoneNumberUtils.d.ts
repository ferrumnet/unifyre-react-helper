import { PhoneNumber } from 'libphonenumber-js/mobile';
import { Locale } from '../redux/AppState';
export declare class PhoneNumberUtils {
    static parse(locale: Locale, s: string): PhoneNumber | undefined;
    static isValidMobileNumber(locale: Locale, s: string): boolean;
    static validate(locale: Locale, s: string): void;
    static countryCode(local: Locale): string;
    private static toCountryCode;
}
//# sourceMappingURL=PhoneNumberUtils.d.ts.map