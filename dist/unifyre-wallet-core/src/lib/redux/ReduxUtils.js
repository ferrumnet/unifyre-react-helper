define(["require", "exports", "./AppState", "../common/WalletPlatform"], function (require, exports, AppState_1, WalletPlatform_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ReduxUtils {
        static setUserInfo(userInfo) {
            ReduxUtils._userInfo = Object.assign({}, userInfo);
        }
        static getUserInfo() {
            return ReduxUtils._userInfo;
        }
        static fullySignedUpUser() {
            const user = ReduxUtils.getUserInfo();
            return user && !user.anonymous && user.emailVerified && user.phoneNumberVerified;
        }
        static getStore() {
            return ReduxUtils.store;
        }
        static getState() {
            if (!ReduxUtils.store) {
                return {};
            }
            return ReduxUtils.store.getState();
        }
        static setConfig(config) {
            ReduxUtils._config = config;
        }
        static config() {
            if (!ReduxUtils._config) {
                return {};
            }
            return ReduxUtils._config;
        }
        static getLocale() {
            if (WalletPlatform_1.walletPlatform() === 'kudi') {
                return 'ng';
            }
            else {
                return ReduxUtils.config().locale;
            }
        }
        static combineReducers(sliceReducers, fullReducers) {
            return (appState, state, action) => {
                const newState = Object.assign({}, state);
                Object.keys(sliceReducers).forEach(k => {
                    // @ts-ignore
                    newState[k] = sliceReducers[k]((state || {})[k], action);
                });
                Object.keys(fullReducers).forEach(k => {
                    // @ts-ignore
                    newState[k] = fullReducers[k](appState, (state || {})[k], action);
                });
                return newState;
            };
        }
    }
    ReduxUtils._userInfo = AppState_1.dummyAppUser;
    exports.ReduxUtils = ReduxUtils;
});
//# sourceMappingURL=ReduxUtils.js.map