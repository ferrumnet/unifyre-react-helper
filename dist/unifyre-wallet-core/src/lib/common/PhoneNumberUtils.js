define(["require", "exports", "libphonenumber-js/mobile", "./Log"], function (require, exports, mobile_1, Log_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PhoneNumberUtils {
        static parse(locale, s) {
            return mobile_1.parsePhoneNumberFromString(s, PhoneNumberUtils.toCountryCode(locale));
        }
        static isValidMobileNumber(locale, s) {
            const phone = PhoneNumberUtils.parse(locale, s);
            return !!phone && phone.isValid() && (!phone.getType() || phone.getType() === 'MOBILE' || phone.getType() === 'FIXED_LINE_OR_MOBILE');
        }
        static validate(locale, s) {
            const phone = PhoneNumberUtils.parse(locale, s);
            if (!phone) {
                throw new Error('No phone numbers');
            }
            if (!phone.isValid()) {
                throw new Error('Invalid phone number');
            }
            Log_1.Log.info('phoneNumberUtils.validate: Validating phone number of type ', phone.getType(), phone.country);
            if (phone.getType() && !(phone.getType() === 'MOBILE' || phone.getType() === 'FIXED_LINE_OR_MOBILE')) {
                throw new Error('Not a mobile phone number');
            }
        }
        static countryCode(local) {
            return mobile_1.getCountryCallingCode(PhoneNumberUtils.toCountryCode(local));
        }
        static toCountryCode(locale) {
            return locale.toUpperCase();
        }
    }
    exports.PhoneNumberUtils = PhoneNumberUtils;
});
//# sourceMappingURL=PhoneNumberUtils.js.map