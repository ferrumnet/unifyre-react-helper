define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AppEnv {
        static isStandalone() {
            // @ts-ignore
            return !window.kudiMobileApp;
        }
        static isNative() {
            return AppEnv._isNative;
        }
        static setNative() {
            AppEnv._isNative = true;
        }
        static isDev() {
            return AppEnv._isDev;
        }
        static setDev(isDev) {
            console.log('Setting dev mode', isDev);
            AppEnv._isDev = isDev;
        }
    }
    AppEnv._isNative = false;
    AppEnv._isDev = true;
    exports.AppEnv = AppEnv;
});
//# sourceMappingURL=AppEnv.js.map