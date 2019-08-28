var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./CurrencyValue", "./AppEnv", "./Valitation", "./PhoneNumberUtils", "./Log", "ethereum-address", "./Api", "../intl/IntlManager"], function (require, exports, CurrencyValue_1, AppEnv_1, Valitation_1, PhoneNumberUtils_1, Log_1, ethereum_address_1, Api_1, IntlManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ethereum_address_1 = __importDefault(ethereum_address_1);
    const pageName = {
        'transactions': 'page-activity',
        'settingsMenu': 'page-settings',
        'account': 'page-account',
        'withdraw': 'page-withdraw',
        'deposit': 'page-deposit',
        'sell': 'page-sell',
        'buy': 'page-buy',
        'bankAccount': 'page-bank-account',
        'profile': 'page-your-profile',
        'manualDeposit': 'page-register-bank',
        'securityMenu': 'page-account-security',
        'chartDetails': 'page-chart-details',
        'sendMoney': 'page-send',
        'confirmSendMoney': 'page-confirm',
        'shareTransactionResult': 'page-share',
        'signInEmail': 'page-signin',
        'signInPw': 'page-email',
        'signUpResetPw': 'page-new-pw',
        'signUpPwAndName': 'page-register',
        'signUpPhoneNumber': 'page-phone-number',
        'signUpEmailVerification': 'page-verify-email',
        'editBusiness': 'page-bus-details',
        'pinRequest': 'page-enter-pin',
        'pinSetup': 'page-setup-pin',
        'busSellItem': 'page-sell-item',
        'manualDepositDescription': 'page-bank-deposit',
        'ussdDescription': 'page-ussd-deposit',
        'referralDashboard': 'page-referral-program',
        'contactUsMenu': 'page-contact-us',
    };
    exports.supportedTradeCurrencies = ['XBT', 'GUSD'];
    exports.supportedBaseCurrencies = ['NGN'];
    exports.transactionTitleMap = {
        'deposit': 'Deposit',
        'withdraw': 'Withdraw',
        'buy': 'Buy {CUR}',
        'sell': 'Sell {CUR}',
        'send': 'Send {CUR}',
        'receive': 'Receive {CUR}',
        'pendingRequest': 'Payment Requested',
        'request': 'Request',
    };
    class Utils {
        static clone(obj) {
            // @ts-ignore
            const clone = {};
            for (let i in obj) {
                if (obj[i] != undefined && typeof (obj[i]) === 'object')
                    clone[i] = Utils.clone(obj[i]);
                else
                    clone[i] = obj[i];
            }
            return clone;
        }
        static balanceFor(currency, balance) {
            const acc = balance.find(b => b.address.currency === currency);
            return acc && acc.address;
        }
        static bankAddress(bankName, accountNumber) {
            return `${bankName.toLowerCase().replace(' ', '')};${accountNumber.toLowerCase().replace(' ', '')}`.toLowerCase();
        }
        static parseTime(timeStr) {
            return Date.parse(timeStr);
        }
        static uuid() {
            return new Date().getTime().toString() + (1000000000 + Math.round(Math.random() * 99999999)).toString();
        }
        static now() {
            return new Date().getTime();
        }
        static normalizeAddress(currency, address) {
            if (currency === 'BTC') {
                return address.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
            }
            else {
                return address;
            }
        }
        static isValidCurrency(currency) {
            return CurrencyValue_1.CURRENCIES.has(currency);
        }
        static isAddressValid(currency, address) {
            Api_1.remoteLog('isAddressValid ' + currency + ' ' + address);
            const net = Utils.network(currency);
            switch (net) {
                case 'BITCOIN':
                    return Utils.isBtcAddressValid(address);
                case 'ETHEREUM':
                    return Utils.isEthereumAddressValid(address);
                case 'FERRUM':
                    return address.startsWith('fx') && Utils.isEthereumAddressValid(address.replace('fx', '0x'));
                default:
                    break;
            }
            return false;
        }
        static isBtcAddressValid(address) {
            if (!address || address.length < 26 || address.length > 35) {
                return false;
            }
            let re = /^[A-Z0-9]+$/i;
            return re.test(address);
        }
        static isEthereumAddressValid(address) {
            Log_1.Log.info('Validating eth address ', address);
            return ethereum_address_1.default.isAddress(address);
        }
        static timeSince(timeStamp) {
            const now = new Date(), secondsPast = Math.round((now.getTime() - timeStamp) / 1000);
            if (secondsPast < 60) {
                return IntlManager_1.intl('seconds-ago', { value: secondsPast });
            }
            if (secondsPast < 3600) {
                return IntlManager_1.intl('minutes-ago', { value: Math.round(secondsPast / 60) });
            }
            if (secondsPast <= 86400) {
                return IntlManager_1.intl('hours-ago', Math.round(secondsPast / 3600));
            }
            else {
                const date = new Date(timeStamp);
                const day = date.getDate();
                const month = date.toDateString().match(/ [a-zA-Z]*/)[0].replace(' ', '');
                const year = date.getFullYear() === now.getFullYear() ? '' : ' ' + date.getFullYear();
                return day + ' ' + month + year;
            }
        }
        static isValidPhoneNumber(locale, phoneNumber) {
            return !!phoneNumber && PhoneNumberUtils_1.PhoneNumberUtils.isValidMobileNumber(locale, '+' + Utils.digitsOnly(phoneNumber));
        }
        static formatPhoneNumber(locale, phoneNumber) {
            if (!phoneNumber) {
                return '';
            }
            const phone = PhoneNumberUtils_1.PhoneNumberUtils.parse(locale, phoneNumber);
            if (!phone) {
                return '';
            }
            return (phone.country || '').toLowerCase() === locale.toLowerCase() ?
                phone.formatNational() : phone.formatInternational();
        }
        static validateBalance(amount, _, balance) {
            const balItem = Utils.balanceFor(amount.currency, balance);
            const balInt = balItem ? (balItem.balance.amountInt() +
                (balItem.pending.amountInt() < 0 ? balItem.pending.amountInt() : 0)) : 0;
            if (amount.amountInt() < 0 && (balInt < Math.abs(amount.amountInt()))) {
                const diff = CurrencyValue_1.CurrencyValue.fromInt(amount.currency, Math.abs(amount.amountInt()) - (balInt)).format();
                throw new Error(IntlManager_1.intl('err-not-enough-balance', { diff: diff, currency: amount.currency }));
            }
        }
        static availableAmount(balance, posFee) {
            const res = balance.pending.amountInt() < 0 ?
                balance.balance.plus(balance.pending.plus(posFee.negate())) :
                balance.balance.plus(posFee.negate());
            return res.amountInt() >= 0 ? res : CurrencyValue_1.CurrencyValue.zero(balance.balance.currency);
        }
        static validateEmail(email) {
            if (!Utils.isValidEmail(email)) {
                throw new Error(`err-invalid-email`);
            }
        }
        static openWebUrl(url) {
            if (AppEnv_1.AppEnv.isStandalone()) {
                //ts-ignor
                window.location.href = url;
            }
        }
        static userNeedsProfile(user) {
            return !user || !user.phoneNumber || !user.countryCode;
        }
        static validateTrue(predicate, message) {
            Valitation_1.Validation.isTrue(predicate, message);
        }
        static pageTitle(route) {
            const title = pageName[route.page];
            if (!title) {
                return '';
            }
            return IntlManager_1.intl(title, { currency: route.params['currency'] });
        }
        static transactionLink(currency, proofTransactionId) {
            if (currency !== 'BTC') {
                return '';
            }
            return `https://live.blockcypher.com/btc/tx/${proofTransactionId}`;
        }
        static isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        static phoneForContact(locale, contact) {
            const pns = (contact.phoneNumbers || []).find(p => p.label === 'mobile');
            if (!pns) {
                throw new Error(IntlManager_1.intl('err-no-mobile-phone-number'));
            }
            Log_1.Log.info('Got mobile phone for contact ', pns);
            const fromNumber = PhoneNumberUtils_1.PhoneNumberUtils.parse(locale, pns.number || '');
            if (fromNumber && fromNumber.isValid()) {
                Log_1.Log.info('Returning based on the contact.Number ', fromNumber.formatNational(), fromNumber.formatInternational());
                return fromNumber;
            }
            let digis = '+' + (pns.countryCode || '') + (pns.digits || Utils.digitsOnly(pns.number || '') || '');
            return PhoneNumberUtils_1.PhoneNumberUtils.parse(locale, digis);
        }
        static formattedPhoneNumberForContact(locale, contact) {
            const p = Utils.phoneForContact(locale, contact);
            if (!p) {
                return '';
            }
            return (p.country || '').toLowerCase() === locale.toLowerCase() ? p.formatNational() : p.formatInternational();
        }
        static userAccountGroup(user, accountGroupId) {
            const agId = accountGroupId || user.liveAccountGroupId;
            const groupIdx = user.accountGroups.findIndex(ag => ag.id === agId);
            return user.accountGroups[groupIdx >= 0 ? groupIdx : 0];
        }
        static userAddresses(user, accountGroupId) {
            const group = Utils.userAccountGroup(user, accountGroupId);
            return group.addresses;
        }
        static addressFor(currency, user, accountGroupId) {
            const groupAdd = Utils.userAddresses(user, accountGroupId);
            return (groupAdd[currency] || {}).address;
        }
        static digitsOnly(phoneNumber) {
            return phoneNumber.replace(/[^0-9]/g, '');
        }
        static formatVirtualAddress(locale, virtualAddress, addressType) {
            if (addressType === 'PHONE') {
                return Utils.formatPhoneNumber(locale, '+' + virtualAddress); // To force a complete address
            }
            return virtualAddress;
        }
        static cleanUpPhoneNumber(locale, cCode, phone) {
            Valitation_1.Validation.notEmpty(cCode, 'cCode must be provided');
            Valitation_1.Validation.notEmpty(phone, 'phone must be provided');
            cCode = Utils.digitsOnly(cCode);
            phone = Utils.digitsOnly(phone);
            // Remove the first zero
            phone = phone.substr(0, 1) === '0' ? phone.substr(1) : phone;
            const phoneObj = PhoneNumberUtils_1.PhoneNumberUtils.parse(locale, '+' + cCode + phone);
            Valitation_1.Validation.isTrue(!!phoneObj, 'invalid phone number provided');
            return [
                phoneObj.countryCallingCode.toString(),
                phoneObj.nationalNumber.toString(),
            ];
        }
        static calculateSignUpPage(user) {
            if (!user || user.anonymous) {
                return 'signInEmail';
            }
            if (!user.phoneNumberVerified) {
                return 'signUpPhoneNumber';
            }
            if (!user.emailVerified) {
                return 'signUpEmailVerification';
            }
            throw new Error('User is completely signed up');
        }
        static isTradeBase(currency) {
            return currency === 'NGN';
        }
        static isCrypto(currency) {
            return currency === 'BTC' || currency === 'GUSD' || currency === 'ETH';
        }
        static network(currency) {
            return (currency === 'GUSD' || currency === 'ETH') ? 'ETHEREUM' : 'BITCOIN';
        }
        static inEpsilonRange(n1, n2) {
            Utils.validateTrue(n2 !== 0, 'n2 cannot be zero');
            return Math.abs((n1 - n2) / n2) < 0.002;
        }
        static cleanUpScannedCryptoAddr(address) {
            if (address.indexOf(':') >= 0) {
                address = address.split(':')[1];
            }
            else {
                address = address.trim();
            }
            return address;
        }
        static isShelvedTransaction(trans) {
            return trans.transactionId.substr(0, 3) === 'V__';
        }
        static shelvedTransactionIdToUnshelved(transactionId) {
            return transactionId.substr(3);
        }
        static shortenTransactionId(tId) {
            if (tId.length <= 25) {
                return tId;
            }
            return tId.substr(0, 10) + '...' + tId.substr(tId.length - 15);
        }
        static currencyForAddress(addr) {
            // Check if this is a btc addr.
            if (addr.startsWith('fx')) {
                return 'NGN';
            }
            if (addr.startsWith('0x')) {
                return 'ETH';
            }
            return 'BTC';
        }
        static translateCurrency(potentialCurrency) {
            potentialCurrency = potentialCurrency.toLocaleLowerCase();
            if (potentialCurrency === 'bitcoin' || potentialCurrency === 'btc') {
                return 'BTC';
            }
            if (potentialCurrency === 'ngn') {
                return 'NGN';
            }
            if (potentialCurrency === 'gusd') {
                return 'GUSD';
            }
            return potentialCurrency;
        }
        static getLocalAccountGroup(data) {
            const agId = data.config.activeAccountGroupId || data.user.liveAccountGroupId;
            return data.accountGroups.find(ag => ag.id === agId);
        }
    }
    Utils.minimumDepositAmountInt = {
        'BTC': 1000000,
        'NGN': 100,
        'KES': 100,
        'GHS': 100,
        'GUSD': 1,
        'ETH': 1,
        'FRM': 1,
    };
    Utils.currencyUnicodeCharForUrl = {
        'BTC': '%E2%82%BF',
        'GUSD': '%F0%9F%92%B5',
        'NGN': '%E2%82%A6',
    };
    exports.Utils = Utils;
});
//# sourceMappingURL=Utils.js.map